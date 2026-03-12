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
import { useProfile } from '@/hooks/useProfile';

// Fix: Marker icons missing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#FFD500" stroke="#0A0A0A" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="#0A0A0A"/></svg>`;
const pharmacyIcon = new L.DivIcon({ html: pinSvg, className: '', iconSize: [24, 36], iconAnchor: [12, 36] });

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
  return <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="" />;
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
  const { profile } = useProfile();
  const username = profile?.username || user?.user_metadata?.username || user?.email?.split('@')[0] || 'Jogador';
  const level = profile?.level || 1;
  const xp = profile?.xp || 0;
  const totalPoints = profile?.total_points || 0;
  const maxXp = level * 1000;
  const xpPct = Math.min((xp / maxXp) * 100, 100);

  const [playerPosition, setPlayerPosition] = useState<[number, number]>(FALLBACK_POSITION);
  const [displayPosition, setDisplayPosition] = useState<[number, number]>(FALLBACK_POSITION);
  const [heading, setHeading] = useState(0);
  const [displayHeading, setDisplayHeading] = useState(0);
  const [followPlayer, setFollowPlayer] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [pharmacies, setPharmacies] = useState<{ id: string; name: string; address: string; lat: number; lng: number }[]>([]);
  const [nearbyDropsCount, setNearbyDropsCount] = useState(0);
  const movingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPositionRef = useRef<[number, number]>(FALLBACK_POSITION);
  const animFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    supabase.from('pharmacies').select('id, name, address, lat, lng').eq('active', true).then(({ data }) => {
      if (data) setPharmacies(data);
    });
    // Count active drops
    supabase.from('drops').select('id', { count: 'exact', head: true }).eq('active', true).then(({ count }) => {
      setNearbyDropsCount(count || 0);
    });
  }, []);

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
    { icon: Gift, title: 'DROPS PERTO DE VOCÊ', subtitle: 'Resgate prêmios e recompensas', path: '/drops', badge: nearbyDropsCount > 0 ? String(nearbyDropsCount) : undefined },
    { icon: Target, title: 'MISSÕES DA SEMANA', subtitle: 'Complete desafios e ganhe pontos', path: '/missions' },
    { icon: Trophy, title: 'RANKING DA CIDADE', subtitle: 'Veja quem está no topo', path: '/leaderboard' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />

      <div className="px-4 pt-[72px] space-y-3 stagger-children">
        {/* Level Card */}
        <div className="brutal-card-dark p-4 flex items-center gap-3">
          <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-muted">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-black text-lg">{username.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-sm uppercase">{username} · Nível {level}</p>
            <p className="text-muted-foreground text-xs">{totalPoints.toLocaleString('pt-BR')} pontos</p>
            <div className="w-full h-2 bg-muted mt-2 overflow-hidden border-[2px] border-accent">
              <div className="h-full bg-accent transition-all duration-700" style={{ width: `${xpPct}%` }} />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative overflow-hidden border-[3px] border-border dark:border-[hsl(0,0%,25%)] shadow-[4px_4px_0_hsl(var(--border))] dark:shadow-[4px_4px_0_hsl(0,0%,0%/0.5)]" style={{ height: 300 }}>
          <MapContainer center={playerPosition} zoom={16} minZoom={13} maxZoom={18} className="h-full w-full" zoomControl={false} attributionControl={false}>
            <ThemeAwareTileLayer />
            <MapFollower position={displayPosition} shouldFollow={followPlayer} onDrag={() => setFollowPlayer(false)} />
            <PlayerAvatar position={displayPosition} heading={displayHeading} isMoving={isMoving} />
            {pharmacies.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={pharmacyIcon}>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-black text-sm uppercase">{p.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{p.address}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <button onClick={handleRecenter} className="absolute top-3 right-3 z-[1000] w-10 h-10 bg-card flex items-center justify-center border-[2px] border-border shadow-[2px_2px_0_hsl(var(--border))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <Navigation className="w-5 h-5 text-accent" />
          </button>

          <button onClick={() => navigate('/scan-history')} className="absolute bottom-3 right-3 z-[1000] w-10 h-10 bg-accent flex items-center justify-center border-[2px] border-border shadow-[2px_2px_0_hsl(var(--border))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <Camera className="w-5 h-5 text-accent-foreground" />
          </button>
        </div>

        {/* Action Cards */}
        <div className="space-y-2.5">
          {actionCards.map((card) => (
            <button key={card.path} onClick={() => navigate(card.path)} className="w-full brutal-card brutal-card-hover p-4 flex items-center gap-3 text-left">
              <div className="w-11 h-11 bg-accent dark:bg-accent/15 flex items-center justify-center flex-shrink-0 border-[2px] border-border dark:border-border/50">
                <card.icon className="w-6 h-6 text-accent-foreground dark:text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-black text-sm">{card.title}</p>
                <p className="text-muted-foreground text-xs">{card.subtitle}</p>
              </div>
              {card.badge ? (
                <div className="flex items-center gap-1 bg-accent px-2.5 py-1 border-[2px] border-border">
                  <span className="text-accent-foreground text-xs font-black">{card.badge}</span>
                  <ChevronRight className="w-4 h-4 text-accent-foreground" />
                </div>
              ) : (
                <ChevronRight className="w-5 h-5 text-foreground flex-shrink-0" />
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
