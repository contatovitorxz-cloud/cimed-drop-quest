import type { UserBadge } from '@/data/mockData';
import { Trophy, Map, Star, Smartphone, Gift, Footprints } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  map: Map,
  star: Star,
  smartphone: Smartphone,
  gift: Gift,
  footprints: Footprints,
};

const BadgeCard = ({ badge }: { badge: UserBadge }) => {
  const earned = !!badge.earnedAt;
  const Icon = iconMap[badge.icon] || Star;

  return (
    <div className={`flex flex-col items-center gap-2 p-4 border-[3px] border-border transition-all ${
      earned ? 'bg-accent text-accent-foreground shadow-[3px_3px_0_hsl(var(--border))]' : 'bg-muted opacity-50'
    }`}>
      <div className="w-10 h-10 flex items-center justify-center border-[2px] border-border bg-background">
        <Icon className={`w-5 h-5 ${earned ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
      </div>
      <span className="text-xs font-black text-center leading-tight uppercase">{badge.name}</span>
      {earned && <span className="text-[10px] font-bold">Conquistada</span>}
    </div>
  );
};

export default BadgeCard;
