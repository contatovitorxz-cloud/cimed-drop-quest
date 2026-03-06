import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Gift, Target, Trophy, ChevronRight, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AppHeader from '@/components/layout/AppHeader';
import PlayerAvatar from '@/components/game/PlayerAvatar';
import BottomNav from '@/components/layout/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const cimedImg = `<img src="/images/cimed-symbol.png" style="width:22px;height:22px;object-fit:contain;" />`;
const pharmacyIcon = new L.DivIcon({ html: `<div class="marker-pharmacy">${cimedImg}</div>`, className: '', iconSize: [40, 40], iconAnchor: [20, 20] });

const createDropIcon = (count: number) => new L.DivIcon({
  html: `<div class="marker-drop-badge"><span>🎁</span><div class="marker-badge-count">${count}</div></div>`,
  className: '',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const rareDropIcon = new L.DivIcon({
  html: `<div class="marker-rare-drop"><span>🔥</span><div class="marker-rare-tooltip">Drop Raro · 130m</div></div>`,
  className: '',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

const missionIcon = new L.DivIcon({
  html: `<div class="marker-mission-target"><span>🎯</span></div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

function lerpAngle(a: number, b: number, t: number): number {
  let diff = ((b - a + 540) % 360) - 180;
  return a + diff * t;
}

function calcBearing(from: [number, number], to: [number, number]): number {
  const dLng = ((to[1] - from[1]) * Math.PI) / 180;
  const lat1 = (from[0] * Math.PI) / 180;
  const lat2 = (to[0] * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const ThemeAwareTileLayer = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  const url = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
  return <TileLayer url={url} attribution="" />;
};

const MapFollower = ({ position, shouldFollow, onDrag }: { position: [number, number]; shouldFollow: boolean; onDrag: () => void }) => {
  const map = useMap();
  const isZoomingRef = useRef(false);
  useMapEvents({
    dragstart: () => onDrag(),
    zoomstart: () => { isZoomingRef.current = true; },
    zoomend: () => { setTimeout(() => { isZoomingRef.current = false; }, 300); },
  });
  useEffect(() => {
    if (shouldFollow && !isZoomingRef.current) {
      map.setView(position, map.getZoom(), { animate: false });
    }
  }, [position, shouldFollow, map]);
  return null;
};

const FALLBACK_POSITION: [number, number] = [-23.5629, -46.6544];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Jogador';

  const [playerPosition, setPlayerPosition] = useState<[number, number]>(FALLBACK_POSITION);
  const [displayPosition, setDisplayPosition] = useState<[number, number]>(FALLBACK_POSITION);
  const [heading, setHeading] = useState(0);
  const [displayHeading, setDisplayHeading] = useState(0);
  const [followPlayer, setFollowPlayer] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [pharmacies, setPharmacies] = useState<{ id: string; name: string; address: string; lat: number; lng: number }[]>([]);
  const movingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPositionRef = useRef<[number, number]>(FALLBACK_POSITION);
  const animFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  // Fetch pharmacies from Supabase
  useEffect(() => {
    supabase.from('pharmacies').select('id, name, address, lat, lng').eq('active', true).then(({ data }) => {
      if (data) setPharmacies(data);
    });
  }, []);

  // GPS tracking
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        const prev = prevPositionRef.current;
        const dist = Math.sqrt(Math.pow(newPos[0] - prev[0], 2) + Math.pow(newPos[1] - prev[1], 2));
        if (dist > 0.00002) {
          setHeading(calcBearing(prev, newPos));
          setIsMoving(true);
          if (movingTimeoutRef.current) clearTimeout(movingTimeoutRef.current);
          movingTimeoutRef.current = setTimeout(() => setIsMoving(false), 2000);
        }
        prevPositionRef.current = newPos;
        setPlayerPosition(newPos);
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Device orientation
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const compassHeading = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) % 360 : null);
      if (compassHeading != null) setHeading(compassHeading);
    };
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission().then((r: string) => {
        if (r === 'granted') window.addEventListener('deviceorientation', handleOrientation, true);
      });
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, []);

  // Smooth interpolation
  useEffect(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    let active = true;
    const animate = () => {
      if (!active) return;
      let posOk = false, headOk = false;
      setDisplayPosition((prev) => {
        const dLat = playerPosition[0] - prev[0], dLng = playerPosition[1] - prev[1];
        if (Math.abs(dLat) < 0.000001 && Math.abs(dLng) < 0.000001) { posOk = true; return prev; }
        return [prev[0] + dLat * 0.1, prev[1] + dLng * 0.1];
      });
      setDisplayHeading((prev) => {
        const next = lerpAngle(prev, heading, 0.08);
        if (Math.abs(next - prev) < 0.01) { headOk = true; return prev; }
        return next;
      });
      if (posOk && headOk) { isAnimatingRef.current = false; return; }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => { active = false; isAnimatingRef.current = false; cancelAnimationFrame(animFrameRef.current); };
  }, [playerPosition, heading]);

  const handleRecenter = useCallback(() => setFollowPlayer(true), []);

  const actionCards = [
    { icon: Gift, title: 'Drops perto de você', subtitle: 'Resgate prêmios e recompensas', path: '/drops', badge: '2' },
    { icon: Target, title: 'Missões da semana', subtitle: 'Complete desafios e ganhe pontos', path: '/missions' },
    { icon: Trophy, title: 'Ranking da cidade', subtitle: 'Veja quem está no topo', path: '/leaderboard' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <div className="px-4 pt-[72px] space-y-3">
        {/* Level Card — reference style */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-3 border border-border">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold text-sm">Nível 1 · {username}</p>
            <p className="text-muted-foreground text-xs">0 pontos</p>
            <div className="w-full h-0.5 rounded-full bg-accent/40 mt-2" />
          </div>
        </div>

        {/* Map Section — no label above */}
        <div className="relative rounded-2xl overflow-hidden border border-border" style={{ height: 300 }}>
          <MapContainer
            center={playerPosition}
            zoom={15}
            minZoom={13}
            maxZoom={19}
            className="h-full w-full"
            zoomControl={false}
            attributionControl={false}
          >
            <ThemeAwareTileLayer />
            <MapFollower position={displayPosition} shouldFollow={followPlayer} onDrag={() => setFollowPlayer(false)} />
            <PlayerAvatar position={displayPosition} heading={displayHeading} isMoving={isMoving} />

            {/* Pharmacy markers */}
            {pharmacies.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={pharmacyIcon}>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-sm">{p.name}</h3>
                    <p className="text-[10px] text-gray-500">{p.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

          </MapContainer>

          {/* Recenter button */}
          <button
            onClick={handleRecenter}
            className="absolute top-3 right-3 z-[1000] w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Navigation className="w-5 h-5 text-accent" />
          </button>

          {/* QR/Camera button */}
          <button
            onClick={() => navigate('/scan-history')}
            className="absolute bottom-3 right-3 z-[1000] w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30 active:scale-95 transition-transform"
          >
            <Camera className="w-5 h-5 text-accent-foreground" />
          </button>
        </div>

        {/* Action Cards */}
        <div className="space-y-2.5">
          {actionCards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="w-full bg-card rounded-2xl p-4 flex items-center gap-3 border border-border active:scale-[0.98] transition-all duration-200 text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                <card.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-bold text-sm">{card.title}</p>
                <p className="text-muted-foreground text-xs">{card.subtitle}</p>
              </div>
              {card.badge ? (
                <div className="flex items-center gap-1 bg-accent/20 px-2.5 py-1 rounded-full">
                  <span className="text-accent text-xs font-bold">{card.badge}</span>
                  <ChevronRight className="w-4 h-4 text-accent" />
                </div>
              ) : (
                <ChevronRight className="w-5 h-5 text-accent flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
