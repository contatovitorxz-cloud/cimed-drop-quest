import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Gift, UserRound } from 'lucide-react';

const tabs = [
  { path: '/influencer-dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
  { path: '/influencer-drops', label: 'DROPS', icon: Gift, center: true },
  { path: '/influencer-profile', label: 'PERFIL', icon: UserRound },
];

const InfluencerBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t-[3px] border-border">
      <div className="flex items-end justify-center gap-8 px-4 py-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          if (tab.center) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center -mt-5"
              >
                <div className={`w-14 h-14 bg-accent border-[3px] border-border flex items-center justify-center shadow-[4px_4px_0_hsl(var(--border))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${isActive ? 'translate-x-[2px] translate-y-[2px] shadow-none' : ''}`}>
                  <Icon className="w-6 h-6 text-accent-foreground" strokeWidth={2.5} />
                </div>
                <span className="text-[9px] font-black mt-1 tracking-widest text-accent">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 py-1 px-3"
            >
              <Icon
                className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[9px] font-black tracking-widest ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default InfluencerBottomNav;
