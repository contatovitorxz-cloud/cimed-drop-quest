import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockPharmacies, mockDrops, mockMissions, mockRareProducts, mockInfluencerDrops } from '@/data/mockData';
import { Navigation, Gift, Target, Trophy, ChevronRight, Sparkles } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import PlayerAvatar from '@/components/game/PlayerAvatar';
import BottomNav from '@/components/layout/BottomNav';
import { useNavigate } from 'react-router-dom';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const cimedImg = `<img src="/images/cimed-symbol.png" style="width:26px;height:26px;object-fit:contain;" />`;

const pharmacyIcon = new L.DivIcon({ html: `<div class="marker-pharmacy">${cimedImg}</div>`, className: '', iconSize: [40, 40], iconAnchor: [20, 20] });
const dropIcon = new L.DivIcon({ html: `<div class="marker-drop">${cimedImg}</div>`, className: '', iconSize: [44, 44], iconAnchor: [22, 22] });
const rareIcon = new L.DivIcon({ html: `<div class="marker-rare">${cimedImg}</div>`, className: '', iconSize: [38, 38], iconAnchor: [19, 19] });
const missionIcon = new L.DivIcon({ html: `<div class="marker-mission">${cimedImg}</div>`, className: '', iconSize: [36, 36], iconAnchor: [18, 18] });
const influencerIcon = new L.DivIcon({ html: `<div class="marker-influencer">${cimedImg}</div>`, className: '', iconSize: [48, 48], iconAnchor: [24, 24] });

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
    { icon: Gift, title: 'Drops perto de você', subtitle: 'Resgate prêmios e recompensas', path: '/drops', badge: '2' },
    { icon: Target, title: 'Missões da semana', subtitle: 'Complete desafios e ganhe pontos', path: '/missions' },
    { icon: Trophy, title: 'Ranking da cidade', subtitle: 'Veja quem está no topo', path: '/leaderboard' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <div className="px-4 pt-[72px] space-y-4">
        {/* Level Card */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-3 border border-border">
          <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-bold text-sm">Nível 4 · Caçador de Carmed</p>
            <p className="text-accent text-xs font-semibold">1.250 pontos</p>
          </div>
        </div>

        {/* Map Card */}
        <div className="relative rounded-2xl overflow-hidden border border-border" style={{ height: 280 }}>
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
            {mockDrops.map((d) => (
              <Marker key={`drop-${d.id}`} position={[d.pharmacy.lat, d.pharmacy.lng]} icon={dropIcon}>
                <Popup className="game-popup">
                  <div className="p-2"><h3 className="font-bold text-sm">{d.title}</h3></div>
                </Popup>
              </Marker>
            ))}
            {mockRareProducts.map((rp) => (
              <Marker key={`rare-${rp.id}`} position={[rp.lat, rp.lng]} icon={rareIcon}>
                <Popup className="game-popup">
                  <div className="p-2"><h3 className="font-bold text-sm">{rp.product.name}</h3></div>
                </Popup>
              </Marker>
            ))}
            {mockMissions.map((m) => (
              <Marker key={`mission-${m.id}`} position={[m.lat, m.lng]} icon={missionIcon}>
                <Popup className="game-popup">
                  <div className="p-2"><h3 className="font-bold text-sm">{m.title}</h3></div>
                </Popup>
              </Marker>
            ))}
            {mockInfluencerDrops.map((id) => (
              <Marker key={`inf-${id.id}`} position={[id.lat, id.lng]} icon={influencerIcon}>
                <Popup className="game-popup">
                  <div className="p-2">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span className="text-[10px] font-bold text-amber-500">INFLUENCIADOR</span>
                    </div>
                    <h3 className="font-bold text-sm">{id.title}</h3>
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
        </div>

        {/* Action Cards */}
        <div className="space-y-3">
          {actionCards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="w-full bg-card rounded-2xl p-4 flex items-center gap-3 border border-border active:scale-[0.98] transition-transform text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-bold text-sm">{card.title}</p>
                <p className="text-muted-foreground text-xs">{card.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {card.badge && (
                  <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">
                    {card.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-accent" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
