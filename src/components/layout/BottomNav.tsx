import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation, Target, QrCode, Users, UserRound } from 'lucide-react';
import QRScanner from '@/components/qr/QRScanner';

const tabs = [
  { path: '/home', label: 'Mapa', icon: Navigation },
  { path: '/missions', label: 'Missões', icon: Target },
  { path: '/scan', label: 'Scan', icon: QrCode, isCenter: true },
  { path: '/social', label: 'Social', icon: Users },
  { path: '/profile', label: 'Perfil', icon: UserRound },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scannerOpen, setScannerOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 gradient-yellow backdrop-blur-xl border-t border-white/10 safe-bottom">
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            const Icon = tab.icon;

            if (tab.isCenter) {
              return (
                <button
                  key={tab.path}
                  onClick={() => setScannerOpen(true)}
                  className="relative -mt-6"
                >
                  <div className="absolute inset-0 bg-[#E30613] rounded-full blur-lg opacity-40" />
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#E30613] to-[#B80510] flex items-center justify-center border-[3px] border-white/40 shadow-lg active:scale-95 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-[9px] text-black font-bold text-center mt-0.5">{tab.label}</p>
                </button>
              );
            }

            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${
                  active ? 'text-black drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]' : 'text-black/50 hover:text-black/70'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-black/10' : ''}`}>
                  <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
                </div>
                <span className="text-[10px] font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <QRScanner open={scannerOpen} onClose={() => setScannerOpen(false)} />
    </>
  );
};

export default BottomNav;
