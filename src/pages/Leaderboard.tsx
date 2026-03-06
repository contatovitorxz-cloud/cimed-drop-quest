import { ArrowLeft, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '@/components/ui/empty-state';

const Leaderboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Crown className="w-6 h-6 text-accent" />
        <h1 className="text-xl font-black">Leaderboard</h1>
      </div>

      <EmptyState
        icon={Crown}
        title="Sem dados de ranking"
        description="O ranking será atualizado conforme os usuários acumulam pontos e completam missões."
      />
    </div>
  );
};

export default Leaderboard;
