import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import XPBar from '@/components/game/XPBar';
import BadgeCard from '@/components/game/BadgeCard';
import { mockBadges } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Crown, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
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
          </div>
          <XPBar level={7} xp={680} maxXp={1000} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Pontos', value: '2.450', icon: '⭐' },
            { label: 'Ranking', value: '#142', icon: '🏆' },
            { label: 'Drops', value: '8', icon: '⚡' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card border border-border p-3 text-center">
              <span className="text-xl">{stat.icon}</span>
              <p className="text-lg font-black mt-1">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Leaderboard link */}
        <button
          onClick={() => navigate('/leaderboard')}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border mb-4 hover:border-primary/30 transition-all"
        >
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-accent" />
            <span className="font-bold text-sm">Leaderboard Nacional</span>
          </div>
          <TrendingUp className="w-5 h-5 text-muted-foreground" />
        </button>

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
