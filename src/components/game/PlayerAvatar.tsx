import { Circle } from 'react-leaflet';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useMemo } from 'react';

interface PlayerAvatarProps {
  position: [number, number];
  heading?: number;
}

const PlayerAvatar = ({ position, heading = 0 }: PlayerAvatarProps) => {
  const characterIcon = useMemo(() => {
    return new L.DivIcon({
      html: `
        <div class="player-character-icon" style="width:56px;height:68px;position:relative;">
          <!-- Golden glowing disc -->
          <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:48px;height:14px;border-radius:50%;background:radial-gradient(ellipse,hsl(48,100%,55%) 0%,hsl(48,100%,50%) 40%,transparent 70%);opacity:0.8;filter:blur(1px);"></div>
          <div style="position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:36px;height:10px;border-radius:50%;background:radial-gradient(ellipse,hsl(48,100%,65%) 0%,transparent 70%);opacity:0.6;"></div>

          <svg width="56" height="64" viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative;z-index:1;">
            <!-- Body / Yellow shirt -->
            <rect x="16" y="32" width="24" height="18" rx="5" fill="#FFD400"/>
            <rect x="16" y="32" width="24" height="18" rx="5" fill="url(#shirtShine)"/>

            <!-- CIMED text -->
            <text x="28" y="44" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="6" fill="#E30613" letter-spacing="0.3">CIMED</text>

            <!-- Arms -->
            <rect x="10" y="34" width="7" height="12" rx="3.5" fill="#FFD400"/>
            <rect x="39" y="34" width="7" height="12" rx="3.5" fill="#FFD400"/>

            <!-- Hands -->
            <circle cx="13.5" cy="47" r="3" fill="#FFCC99"/>
            <circle cx="42.5" cy="47" r="3" fill="#FFCC99"/>

            <!-- Legs -->
            <rect x="20" y="49" width="6" height="8" rx="3" fill="#4A90D9"/>
            <rect x="30" y="49" width="6" height="8" rx="3" fill="#4A90D9"/>

            <!-- Shoes -->
            <ellipse cx="23" cy="58" rx="4" ry="2.5" fill="#333"/>
            <ellipse cx="33" cy="58" rx="4" ry="2.5" fill="#333"/>

            <!-- Neck -->
            <rect x="24" y="28" width="8" height="5" rx="2" fill="#FFCC99"/>

            <!-- Head -->
            <circle cx="28" cy="20" r="12" fill="#FFCC99"/>

            <!-- Hair -->
            <path d="M16 18 Q16 8 28 8 Q40 8 40 18 Q40 12 34 10 Q28 9 22 10 Q16 12 16 18Z" fill="#5C3317"/>

            <!-- Eyes -->
            <circle cx="23" cy="20" r="2" fill="#333"/>
            <circle cx="23.6" cy="19.3" r="0.7" fill="white"/>
            <circle cx="33" cy="20" r="2" fill="#333"/>
            <circle cx="33.6" cy="19.3" r="0.7" fill="white"/>

            <!-- Smile -->
            <path d="M24 24 Q28 27 32 24" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/>

            <!-- Blush -->
            <ellipse cx="20" cy="22" rx="2" ry="1.2" fill="#FFB3B3" opacity="0.5"/>
            <ellipse cx="36" cy="22" rx="2" ry="1.2" fill="#FFB3B3" opacity="0.5"/>

            <defs>
              <linearGradient id="shirtShine" x1="16" y1="32" x2="40" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="white" stop-opacity="0.2"/>
                <stop offset="50%" stop-color="white" stop-opacity="0"/>
                <stop offset="100%" stop-color="black" stop-opacity="0.08"/>
              </linearGradient>
            </defs>
          </svg>
        </div>`,
      className: '',
      iconSize: [56, 68],
      iconAnchor: [28, 62],
    });
  }, []);

  return (
    <>
      {/* Interaction radius */}
      <Circle
        center={position}
        radius={200}
        pathOptions={{
          color: '#0066FF',
          fillColor: '#0066FF',
          fillOpacity: 0.04,
          weight: 1,
          opacity: 0.15,
          dashArray: '6 4',
        }}
      />

      {/* Pulse ring */}
      <Circle
        center={position}
        radius={40}
        pathOptions={{
          color: '#FFD400',
          fillColor: '#FFD400',
          fillOpacity: 0.08,
          weight: 1.5,
          opacity: 0.25,
        }}
      />

      {/* Character marker */}
      <Marker position={position} icon={characterIcon} zIndexOffset={1000} />
    </>
  );
};

export default PlayerAvatar;
