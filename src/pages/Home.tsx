import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockPharmacies } from '@/data/mockData';
import { Navigation, Gift, Target, Trophy, ChevronRight, MapPin } from 'lucide-react';
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

const cimedImg = `<img src="/images/cimed-symbol.png" style="width:26px;height:26px;object-fit:contain;" />`;
const pharmacyIcon = new L.DivIcon({ html: `<div class="marker-pharmacy">${cimedImg}</div>`, className: '', iconSize: [40, 40], iconAnchor: [20, 20] });

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
  const movingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPositionRef = useRef<[number, number]>(FALLBACK_POSITION);
  const animFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

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
    { icon: Gift, title: 'Drops perto de você', subtitle: 'Resgate prêmios e recompensas', path: '/drops' },
    { icon: Target, title: 'Missões da semana', subtitle: 'Complete desafios e ganhe pontos', path: '/missions' },
    { icon: Trophy, title: 'Ranking da cidade', subtitle: 'Veja quem está no topo', path: '/leaderboard' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <div className="px-4 pt-[72px] space-y-3">
        {/* Level Card */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-3 border border-border shadow-lg shadow-black/20">
          <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center flex-shrink-0 text-primary-foreground font-black text-sm">
            1
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold text-sm">Olá, {username}</p>
            <p className="text-muted-foreground text-xs mb-1.5">Nível 1 · 0 pontos</p>
            <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: '0%' }} />
            </div>
            <p className="text-muted-foreground text-[9px] mt-0.5">1.000 XP para o nível 2</p>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 px-1">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold text-muted-foreground">Explorar mapa</span>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg shadow-black/20" style={{ height: 300 }}>
            <MapContainer
              center={playerPosition}
              zoom={15}
              minZoom={13}
              maxZoom={19}
              className="h-full w-full"
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="" />
              <MapFollower position={displayPosition} shouldFollow={followPlayer} onDrag={() => setFollowPlayer(false)} />
              <PlayerAvatar position={displayPosition} heading={displayHeading} isMoving={isMoving} />

              {mockPharmacies.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]} icon={pharmacyIcon}>
                  <Popup className="game-popup">
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-sm">{p.name}</h3>
                      <p className="text-[10px] text-gray-500">{p.address}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            <button
              onClick={handleRecenter}
              className="absolute top-3 right-3 z-[1000] w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg shadow-black/30 active:scale-95 transition-transform"
            >
              <Navigation className="w-5 h-5 text-accent" />
            </button>
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-2.5">
          {actionCards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="w-full bg-card rounded-2xl p-4 flex items-center gap-3 border border-border active:scale-[0.98] transition-all duration-200 text-left shadow-lg shadow-black/15 hover:border-accent/30"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-bold text-sm">{card.title}</p>
                <p className="text-muted-foreground text-xs">{card.subtitle}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-accent flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
