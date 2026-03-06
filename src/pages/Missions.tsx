import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import MissionCard from '@/components/game/MissionCard';
import { mockMissionCards } from '@/data/mockData';
import { Target, Flame, Star } from 'lucide-react';

const Missions = () => {
  const weekly = mockMissionCards.filter(m => m.missionType === 'weekly');
  const daily = mockMissionCards.filter(m => m.missionType === 'daily');
  const special = mockMissionCards.filter(m => m.missionType === 'special');

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-black">Missões</h1>
        </div>

        {/* Weekly missions summary */}
        <div className="gradient-orange rounded-2xl p-4 mb-6">
          <p className="text-sm font-bold text-primary-foreground">
            🔥 {weekly.length} missões semanais ativas
          </p>
          <p className="text-xs text-primary-foreground/70 mt-1">
            Complete missões para ganhar pontos, badges e produtos exclusivos!
          </p>
        </div>

        {/* Special Missions */}
        {special.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-purple-400">Missões Especiais</h2>
            </div>
            <div className="space-y-3">
              {special.map(m => <MissionCard key={m.id} mission={m} />)}
            </div>
          </div>
        )}

        {/* Weekly Missions */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold">Semanais</h2>
          </div>
          <div className="space-y-3">
            {weekly.map(m => <MissionCard key={m.id} mission={m} />)}
          </div>
        </div>

        {/* Daily Missions */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-green-400" />
            <h2 className="text-sm font-bold text-green-400">Diárias</h2>
          </div>
          <div className="space-y-3">
            {daily.map(m => <MissionCard key={m.id} mission={m} />)}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Missions;
