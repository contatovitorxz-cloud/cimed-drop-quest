import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import ChallengeCard from '@/components/game/ChallengeCard';
import { mockChallenges } from '@/data/mockData';
import { Trophy } from 'lucide-react';

const Challenges = () => (
  <div className="min-h-screen bg-background pb-20 pt-14">
    <AppHeader />
    <div className="px-4 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-black">Desafios</h2>
      </div>

      {/* Active challenges summary */}
      <div className="gradient-orange rounded-2xl p-4 mb-4">
        <p className="text-sm font-bold text-primary-foreground">
          {mockChallenges.filter((c) => c.progress > 0).length} desafios em andamento
        </p>
        <p className="text-xs text-primary-foreground/70 mt-1">
          Complete desafios para ganhar pontos, badges e produtos!
        </p>
      </div>

      <div className="space-y-3">
        {mockChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
    <BottomNav />
  </div>
);

export default Challenges;
