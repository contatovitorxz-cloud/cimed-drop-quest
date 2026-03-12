import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Target, Gift, Trophy, UserRound } from 'lucide-react';

const tabs = [
  { path: '/home', label: 'MAPA', icon: MapPin },
  { path: '/missions', label: 'MISSÕES', icon: Target },
  { path: '/drops', label: 'DROPS', icon: Gift, isCenter: true },
  { path: '/leaderboard', label: 'RANKING', icon: Trophy },
  { path: '/profile', label: 'PERFIL', icon: UserRound },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background dark:bg-[hsl(0,0%,8%)] border-t-[3px] border-border safe-bottom">
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
                <div className="relative w-14 h-14 flex items-center justify-center bg-accent border-[3px] border-border shadow-[3px_3px_0_hsl(var(--border))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                  <Icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <p className="text-[10px] font-black text-center mt-1 text-accent uppercase">{tab.label}</p>
              </button>
            );
          }

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all relative ${active ? 'border-t-2 border-accent -mt-[2px]' : ''}`}
            >
              <Icon className={`w-6 h-6 ${active ? 'text-accent' : 'text-muted-foreground'}`} strokeWidth={active ? 2.5 : 1.5} />
              <span className={`text-[10px] font-black ${active ? 'text-accent' : 'text-muted-foreground'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
