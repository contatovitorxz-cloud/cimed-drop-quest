import type { Challenge } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const pct = (challenge.progress / challenge.goal) * 100;

  return (
    <div className="p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl shrink-0">
          {challenge.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm truncate">{challenge.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{challenge.description}</p>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{challenge.progress}/{challenge.goal}</span>
              <span className="text-primary font-semibold">+{challenge.rewardValue} pts</span>
            </div>
            <Progress value={pct} className="h-2 bg-secondary [&>div]:gradient-orange" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
