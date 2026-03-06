import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import DropCard from '@/components/game/DropCard';
import InfluencerDropCard from '@/components/game/InfluencerDropCard';
import { mockDrops, mockInfluencerDrops } from '@/data/mockData';
import { Zap, Sparkles } from 'lucide-react';
import EmptyState from '@/components/ui/empty-state';

const Drops = () => {
  const hasDrops = mockDrops.length > 0 || mockInfluencerDrops.length > 0;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-black">Drops</h2>
        </div>

        {!hasDrops ? (
          <EmptyState
            icon={Zap}
            title="Nenhum drop disponível"
            description="Novos drops aparecerão aqui quando estiverem disponíveis na sua região."
          />
        ) : (
          <>
            {mockInfluencerDrops.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-bold text-accent">Drops de Influenciadores</h3>
                </div>
                <div className="space-y-3">
                  {mockInfluencerDrops.map((drop) => (
                    <InfluencerDropCard key={drop.id} drop={drop} />
                  ))}
                </div>
              </div>
            )}

            {mockDrops.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-3">Drops de Farmácias</h3>
                <div className="space-y-3">
                  {mockDrops.map((drop) => (
                    <DropCard key={drop.id} drop={drop} />
                  ))}
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

export default Drops;
