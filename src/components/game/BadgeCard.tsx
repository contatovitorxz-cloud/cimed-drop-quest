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
    <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
      earned ? 'bg-card border-primary/20 glow-orange' : 'bg-secondary/50 border-border opacity-50 grayscale'
    }`}>
      <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
        <Icon className={`w-5 h-5 ${earned ? 'text-accent' : 'text-muted-foreground'}`} />
      </div>
      <span className="text-xs font-bold text-center leading-tight">{badge.name}</span>
      {earned && <span className="text-[10px] text-muted-foreground">Conquistada</span>}
    </div>
  );
};

export default BadgeCard;
