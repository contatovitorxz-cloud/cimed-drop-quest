import type { Challenge } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const pct = (challenge.progress / challenge.goal) * 100;

  return (
    <div className="p-4 brutal-card brutal-card-hover">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-accent flex items-center justify-center text-2xl shrink-0 border-[2px] border-border">
          {challenge.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-sm truncate uppercase">{challenge.title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{challenge.description}</p>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground font-bold">{challenge.progress}/{challenge.goal}</span>
              <span className="text-accent font-black">+{challenge.rewardValue} pts</span>
            </div>
            <Progress value={pct} className="h-2 bg-muted border-[2px] border-border [&>div]:bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
