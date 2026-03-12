import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { useFollowCounts, useActivityFeed, useLeaderboard } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Gift, Trophy, Medal, TrendingUp } from 'lucide-react';
import EmptyState from '@/components/ui/empty-state';

const typeIcons: Record<string, typeof Gift> = {
  drop_claimed: Gift,
  mission_completed: Trophy,
  badge_earned: Medal,
  level_up: TrendingUp,
  scan: Gift,
};

const formatTime = (d: string) => {
  const diff = Date.now() - new Date(d).getTime();
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return `${Math.floor(diff / 86400000)}d`;
};

const Social = () => {
  const { following, followers } = useFollowCounts();
  const { activities, loading } = useActivityFeed();
  const { entries } = useLeaderboard();
  const { user } = useAuth();
  const myRank = user ? entries.findIndex(e => e.id === user.id) + 1 : 0;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-accent" />
          <h1 className="font-anton text-2xl">COMUNIDADE</h1>
        </div>

        {/* Stats bar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 brutal-card p-3 text-center">
            <p className="text-lg font-black">{following}</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">Seguindo</p>
          </div>
          <div className="flex-1 brutal-card p-3 text-center">
            <p className="text-lg font-black">{followers}</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">Seguidores</p>
          </div>
          <div className="flex-1 brutal-card p-3 text-center">
            <p className="text-lg font-black">{myRank > 0 ? `#${myRank}` : '—'}</p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase">Ranking</p>
          </div>
        </div>

        <h2 className="text-sm font-black mb-3 uppercase">Sua Atividade</h2>

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-muted animate-pulse border-[3px] border-border" />)}
          </div>
        ) : activities.length === 0 ? (
          <EmptyState
            icon={Users}
            title="Sem atividades recentes"
            description="Suas conquistas e atividades aparecerão aqui."
          />
        ) : (
          <div className="space-y-2">
            {activities.map(activity => {
              const Icon = typeIcons[activity.type] || Gift;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 brutal-card">
                  <div className="w-10 h-10 bg-accent dark:bg-accent/15 flex items-center justify-center shrink-0 border-[2px] border-border dark:border-border/50">
                    <Icon className="w-4 h-4 text-accent-foreground dark:text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black truncate uppercase">{activity.title}</p>
                      <span className="text-[10px] text-muted-foreground font-bold">{formatTime(activity.created_at)}</span>
                    </div>
                    {activity.description && <p className="text-xs text-muted-foreground">{activity.description}</p>}
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

export default Social;
