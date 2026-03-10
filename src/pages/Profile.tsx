import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import XPBar from '@/components/game/XPBar';
import { useProfile } from '@/hooks/useProfile';
import { useUserBadges, useFollowCounts, useLeaderboard } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Crown, Users, Share2, BarChart3, History, Star, Trophy, UserCheck, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const badgeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy, '🏆': Trophy, star: Star, '⭐': Star, map: Crown,
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { badges } = useUserBadges();
  const { following, followers } = useFollowCounts();
  const { entries } = useLeaderboard();
  const navigate = useNavigate();

  const level = profile?.level || 1;
  const xp = profile?.xp || 0;
  const totalPoints = profile?.total_points || 0;
  const username = profile?.username || user?.user_metadata?.username || user?.email?.split('@')[0] || 'Jogador';

  const myRank = user ? entries.findIndex(e => e.id === user.id) + 1 : 0;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Cimed GO - Meu Perfil',
        text: `Estou no nível ${level} com ${totalPoints} pontos no Cimed GO!`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4 stagger-children">
        {/* Profile card */}
        <div className="brutal-card p-4 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-accent flex items-center justify-center text-3xl font-black text-accent-foreground border-[3px] border-border">
              {username[0]?.toUpperCase() || 'C'}
            </div>
            <div className="flex-1">
              <h2 className="font-black text-lg uppercase">{username}</h2>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button onClick={handleShare} className="p-2 border-[2px] border-border hover:bg-accent hover:text-accent-foreground transition-all">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          <XPBar level={level} xp={xp} maxXp={level * 1000} />
        </div>

        {/* Social stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Pontos', value: totalPoints.toLocaleString('pt-BR'), icon: Star },
            { label: 'Ranking', value: myRank > 0 ? `#${myRank}` : '—', icon: Trophy },
            { label: 'Seguidores', value: String(followers), icon: UserCheck },
            { label: 'Seguindo', value: String(following), icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className="brutal-card brutal-card-hover p-2.5 text-center">
              <div className="w-8 h-8 bg-accent mx-auto mb-1.5 flex items-center justify-center border-[2px] border-border">
                <stat.icon className="w-4 h-4 text-accent-foreground" />
              </div>
              <p className="text-sm font-black mt-0.5">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground uppercase font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="space-y-2 mb-4">
          {[
            { icon: Crown, label: 'LEADERBOARD NACIONAL', path: '/leaderboard' },
            { icon: Users, label: 'COMUNIDADE', path: '/social' },
            { icon: History, label: 'HISTÓRICO DE SCANS', path: '/scan-history' },
            { icon: BarChart3, label: 'DADOS DE CONSUMO', path: '/analytics' },
          ].map(({ icon: Icon, label, path }) => (
            <button key={path} onClick={() => navigate(path)} className="w-full flex items-center justify-between p-3.5 brutal-card brutal-card-hover text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent flex items-center justify-center border-[2px] border-border">
                  <Icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="font-black text-sm">{label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Badges */}
        <h3 className="font-anton text-lg mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          BADGES
        </h3>
        {badges.length === 0 ? (
          <div className="brutal-card p-6 text-center mb-6">
            <Trophy className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-black text-muted-foreground">Nenhuma badge conquistada</p>
            <p className="text-xs text-muted-foreground mt-1">Complete missões e desafios para ganhar badges!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mb-6">
            {badges.map((badge) => {
              const Icon = badgeIconMap[badge.badge_icon] || Trophy;
              return (
                <div key={badge.id} className="flex flex-col items-center gap-2 p-4 border-[3px] border-border bg-accent text-accent-foreground shadow-[3px_3px_0_hsl(var(--border))]">
                  <div className="w-10 h-10 flex items-center justify-center border-[2px] border-border bg-background">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <span className="text-xs font-black text-center leading-tight uppercase">{badge.badge_name}</span>
                  <span className="text-[10px] font-bold">Conquistada</span>
                </div>
              );
            })}
          </div>
        )}

        <Button onClick={handleSignOut} variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
          <LogOut className="w-4 h-4 mr-2" />
          Sair da conta
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
