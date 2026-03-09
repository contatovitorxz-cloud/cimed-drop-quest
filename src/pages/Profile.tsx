import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import XPBar from '@/components/game/XPBar';
import BadgeCard from '@/components/game/BadgeCard';
import { mockBadges } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Crown, TrendingUp, Users, Share2, BarChart3, History, Star, Trophy, UserCheck, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Cimed GO - Meu Perfil',
        text: 'Confira meu perfil no Cimed GO!',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4 stagger-children">
        {/* Profile card */}
        <div className="rounded-2xl glass-card glow-border p-4 mb-4 shadow-depth">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar-ring-square w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center text-3xl font-black text-primary-foreground">
              {user?.email?.[0]?.toUpperCase() || 'C'}
            </div>
            <div className="flex-1">
              <h2 className="font-black text-lg">{user?.user_metadata?.username || user?.email?.split('@')[0] || 'Jogador'}</h2>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button onClick={handleShare} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <XPBar level={1} xp={0} maxXp={1000} />
        </div>

        {/* Social stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Pontos', value: '0', icon: Star },
            { label: 'Ranking', value: '—', icon: Trophy },
            { label: 'Seguidores', value: '0', icon: UserCheck },
            { label: 'Drops', value: '0', icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl glass-card glow-border-hover p-2.5 text-center shadow-depth">
              <div className="w-8 h-8 rounded-full gradient-yellow mx-auto mb-1.5 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-accent-foreground" />
              </div>
              <p className="text-sm font-black mt-0.5">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="space-y-2 mb-4">
          {[
            { icon: Crown, label: 'Leaderboard Nacional', gradient: 'from-accent/15 to-accent/5', path: '/leaderboard' },
            { icon: Users, label: 'Comunidade', gradient: 'from-accent/10 to-accent/5', path: '/social' },
            { icon: History, label: 'Histórico de Scans', gradient: 'from-accent/10 to-accent/5', path: '/scan-history' },
            { icon: BarChart3, label: 'Dados de Consumo', gradient: 'from-accent/10 to-accent/5', path: '/analytics' },
          ].map(({ icon: Icon, label, gradient, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl glass-card glow-border-hover transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <span className="font-bold text-sm">{label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Badges */}
        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-accent" />
          Badges
        </h3>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {mockBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        <Button onClick={handleSignOut} variant="outline" className="w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 transition-all duration-300">
          <LogOut className="w-4 h-4 mr-2" />
          Sair da conta
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
