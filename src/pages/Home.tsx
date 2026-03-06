import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockPharmacies, mockDrops, mockMissions, mockRareProducts } from '@/data/mockData';
import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameHUD from '@/components/game/GameHUD';
import AppHeader from '@/components/layout/AppHeader';
import PlayerAvatar from '@/components/game/PlayerAvatar';
import BottomNav from '@/components/layout/BottomNav';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Marker icons
const cimedImg = `<img src="/images/cimed-symbol.png" style="width:26px;height:26px;object-fit:contain;" />`;

const pharmacyIcon = new L.DivIcon({
  html: `<div class="marker-pharmacy">${cimedImg}</div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const dropIcon = new L.DivIcon({
  html: `<div class="marker-drop">${cimedImg}</div>`,
  className: '',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const rareIcon = new L.DivIcon({
  html: `<div class="marker-rare">${cimedImg}</div>`,
  className: '',
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

const missionIcon = new L.DivIcon({
  html: `<div class="marker-mission">${cimedImg}</div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});


// Interpolate angle (shortest path)
function lerpAngle(a: number, b: number, t: number): number {
  let diff = ((b - a + 540) % 360) - 180;
  return a + diff * t;
}

// Calculate bearing between two GPS points
function calcBearing(from: [number, number], to: [number, number]): number {
  const dLng = ((to[1] - from[1]) * Math.PI) / 180;
  const lat1 = (from[0] * Math.PI) / 180;
  const lat2 = (to[0] * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

// Component that follows the player
const MapFollower = ({
  position,
  shouldFollow,
  onDrag,
}: {
  position: [number, number];
  shouldFollow: boolean;
  onDrag: () => void;
}) => {
  const map = useMap();
  const isZoomingRef = useRef(false);

  useMapEvents({
    dragstart: () => onDrag(),
    zoomstart: () => { isZoomingRef.current = true; },
    zoomend: () => { isZoomingRef.current = false; },
  });

  useEffect(() => {
    if (shouldFollow && !isZoomingRef.current) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, shouldFollow, map]);

  return null;
};

const FALLBACK_POSITION: [number, number] = [-23.5629, -46.6544];

const Home = () => {
  const [playerPosition, setPlayerPosition] = useState<[number, number]>(FALLBACK_POSITION);
  const [displayPosition, setDisplayPosition] = useState<[number, number]>(FALLBACK_POSITION);
  const [heading, setHeading] = useState(0);
  const [displayHeading, setDisplayHeading] = useState(0);
  const [followPlayer, setFollowPlayer] = useState(true);
  const [gpsActive, setGpsActive] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const movingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPositionRef = useRef<[number, number]>(FALLBACK_POSITION);
  const animFrameRef = useRef<number>(0);

  // GPS tracking
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        const prev = prevPositionRef.current;

        // Calculate heading from movement if distance is significant (~2m)
        const dist = Math.sqrt(
          Math.pow(newPos[0] - prev[0], 2) + Math.pow(newPos[1] - prev[1], 2)
        );
        if (dist > 0.00002) {
          const bearing = calcBearing(prev, newPos);
          setHeading(bearing);
          setIsMoving(true);
          if (movingTimeoutRef.current) clearTimeout(movingTimeoutRef.current);
          movingTimeoutRef.current = setTimeout(() => setIsMoving(false), 2000);
        }

        prevPositionRef.current = newPos;
        setPlayerPosition(newPos);
        setGpsActive(true);
      },
      (err) => {
        console.warn('GPS error:', err.message);
        setGpsActive(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 2000,
        timeout: 10000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Device orientation (compass) on mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS, alpha for Android
      const compassHeading = (e as any).webkitCompassHeading ?? (e.alpha != null ? (360 - e.alpha) % 360 : null);
      if (compassHeading != null) {
        setHeading(compassHeading);
      }
    };

    // Request permission on iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission().then((response: string) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      });
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, []);

  // Smooth interpolation for position and heading
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;

      setDisplayPosition((prev) => {
        const dLat = playerPosition[0] - prev[0];
        const dLng = playerPosition[1] - prev[1];
        if (Math.abs(dLat) < 0.000001 && Math.abs(dLng) < 0.000001) return prev;
        return [prev[0] + dLat * 0.1, prev[1] + dLng * 0.1];
      });

      setDisplayHeading((prev) => {
        const next = lerpAngle(prev, heading, 0.08);
        if (Math.abs(next - prev) < 0.01) return prev;
        return next;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [playerPosition, heading]);


  const handleRecenter = useCallback(() => {
    setFollowPlayer(true);
  }, []);

  return (
    <div className="fixed inset-0">
      <AppHeader />
      {/* Map with 3D perspective + compass rotation + sky background */}
      <div className="absolute inset-0 top-14 pb-16 pokemon-go-map">
        <MapContainer
          center={playerPosition}
          zoom={16}
          minZoom={13}
          maxZoom={19}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution=""
          />

          <MapFollower position={displayPosition} shouldFollow={followPlayer} onDrag={() => setFollowPlayer(false)} />
          <PlayerAvatar position={displayPosition} heading={displayHeading} isMoving={isMoving} />

          {/* Pharmacy markers */}
          {mockPharmacies.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={pharmacyIcon}>
              <Popup className="game-popup">
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E30613] flex items-center justify-center text-white font-black text-sm">+</div>
                    <div>
                      <h3 className="font-bold text-sm">{p.name}</h3>
                      <p className="text-[10px] text-gray-500">{p.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#0066FF] mb-2">
                    <Navigation className="w-3 h-3" />
                    <span>{p.distance}</span>
                  </div>
                  <Button size="sm" className="w-full bg-[#E30613] hover:bg-[#B80510] text-white text-xs h-8 rounded-xl border-0">
                    Ver produtos
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Drop markers */}
          {mockDrops.map((d) => (
            <Marker key={`drop-${d.id}`} position={[d.pharmacy.lat, d.pharmacy.lng]} icon={dropIcon}>
              <Popup className="game-popup">
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-sm">{d.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{d.description}</p>
                  <p className="text-xs text-[#E30613] mt-1 font-semibold">{d.pharmacy.name}</p>
                  <div className="mt-2 text-[10px] text-[#FFD400] font-bold">⚡ {d.quantity} restantes</div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Rare product markers */}
          {mockRareProducts.map((rp) => (
            <Marker key={`rare-${rp.id}`} position={[rp.lat, rp.lng]} icon={rareIcon}>
              <Popup className="game-popup">
                <div className="p-2 min-w-[180px]">
                  <div className="text-center">
                    <span className="text-2xl">{rp.product.image_url}</span>
                    <h3 className="font-bold text-sm mt-1">{rp.product.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-1">{rp.product.description}</p>
                    <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-[10px] font-bold">
                      RARO
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Mission markers */}
          {mockMissions.map((m) => (
            <Marker key={`mission-${m.id}`} position={[m.lat, m.lng]} icon={missionIcon}>
              <Popup className="game-popup">
                <div className="p-2 min-w-[180px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{m.icon}</span>
                    <h3 className="font-bold text-sm">{m.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{m.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-[#FFD400] font-bold">
                    🏆 {m.reward} XP
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Game overlays */}
      <GameHUD onRecenter={handleRecenter} />
      <BottomNav />
    </div>
  );
};

export default Home;
