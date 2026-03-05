import { ArrowLeft, Crown, Medal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const leaders = [
  { rank: 1, name: 'MariaCarmed', points: 12450, level: 24, avatar: '👸' },
  { rank: 2, name: 'LucasExplorer', points: 11200, level: 22, avatar: '🧑‍🚀' },
  { rank: 3, name: 'AnaFini', points: 9800, level: 20, avatar: '💃' },
  { rank: 4, name: 'PedroGO', points: 8500, level: 18, avatar: '🏄' },
  { rank: 5, name: 'JuliaTop', points: 7200, level: 16, avatar: '🎯' },
  { rank: 6, name: 'GabeHunter', points: 6800, level: 15, avatar: '🎮' },
  { rank: 7, name: 'SofiaRun', points: 5500, level: 13, avatar: '🏃‍♀️' },
  { rank: 8, name: 'ThiagoFarma', points: 4200, level: 11, avatar: '💊' },
  { rank: 9, name: 'LaraQuest', points: 3100, level: 9, avatar: '🗺️' },
  { rank: 10, name: 'DiegoDrop', points: 2800, level: 8, avatar: '⚡' },
];

const rankColors = ['', 'text-accent', 'text-gray-300', 'text-amber-700'];

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

      {/* Top 3 podium */}
      <div className="flex items-end justify-center gap-3 px-4 mb-6">
        {[leaders[1], leaders[0], leaders[2]].map((l, i) => {
          const heights = ['h-24', 'h-32', 'h-20'];
          const sizes = ['w-14 h-14', 'w-18 h-18', 'w-12 h-12'];
          return (
            <div key={l.rank} className="flex flex-col items-center">
              <span className="text-3xl mb-1">{l.avatar}</span>
              <p className="text-xs font-bold truncate max-w-[80px]">{l.name}</p>
              <p className="text-[10px] text-muted-foreground mb-2">{l.points.toLocaleString()} pts</p>
              <div className={`${heights[i]} w-20 rounded-t-xl ${i === 1 ? 'gradient-orange' : 'bg-secondary'} flex items-center justify-center`}>
                <span className={`text-2xl font-black ${rankColors[l.rank]}`}>#{l.rank}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rest */}
      <div className="px-4 space-y-2">
        {leaders.slice(3).map((l) => (
          <div key={l.rank} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
            <span className="text-sm font-black text-muted-foreground w-6 text-center">#{l.rank}</span>
            <span className="text-xl">{l.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{l.name}</p>
              <p className="text-xs text-muted-foreground">Nível {l.level}</p>
            </div>
            <span className="text-sm font-bold text-primary">{l.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
