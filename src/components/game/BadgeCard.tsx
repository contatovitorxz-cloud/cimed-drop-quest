import type { UserBadge } from '@/data/mockData';

const BadgeCard = ({ badge }: { badge: UserBadge }) => {
  const earned = !!badge.earnedAt;

  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
      earned ? 'bg-card border-primary/20 glow-orange' : 'bg-secondary/50 border-border opacity-50 grayscale'
    }`}>
      <span className="text-3xl">{badge.icon}</span>
      <span className="text-xs font-bold text-center leading-tight">{badge.name}</span>
      {earned && <span className="text-[10px] text-muted-foreground">Conquistada</span>}
    </div>
  );
};

export default BadgeCard;
