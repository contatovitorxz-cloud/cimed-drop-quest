import { Circle, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useMemo } from 'react';

interface PlayerAvatarProps {
  position: [number, number];
  heading?: number;
}

const PlayerAvatar = ({ position, heading = 0 }: PlayerAvatarProps) => {
  // Direction arrow icon that rotates with heading
  const directionIcon = useMemo(() => {
    return new L.DivIcon({
      html: `<div class="player-direction-arrow" style="transform: rotate(${heading}deg)">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4 L30 20 L24 16 L18 20 Z" fill="#0066FF" fill-opacity="0.7" stroke="white" stroke-width="1.5"/>
        </svg>
      </div>`,
      className: '',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });
  }, [heading]);

  return (
    <>
      {/* Interaction radius */}
      <Circle
        center={position}
        radius={200}
        pathOptions={{
          color: '#0066FF',
          fillColor: '#0066FF',
          fillOpacity: 0.06,
          weight: 1.5,
          opacity: 0.2,
          dashArray: '6 4',
        }}
      />

      {/* Outer pulse ring */}
      <Circle
        center={position}
        radius={50}
        pathOptions={{
          color: '#0066FF',
          fillColor: '#0066FF',
          fillOpacity: 0.1,
          weight: 2,
          opacity: 0.3,
        }}
      />

      {/* Direction arrow */}
      <Marker position={position} icon={directionIcon} />

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
