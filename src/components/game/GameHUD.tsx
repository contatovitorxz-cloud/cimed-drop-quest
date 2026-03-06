import { QrCode, Flag, Backpack, Compass, Sun, Navigation } from 'lucide-react';

interface GameHUDProps {
  level?: number;
  xp?: number;
  maxXp?: number;
  username?: string;
  onRecenter?: () => void;
  gpsActive?: boolean;
}

const GameHUD = ({ level = 7, xp = 680, maxXp = 1000, username = 'Jogador', onRecenter, gpsActive = false }: GameHUDProps) => {
  const xpPct = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000]">
      {/* Top Left - Profile */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl rounded-2xl p-2 pr-4 border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E30613] to-[#FF4444] flex items-center justify-center text-white font-black text-sm border-2 border-white/20">
            {level}
          </div>
          <div className="flex-1 min-w-[100px]">
            <p className="text-[10px] font-bold text-white/90 leading-none mb-1">{username}</p>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FFD400] to-[#FFC200] transition-all duration-700"
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <p className="text-[8px] text-white/50 mt-0.5">{xp}/{maxXp} XP</p>
          </div>
        </div>
      </div>

      {/* Top Right - GPS + Weather */}
      <div className="absolute top-4 right-4 pointer-events-auto flex items-center gap-2">
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-2.5 border border-white/10 flex items-center gap-2">
          <Sun className="w-4 h-4 text-[#FFD400]" />
          <span className="text-[10px] text-white/70">28°C</span>
        </div>
        <div className="bg-black/60 backdrop-blur-xl rounded-xl p-2.5 border border-white/10 flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${gpsActive ? 'bg-green-400' : 'bg-yellow-400'} animate-[glow-pulse_2s_infinite]`} />
          <span className="text-[10px] text-white/70">GPS</span>
        </div>
      </div>

      {/* Bottom Center - QR Code Button */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto">
        <button className="relative group">
          <div className="absolute inset-0 bg-[#E30613] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#E30613] to-[#B80510] flex items-center justify-center border-[3px] border-white/30 shadow-lg shadow-[#E30613]/30 active:scale-95 transition-transform">
            <QrCode className="w-7 h-7 text-white" />
          </div>
          <p className="text-[8px] text-white/80 font-bold text-center mt-1 tracking-wide">ESCANEAR</p>
        </button>
      </div>

      {/* Bottom Right - Action Buttons */}
      <div className="absolute bottom-24 right-4 pointer-events-auto flex flex-col gap-2">
        {[
          { icon: Flag, label: 'Missões' },
          { icon: Backpack, label: 'Inventário' },
          { icon: Compass, label: 'Mapa' },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="group relative">
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-[#FFD400]/40 transition-colors">
              <Icon className="w-5 h-5 text-white/80 group-hover:text-[#FFD400] transition-colors" />
            </div>
            <span className="absolute right-14 top-1/2 -translate-y-1/2 text-[9px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Left - Navigation / Recenter */}
      <div className="absolute bottom-24 left-4 pointer-events-auto">
        <button
          onClick={onRecenter}
          className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-[#0066FF]/40 transition-colors active:scale-95"
        >
          <Navigation className="w-5 h-5 text-[#0066FF]" />
        </button>
      </div>
    </div>
  );
};

export default GameHUD;
