import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { useMemo } from 'react';

interface PlayerAvatarProps {
  position: [number, number];
  heading?: number;
  isMoving?: boolean;
}

const PlayerAvatar = ({ position, heading = 0, isMoving = false }: PlayerAvatarProps) => {
  const characterIcon = useMemo(() => {
    const walkingClass = isMoving ? ' walking' : '';
    return new L.DivIcon({
      html: `
        <div class="player-character-icon${walkingClass}" style="width:64px;height:82px;position:relative;">
          <!-- Radar pulse ring -->
          <div class="player-radar-ring" style="position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:70px;height:24px;border-radius:50%;border:2px solid rgba(255,212,0,0.5);animation:radar-pulse 2s ease-out infinite;"></div>
          <div class="player-radar-ring" style="position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:70px;height:24px;border-radius:50%;border:2px solid rgba(255,212,0,0.3);animation:radar-pulse 2s ease-out 1s infinite;"></div>
          <!-- Golden glowing disc on ground -->
          <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:54px;height:18px;border-radius:50%;background:radial-gradient(ellipse,rgba(255,212,0,0.7) 0%,rgba(255,212,0,0.35) 40%,rgba(255,212,0,0.1) 65%,transparent 100%);filter:blur(1.5px);"></div>
          <div style="position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:40px;height:12px;border-radius:50%;background:radial-gradient(ellipse,rgba(255,230,100,0.6) 0%,transparent 70%);"></div>

          <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative;z-index:1;">
            <defs>
              <!-- 3D shirt gradient -->
              <linearGradient id="shirtMain" x1="14" y1="30" x2="50" y2="56" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFE44D"/>
                <stop offset="35%" stop-color="#FFD400"/>
                <stop offset="70%" stop-color="#F0C000"/>
                <stop offset="100%" stop-color="#D4A800"/>
              </linearGradient>
              <!-- Shirt highlight -->
              <linearGradient id="shirtHighlight" x1="20" y1="30" x2="32" y2="45" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="white" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="white" stop-opacity="0"/>
              </linearGradient>
              <!-- Skin gradient -->
              <radialGradient id="skinGrad" cx="0.45" cy="0.35" r="0.55">
                <stop offset="0%" stop-color="#FFE0BD"/>
                <stop offset="70%" stop-color="#FFCC99"/>
                <stop offset="100%" stop-color="#F0B880"/>
              </radialGradient>
              <!-- Head shadow -->
              <radialGradient id="headShadow" cx="0.5" cy="0.9" r="0.5">
                <stop offset="0%" stop-color="#E0A060" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#E0A060" stop-opacity="0"/>
              </radialGradient>
              <!-- Hair gradient -->
              <linearGradient id="hairGrad" x1="16" y1="4" x2="48" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#6B3A1F"/>
                <stop offset="50%" stop-color="#5C3317"/>
                <stop offset="100%" stop-color="#4A2710"/>
              </linearGradient>
              <!-- Arm gradient -->
              <linearGradient id="armGradL" x1="8" y1="32" x2="16" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFE44D"/>
                <stop offset="100%" stop-color="#D4A800"/>
              </linearGradient>
              <linearGradient id="armGradR" x1="48" y1="32" x2="56" y2="50" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#FFD400"/>
                <stop offset="100%" stop-color="#C89E00"/>
              </linearGradient>
              <!-- Pants gradient (black) -->
              <linearGradient id="jeansGrad" x1="20" y1="50" x2="44" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#333"/>
                <stop offset="100%" stop-color="#111"/>
              </linearGradient>
              <!-- Shoe gradient -->
              <linearGradient id="shoeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#444"/>
                <stop offset="100%" stop-color="#222"/>
              </linearGradient>
            </defs>

            <!-- === LEGS === -->
            <rect x="21" y="50" width="8" height="14" rx="4" fill="url(#jeansGrad)" stroke="#222" stroke-width="0.4"/>
            <rect x="35" y="50" width="8" height="14" rx="4" fill="url(#jeansGrad)" stroke="#222" stroke-width="0.4"/>

            <!-- === SHOES === -->
            <ellipse cx="25" cy="64.5" rx="6" ry="3.5" fill="url(#shoeGrad)"/>
            <ellipse cx="25" cy="63" rx="4" ry="1" fill="#555" opacity="0.4"/>
            <ellipse cx="39" cy="64.5" rx="6" ry="3.5" fill="url(#shoeGrad)"/>
            <ellipse cx="39" cy="63" rx="4" ry="1" fill="#555" opacity="0.4"/>

            <!-- === BODY / SHIRT === -->
            <rect x="15" y="31" width="34" height="22" rx="7" fill="url(#shirtMain)" stroke="#C89E00" stroke-width="0.5"/>
            <rect x="15" y="31" width="34" height="22" rx="7" fill="url(#shirtHighlight)"/>

            <!-- Shirt collar -->
            <path d="M26 31 Q32 35 38 31" stroke="#E5BE00" stroke-width="1" fill="none"/>

            <!-- CIMED text in black -->
            <text x="32" y="46.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-size="7.5" fill="#1a1a1a" letter-spacing="0.8">CIMED</text>

            <!-- === ARMS === -->
            <!-- Left arm -->
            <rect x="7" y="33" width="10" height="16" rx="5" fill="url(#armGradL)" stroke="#C89E00" stroke-width="0.4"/>
            <!-- Right arm -->
            <rect x="47" y="33" width="10" height="16" rx="5" fill="url(#armGradR)" stroke="#C89E00" stroke-width="0.4"/>

            <!-- === HANDS === -->
            <circle cx="12" cy="50" r="4" fill="url(#skinGrad)" stroke="#E0A060" stroke-width="0.4"/>
            <circle cx="52" cy="50" r="4" fill="url(#skinGrad)" stroke="#E0A060" stroke-width="0.4"/>

            <!-- === NECK === -->
            <rect x="26" y="26" width="12" height="7" rx="3" fill="url(#skinGrad)"/>

            <!-- === HEAD === -->
            <circle cx="32" cy="18" r="14" fill="url(#skinGrad)" stroke="#E0A060" stroke-width="0.5"/>
            <circle cx="32" cy="18" r="14" fill="url(#headShadow)"/>

            <!-- === HAIR === -->
            <path d="M18 16 Q18 4 32 4 Q46 4 46 16 Q46 9 39 7 Q32 5.5 25 7 Q18 9 18 16Z" fill="url(#hairGrad)"/>
            <!-- Side hair -->
            <path d="M18 16 Q17 18 18 20" stroke="url(#hairGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M46 16 Q47 18 46 20" stroke="url(#hairGrad)" stroke-width="3" fill="none" stroke-linecap="round"/>

            <!-- === EARS === -->
            <ellipse cx="18" cy="19" rx="2.5" ry="3" fill="url(#skinGrad)" stroke="#E0A060" stroke-width="0.3"/>
            <ellipse cx="46" cy="19" rx="2.5" ry="3" fill="url(#skinGrad)" stroke="#E0A060" stroke-width="0.3"/>

            <!-- === NOSE === -->
            <ellipse cx="32" cy="21" rx="1.2" ry="0.8" fill="#E8B080" opacity="0.6"/>
          </svg>
        </div>`,
      className: '',
      iconSize: [64, 82],
      iconAnchor: [32, 76],
    });
  }, [isMoving]);

  return (
    <Marker position={position} icon={characterIcon} zIndexOffset={1000} />
  );
};

export default PlayerAvatar;
