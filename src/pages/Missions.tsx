import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import MissionCard from '@/components/game/MissionCard';
import { mockMissionCards } from '@/data/mockData';
import { Target } from 'lucide-react';
import EmptyState from '@/components/ui/empty-state';

const Missions = () => {
  const weekly = mockMissionCards.filter(m => m.missionType === 'weekly');
  const daily = mockMissionCards.filter(m => m.missionType === 'daily');
  const special = mockMissionCards.filter(m => m.missionType === 'special');
  const hasMissions = mockMissionCards.length > 0;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-black">Missões</h1>
        </div>

        {!hasMissions ? (
          <EmptyState
            icon={Target}
            title="Nenhuma missão disponível"
            description="Novas missões serão publicadas em breve. Fique atento!"
          />
        ) : (
          <>
            {special.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-purple-400 mb-3">Missões Especiais</h2>
                <div className="space-y-3">
                  {special.map(m => <MissionCard key={m.id} mission={m} />)}
                </div>
              </div>
            )}
            {weekly.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold mb-3">Semanais</h2>
                <div className="space-y-3">
                  {weekly.map(m => <MissionCard key={m.id} mission={m} />)}
                </div>
              </div>
            )}
            {daily.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-green-400 mb-3">Diárias</h2>
                <div className="space-y-3">
                  {daily.map(m => <MissionCard key={m.id} mission={m} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Missions;
