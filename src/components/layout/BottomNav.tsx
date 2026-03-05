import { useLocation, useNavigate } from 'react-router-dom';
import { Map, Package, Swords, Zap, UserCircle } from 'lucide-react';

const tabs = [
  { path: '/home', label: 'Mapa', icon: Map },
  { path: '/products', label: 'Produtos', icon: Package },
  { path: '/challenges', label: 'Desafios', icon: Swords },
  { path: '/drops', label: 'Drops', icon: Zap },
  { path: '/profile', label: 'Perfil', icon: UserCircle },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all duration-200 ${
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-primary/10' : ''}`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.5} />
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
