import { LayoutDashboard, BarChart3, Users, Gift } from 'lucide-react';

const tabs = [
  { key: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
  { key: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
  { key: 'influencers', label: 'INFLUENCERS', icon: Users },
  { key: 'drops', label: 'DROPS', icon: Gift },
];

interface AdminBottomNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminBottomNav({ activeSection, onSectionChange }: AdminBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background dark:bg-[hsl(0,0%,8%)] border-t-[3px] border-border safe-bottom md:hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = activeSection === tab.key;
          const Icon = tab.icon;

          return (
            <button
              key={tab.key}
              onClick={() => onSectionChange(tab.key)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all relative ${active ? 'border-t-2 border-accent -mt-[2px]' : ''}`}
            >
              <Icon className={`w-6 h-6 ${active ? 'text-accent' : 'text-muted-foreground'}`} strokeWidth={active ? 2.5 : 1.5} />
              <span className={`text-[9px] font-black ${active ? 'text-accent' : 'text-muted-foreground'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
