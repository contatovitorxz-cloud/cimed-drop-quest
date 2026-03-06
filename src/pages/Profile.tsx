import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import XPBar from '@/components/game/XPBar';
import BadgeCard from '@/components/game/BadgeCard';
import { mockBadges } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Crown, TrendingUp, Users, Share2, BarChart3, History } from 'lucide-react';
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
        text: 'Confira meu perfil no Cimed GO! 🏆',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        {/* Profile card */}
        <div className="rounded-2xl bg-card border border-border p-4 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center text-3xl font-black text-primary-foreground">
              {user?.email?.[0]?.toUpperCase() || 'C'}
            </div>
            <div className="flex-1">
              <h2 className="font-black text-lg">{user?.user_metadata?.username || user?.email?.split('@')[0] || 'Jogador'}</h2>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button onClick={handleShare} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <XPBar level={7} xp={680} maxXp={1000} />
        </div>

        {/* Social stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Pontos', value: '2.450', icon: '⭐' },
            { label: 'Ranking', value: '#142', icon: '🏆' },
            { label: 'Seguidores', value: '89', icon: '👥' },
            { label: 'Drops', value: '8', icon: '⚡' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card border border-border p-2.5 text-center">
              <span className="text-lg">{stat.icon}</span>
              <p className="text-sm font-black mt-0.5">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="space-y-2 mb-4">
          {[
            { icon: Crown, label: 'Leaderboard Nacional', color: 'text-accent', path: '/leaderboard' },
            { icon: Users, label: 'Comunidade', color: 'text-blue-400', path: '/social' },
            { icon: History, label: 'Histórico de Scans', color: 'text-green-400', path: '/scan-history' },
            { icon: BarChart3, label: 'Dados de Consumo', color: 'text-purple-400', path: '/analytics' },
          ].map(({ icon: Icon, label, color, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="font-bold text-sm">{label}</span>
              </div>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Badges */}
        <h3 className="font-bold text-sm mb-3">🏅 Badges</h3>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {mockBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>

        <Button onClick={handleSignOut} variant="outline" className="w-full rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10">
          <LogOut className="w-4 h-4 mr-2" />
          Sair da conta
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
