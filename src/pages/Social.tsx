import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { mockSocialFeed } from '@/data/mockData';
import { Users, Gift, Trophy, Medal, TrendingUp } from 'lucide-react';

const typeIcons: Record<string, typeof Gift> = {
  drop_claimed: Gift,
  mission_completed: Trophy,
  badge_earned: Medal,
  level_up: TrendingUp,
};

const typeColors: Record<string, string> = {
  drop_claimed: 'bg-accent/20 text-accent',
  mission_completed: 'bg-green-500/20 text-green-400',
  badge_earned: 'bg-purple-500/20 text-purple-400',
  level_up: 'bg-blue-500/20 text-blue-400',
};

const formatTime = (d: Date) => {
  const diff = Date.now() - d.getTime();
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return `${Math.floor(diff / 86400000)}d`;
};

const Social = () => {
  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-black">Comunidade</h1>
        </div>

        {/* Stats bar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 rounded-xl bg-card border border-border p-3 text-center">
            <p className="text-lg font-black">142</p>
            <p className="text-[10px] text-muted-foreground">Seguindo</p>
          </div>
          <div className="flex-1 rounded-xl bg-card border border-border p-3 text-center">
            <p className="text-lg font-black">89</p>
            <p className="text-[10px] text-muted-foreground">Seguidores</p>
          </div>
          <div className="flex-1 rounded-xl bg-card border border-border p-3 text-center">
            <p className="text-lg font-black">#142</p>
            <p className="text-[10px] text-muted-foreground">Ranking</p>
          </div>
        </div>

        <h2 className="text-sm font-bold mb-3">Atividade dos Amigos</h2>

        <div className="space-y-2">
          {mockSocialFeed.map(activity => {
            const Icon = typeIcons[activity.type] || Gift;
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl shrink-0">
                  {activity.userAvatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold truncate">{activity.userName}</p>
                    <span className="text-[10px] text-muted-foreground">{formatTime(activity.createdAt)}</span>
                  </div>
                  <p className="text-xs text-foreground mt-0.5">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeColors[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Social;
