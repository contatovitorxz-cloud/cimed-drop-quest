import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { useMissions } from '@/hooks/useSupabaseData';
import { Target, Clock, ChevronDown, ChevronUp, Check, MapPin, Trophy, Map, Star, Smartphone, Gift, Footprints } from 'lucide-react';
import EmptyState from '@/components/ui/empty-state';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy, map: Map, star: Star, smartphone: Smartphone,
  gift: Gift, footprints: Footprints, target: Target, '🏆': Trophy, '⭐': Star, '🎯': Target,
};

const Missions = () => {
  const { missions, loading } = useMissions();
  const navigate = useNavigate();

  const weekly = missions.filter(m => m.mission_type === 'weekly');
  const daily = missions.filter(m => m.mission_type === 'daily');
  const special = missions.filter(m => m.mission_type === 'special');
  const hasMissions = missions.length > 0;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-black">Missões</h1>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse border-[3px] border-border" />)}
          </div>
        ) : !hasMissions ? (
          <EmptyState
            icon={Target}
            title="Nenhuma missão disponível"
            description="Novas missões serão publicadas em breve. Fique atento!"
          />
        ) : (
          <>
            {special.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-purple-400 mb-3">Missões Especiais</h2>
                <div className="space-y-3">
                  {special.map(m => <MissionCardDB key={m.id} mission={m} />)}
                </div>
              </div>
            )}
            {weekly.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold mb-3">Semanais</h2>
                <div className="space-y-3">
                  {weekly.map(m => <MissionCardDB key={m.id} mission={m} />)}
                </div>
              </div>
            )}
            {daily.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold text-green-400 mb-3">Diárias</h2>
                <div className="space-y-3">
                  {daily.map(m => <MissionCardDB key={m.id} mission={m} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

function MissionCardDB({ mission }: { mission: ReturnType<typeof useMissions>['missions'][0] }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const progress = mission.userProgress?.progress || {};
  const completedSteps = mission.steps.filter(s => (progress[s.id] || 0) >= s.target_count).length;
  const totalSteps = mission.steps.length || 1;
  const pct = (completedSteps / totalSteps) * 100;
  const isCompleted = completedSteps === totalSteps && totalSteps > 0;

  const timeLeft = new Date(mission.ends_at).getTime() - Date.now();
  const hoursLeft = Math.max(0, Math.floor(timeLeft / 3600000));
  const daysLeft = Math.floor(hoursLeft / 24);

  const typeColors: Record<string, string> = { weekly: 'bg-blue-500/20 text-blue-400', daily: 'bg-green-500/20 text-green-400', special: 'bg-purple-500/20 text-purple-400' };
  const typeLabels: Record<string, string> = { weekly: 'Semanal', daily: 'Diária', special: 'Especial' };

  const Icon = iconMap[mission.icon] || Target;

  return (
    <div className={`brutal-card overflow-hidden transition-all ${isCompleted ? 'border-green-500 bg-green-500/5' : ''}`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-accent dark:bg-accent/15 flex items-center justify-center shrink-0 border-[2px] border-border dark:border-border/50">
            <Icon className="w-6 h-6 text-accent-foreground dark:text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-2 py-0.5 border-[2px] border-border ${typeColors[mission.mission_type] || ''}`}>
                {typeLabels[mission.mission_type] || mission.mission_type}
              </span>
              {isCompleted && <span className="text-[10px] font-black px-2 py-0.5 border-[2px] border-green-500 bg-green-500/20 text-green-400">Completa</span>}
            </div>
            <h3 className="font-black text-sm uppercase truncate">{mission.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{mission.description}</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground font-bold">{completedSteps}/{totalSteps} etapas</span>
                <span className="text-accent font-black">+{mission.reward_value} {mission.reward_type === 'points' ? 'pts' : 'prêmio'}</span>
              </div>
              <Progress value={pct} className="h-2 bg-muted border-[2px] border-border dark:border-[hsl(0,0%,25%)] [&>div]:bg-accent" />
            </div>
          </div>
          <div className="shrink-0 mt-1">
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t-[2px] border-border dark:border-[hsl(0,0%,25%)] pt-3 space-y-2">
          {mission.steps.map((step, i) => {
            const done = (progress[step.id] || 0) >= step.target_count;
            return (
              <div key={step.id} className={`flex items-center gap-3 p-2.5 border-[2px] border-border dark:border-[hsl(0,0%,25%)] ${done ? 'bg-green-500/10' : 'bg-muted/50'}`}>
                <div className={`w-6 h-6 flex items-center justify-center shrink-0 border-[2px] border-border ${done ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                  {done ? <Check className="w-3.5 h-3.5" /> : <span className="text-xs font-black">{i + 1}</span>}
                </div>
                <span className={`text-xs flex-1 font-bold ${done ? 'text-green-400 line-through' : 'text-foreground'}`}>
                  {step.description}
                </span>
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="font-bold">{daysLeft > 0 ? `${daysLeft}d ${hoursLeft % 24}h` : `${hoursLeft}h`} restantes</span>
            </div>
            <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate('/home'); }} className="text-xs font-black h-8">
              <MapPin className="w-3 h-3 mr-1" /> Ver no Mapa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Missions;
