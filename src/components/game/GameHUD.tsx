import { QrCode, Flag, Backpack, Compass, Navigation, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GameHUDProps {
  onRecenter?: () => void;
  onScan?: () => void;
}

const GameHUD = ({ onRecenter, onScan }: GameHUDProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 pointer-events-none z-[1000]">
      {/* Bottom Center - QR Code Button */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto">
        <button className="relative group" onClick={onScan}>
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
          { icon: Flag, label: 'Missões', action: () => navigate('/missions') },
          { icon: Backpack, label: 'Inventário', action: () => {} },
          { icon: Compass, label: 'Mapa', action: () => {} },
          { icon: BarChart3, label: 'Dados', action: () => navigate('/analytics') },
        ].map(({ icon: Icon, label, action }) => (
          <button key={label} className="group relative" onClick={action}>
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-accent/40 transition-colors">
              <Icon className="w-5 h-5 text-white/80 group-hover:text-accent transition-colors" />
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
          className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:border-blue-500/40 transition-colors active:scale-95"
        >
          <Navigation className="w-5 h-5 text-blue-500" />
        </button>
      </div>
    </div>
  );
};

export default GameHUD;
