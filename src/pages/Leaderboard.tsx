import { Crown, Trophy, Medal } from 'lucide-react';
import { useLeaderboard } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import EmptyState from '@/components/ui/empty-state';
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';

const Leaderboard = () => {
  const { entries, loading } = useLeaderboard();
  const { user } = useAuth();

  const myRank = user ? entries.findIndex(e => e.id === user.id) + 1 : 0;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-6 h-6 text-accent" />
          <h1 className="font-anton text-2xl">LEADERBOARD</h1>
        </div>

        {/* My rank */}
        {myRank > 0 && (
          <div className="mb-4 brutal-card-dark p-4">
            <p className="text-xs font-black uppercase text-muted-foreground">Sua posição</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-2xl font-black">#{myRank}</span>
              <span className="text-sm font-black">{entries[myRank - 1]?.total_points.toLocaleString('pt-BR')} pts</span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-14 bg-muted animate-pulse border-[3px] border-border" />)}
          </div>
        ) : entries.length === 0 ? (
          <EmptyState
            icon={Crown}
            title="Sem dados de ranking"
            description="O ranking será atualizado conforme os usuários acumulam pontos."
          />
        ) : (
          <div className="space-y-2">
            {entries.map((entry, i) => {
              const isMe = user?.id === entry.id;
              const rank = i + 1;
              return (
                <div key={entry.id} className={`brutal-card p-3 flex items-center gap-3 ${isMe ? 'border-accent bg-accent/5' : ''}`}>
                  <div className={`w-10 h-10 flex items-center justify-center shrink-0 border-[2px] border-border dark:border-[hsl(0,0%,25%)] font-black text-sm ${
                    rank === 1 ? 'bg-accent dark:bg-accent/20 text-accent-foreground dark:text-accent' : rank <= 3 ? 'bg-accent/50 dark:bg-accent/15 text-accent-foreground dark:text-accent' : 'bg-muted text-muted-foreground'
                  }`}>
                    {rank <= 3 ? (
                      rank === 1 ? <Trophy className="w-5 h-5" /> : rank === 2 ? <Medal className="w-5 h-5" /> : <Medal className="w-4 h-4" />
                    ) : rank}
                  </div>
                  <div className="w-9 h-9 bg-accent/20 dark:bg-accent/10 flex items-center justify-center shrink-0 border-[2px] border-border dark:border-[hsl(0,0%,25%)]">
                    <span className="text-xs font-black">
                      {(entry.username || '?')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm uppercase truncate">{entry.username || 'Jogador'}</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Nível {entry.level}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black">{entry.total_points.toLocaleString('pt-BR')}</p>
                    <p className="text-[9px] text-muted-foreground font-bold uppercase">pontos</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Leaderboard;
