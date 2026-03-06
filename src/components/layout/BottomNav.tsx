import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation, Store, Crosshair, Gift, UserRound } from 'lucide-react';

const tabs = [
  { path: '/home', label: 'Mapa', icon: Navigation },
  { path: '/products', label: 'Produtos', icon: Store },
  { path: '/challenges', label: 'Desafios', icon: Crosshair },
  { path: '/drops', label: 'Drops', icon: Gift },
  { path: '/profile', label: 'Perfil', icon: UserRound },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 gradient-yellow backdrop-blur-xl border-t border-white/10 safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;
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
  );
};

export default BottomNav;
