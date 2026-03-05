import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import DropCard from '@/components/game/DropCard';
import { mockDrops } from '@/data/mockData';
import { Zap } from 'lucide-react';

const Drops = () => (
  <div className="min-h-screen bg-background pb-20 pt-14">
    <AppHeader />
    <div className="px-4 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-black">Drops Ativos</h2>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-4">
        <p className="text-sm font-bold text-accent">
          ⚡ {mockDrops.length} drops disponíveis agora!
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Vá até a farmácia para resgatar antes que expire.
        </p>
      </div>

      <div className="space-y-3">
        {mockDrops.map((drop) => (
          <DropCard key={drop.id} drop={drop} />
        ))}
      </div>
    </div>
    <BottomNav />
  </div>
);

export default Drops;
