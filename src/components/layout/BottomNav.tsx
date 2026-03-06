import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, ShoppingBag, Target, Gift, User } from 'lucide-react';

const tabs = [
  { path: '/home', label: 'Mapa', icon: MapPin },
  { path: '/products', label: 'Produtos', icon: ShoppingBag },
  { path: '/challenges', label: 'Desafios', icon: Target },
  { path: '/drops', label: 'Drops', icon: Gift },
  { path: '/profile', label: 'Perfil', icon: User },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 gradient-yellow backdrop-blur-xl border-t border-yellow-600/30 safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${
                active ? 'text-black' : 'text-black/50 hover:text-black/70'
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
