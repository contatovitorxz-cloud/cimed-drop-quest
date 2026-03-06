import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useMemo } from 'react';

interface PlayerAvatarProps {
  position: [number, number];
  heading?: number;
  isMoving?: boolean;
}

const PlayerAvatar = ({ position }: PlayerAvatarProps) => {
  const blueDotIcon = useMemo(() => {
    return new L.DivIcon({
      html: `
        <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;width:40px;height:40px;border-radius:50%;background:rgba(66,133,244,0.15);animation:radar-pulse 2s ease-out infinite;"></div>
          <div style="position:absolute;width:40px;height:40px;border-radius:50%;background:rgba(66,133,244,0.1);animation:radar-pulse 2s ease-out 1s infinite;"></div>
          <div style="width:16px;height:16px;border-radius:50%;background:#4285F4;border:3px solid white;box-shadow:0 0 8px rgba(66,133,244,0.6);position:relative;z-index:1;"></div>
        </div>`,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  }, []);

  return (
    <Marker position={position} icon={blueDotIcon} zIndexOffset={1000} />
  );
};

export default PlayerAvatar;
