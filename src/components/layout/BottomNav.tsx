import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Target, Gift, Trophy, UserRound } from 'lucide-react';

const tabs = [
  { path: '/home', label: 'Mapa', icon: MapPin },
  { path: '/missions', label: 'Missões', icon: Target },
  { path: '/drops', label: 'Drops', icon: Gift, isCenter: true },
  { path: '/leaderboard', label: 'Ranking', icon: Trophy },
  { path: '/profile', label: 'Perfil', icon: UserRound },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-header safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="relative -mt-6"
              >
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-accent shadow-depth-lg active:scale-95 transition-transform">
                  <Icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <p className="text-[10px] font-bold text-center mt-1 text-accent">{tab.label}</p>
              </button>
            );
          }

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all duration-300 relative"
            >
              <Icon className={`w-6 h-6 transition-all duration-300 ${active ? 'text-accent scale-110' : 'text-muted-foreground'}`} strokeWidth={active ? 2.2 : 1.5} />
              <span className={`text-xs font-bold transition-all duration-300 ${active ? 'text-accent' : 'text-muted-foreground'}`}>{tab.label}</span>
              {active && (
                <div className="absolute -bottom-0.5 w-5 h-0.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
