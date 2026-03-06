import { Circle, useMap } from 'react-leaflet';
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
      html: `<div style="transform: rotate(${heading}deg); width: 64px; height: 80px; position: relative;">
        <!-- Shadow -->
        <div style="position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:40px; height:12px; background:radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%); border-radius:50%;"></div>
        
        <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Direction arrow -->
          <path d="M32 0 L38 14 L32 10 L26 14 Z" fill="#FFD400" stroke="#E5BE00" stroke-width="1" opacity="0.9"/>
          
          <!-- Legs -->
          <rect x="22" y="58" width="7" height="12" rx="3.5" fill="#4A90D9" stroke="#3A7BC8" stroke-width="0.5"/>
          <rect x="35" y="58" width="7" height="12" rx="3.5" fill="#4A90D9" stroke="#3A7BC8" stroke-width="0.5"/>
          
          <!-- Shoes -->
          <ellipse cx="25.5" cy="71" rx="5" ry="3" fill="#333" stroke="#222" stroke-width="0.5"/>
          <ellipse cx="38.5" cy="71" rx="5" ry="3" fill="#333" stroke="#222" stroke-width="0.5"/>
          
          <!-- Body / Yellow shirt -->
          <rect x="16" y="34" width="32" height="26" rx="6" fill="#FFD400" stroke="#E5BE00" stroke-width="1"/>
          <!-- Shirt shading -->
          <rect x="16" y="34" width="32" height="26" rx="6" fill="url(#shirtGrad)"/>
          
          <!-- CIMED text on shirt -->
          <text x="32" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="7.5" fill="#E30613" letter-spacing="0.5">CIMED</text>
          
          <!-- Arms -->
          <rect x="8" y="36" width="9" height="18" rx="4.5" fill="#FFD400" stroke="#E5BE00" stroke-width="0.5"/>
          <rect x="47" y="36" width="9" height="18" rx="4.5" fill="#FFD400" stroke="#E5BE00" stroke-width="0.5"/>
          
          <!-- Hands -->
          <circle cx="12.5" cy="55" r="4" fill="#FFCC99" stroke="#E5B080" stroke-width="0.5"/>
          <circle cx="51.5" cy="55" r="4" fill="#FFCC99" stroke="#E5B080" stroke-width="0.5"/>
          
          <!-- Neck -->
          <rect x="27" y="30" width="10" height="6" rx="2" fill="#FFCC99"/>
          
          <!-- Head -->
          <circle cx="32" cy="24" r="12" fill="#FFCC99" stroke="#E5B080" stroke-width="0.8"/>
          
          <!-- Hair -->
          <path d="M20 22 Q20 12 32 12 Q44 12 44 22 Q44 16 38 14 Q32 13 26 14 Q20 16 20 22Z" fill="#5C3317"/>
          
          <!-- Eyes -->
          <ellipse cx="27" cy="24" rx="2" ry="2.5" fill="white"/>
          <circle cx="27.5" cy="24" r="1.3" fill="#333"/>
          <circle cx="28" cy="23.5" r="0.5" fill="white"/>
          
          <ellipse cx="37" cy="24" rx="2" ry="2.5" fill="white"/>
          <circle cx="37.5" cy="24" r="1.3" fill="#333"/>
          <circle cx="38" cy="23.5" r="0.5" fill="white"/>
          
          <!-- Smile -->
          <path d="M28 28 Q32 32 36 28" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/>
          
          <!-- Blush -->
          <ellipse cx="24" cy="27" rx="2.5" ry="1.5" fill="#FFB3B3" opacity="0.5"/>
          <ellipse cx="40" cy="27" rx="2.5" ry="1.5" fill="#FFB3B3" opacity="0.5"/>
          
          <defs>
            <linearGradient id="shirtGrad" x1="16" y1="34" x2="48" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="white" stop-opacity="0.15"/>
              <stop offset="50%" stop-color="white" stop-opacity="0"/>
              <stop offset="100%" stop-color="black" stop-opacity="0.1"/>
            </linearGradient>
          </defs>
        </svg>
      </div>`,
      className: 'player-character-icon',
      iconSize: [64, 80],
      iconAnchor: [32, 70],
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

      {/* Pulse ring */}
      <Circle
        center={position}
        radius={50}
        pathOptions={{
          color: '#FFD400',
          fillColor: '#FFD400',
          fillOpacity: 0.1,
          weight: 2,
          opacity: 0.3,
        }}
      />

      {/* Character marker */}
      <Marker position={position} icon={characterIcon} />
    </>
  );
};

export default PlayerAvatar;
