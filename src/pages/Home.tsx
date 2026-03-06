import { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mockPharmacies, mockDrops, mockMissions, mockRareProducts } from '@/data/mockData';
import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameHUD from '@/components/game/GameHUD';
import PlayerAvatar from '@/components/game/PlayerAvatar';
import FloatingParticles from '@/components/game/FloatingParticles';
import BottomNav from '@/components/layout/BottomNav';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Marker icons
const pharmacyIcon = new L.DivIcon({
  html: `<div class="marker-pharmacy"><span>+</span></div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const dropIcon = new L.DivIcon({
  html: `<div class="marker-drop"><span>🎁</span></div>`,
  className: '',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const rareIcon = new L.DivIcon({
  html: `<div class="marker-rare"><span>💊</span></div>`,
  className: '',
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

const missionIcon = new L.DivIcon({
  html: `<div class="marker-mission"><span>⭐</span></div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Offset the map center so avatar appears in the lower third
const OFFSET_FACTOR = 0.0012; // ~120m north offset at zoom 17

function getOffsetCenter(pos: [number, number], heading: number): [number, number] {
  const rad = (heading * Math.PI) / 180;
  return [
    pos[0] + OFFSET_FACTOR * Math.cos(rad),
    pos[1] + OFFSET_FACTOR * Math.sin(rad),
  ];
}

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

// Component that follows the player with offset
const MapFollower = ({
  position,
  heading,
  shouldFollow,
}: {
  position: [number, number];
  heading: number;
  shouldFollow: boolean;
}) => {
  const map = useMap();

  useEffect(() => {
    if (shouldFollow) {
      const center = getOffsetCenter(position, heading);
      map.setView(center, map.getZoom(), { animate: true });
    }
  }, [position, heading, shouldFollow, map]);

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
  const prevPositionRef = useRef<[number, number]>(FALLBACK_POSITION);
  const animFrameRef = useRef<number>(0);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

      setDisplayPosition((prev) => [
        prev[0] + (playerPosition[0] - prev[0]) * 0.1,
        prev[1] + (playerPosition[1] - prev[1]) * 0.1,
      ]);

      setDisplayHeading((prev) => lerpAngle(prev, heading, 0.08));

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [playerPosition, heading]);

  // Apply CSS rotation to map container
  useEffect(() => {
    if (mapContainerRef.current) {
      mapContainerRef.current.style.setProperty('--map-heading', `${-displayHeading}deg`);
    }
  }, [displayHeading]);

  const handleRecenter = useCallback(() => {
    setFollowPlayer(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      {/* Map with 3D perspective + compass rotation */}
      <div ref={mapContainerRef} className="absolute inset-0 pb-16 pokemon-go-map">
        <MapContainer
          center={getOffsetCenter(playerPosition, heading)}
          zoom={17}
          minZoom={15}
          maxZoom={19}
          className="h-full w-full"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution=""
          />

          <MapFollower position={displayPosition} heading={displayHeading} shouldFollow={followPlayer} />
          <PlayerAvatar position={displayPosition} heading={displayHeading} />

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
      <FloatingParticles />
      <GameHUD onRecenter={handleRecenter} gpsActive={gpsActive} />
      <BottomNav />
    </div>
  );
};

export default Home;
