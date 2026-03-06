import { Circle, CircleMarker, useMap } from 'react-leaflet';

interface PlayerAvatarProps {
  position: [number, number];
}

const PlayerAvatar = ({ position }: PlayerAvatarProps) => {
  return (
    <>
      {/* Interaction radius */}
      <Circle
        center={position}
        radius={200}
        pathOptions={{
          color: '#0066FF',
          fillColor: '#0066FF',
          fillOpacity: 0.08,
          weight: 1.5,
          opacity: 0.3,
          dashArray: '6 4',
        }}
        className="player-radius"
      />

      {/* Outer pulse ring */}
      <Circle
        center={position}
        radius={50}
        pathOptions={{
          color: '#0066FF',
          fillColor: '#0066FF',
          fillOpacity: 0.12,
          weight: 2,
          opacity: 0.4,
        }}
      />

      {/* Player marker */}
      <CircleMarker
        center={position}
        radius={12}
        pathOptions={{
          color: '#FFFFFF',
          fillColor: '#0066FF',
          fillOpacity: 1,
          weight: 3,
          opacity: 1,
        }}
      />

      {/* Inner dot */}
      <CircleMarker
        center={position}
        radius={4}
        pathOptions={{
          color: '#FFFFFF',
          fillColor: '#FFFFFF',
          fillOpacity: 1,
          weight: 0,
        }}
      />
    </>
  );
};

export default PlayerAvatar;
