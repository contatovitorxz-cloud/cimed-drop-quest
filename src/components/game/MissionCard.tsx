import { useState } from 'react';
import type { MissionMock } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, MapPin, Check, Clock, Trophy, Map, Star, Smartphone, Gift, Footprints, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy, map: Map, star: Star, smartphone: Smartphone,
  gift: Gift, footprints: Footprints, target: Target,
};

const MissionCard = ({ mission }: { mission: MissionMock }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const completedSteps = mission.steps.filter(s => s.completed >= s.targetCount).length;
  const totalSteps = mission.steps.length;
  const pct = (completedSteps / totalSteps) * 100;
  const isCompleted = completedSteps === totalSteps;

  const timeLeft = mission.endsAt.getTime() - Date.now();
  const hoursLeft = Math.max(0, Math.floor(timeLeft / 3600000));
  const daysLeft = Math.floor(hoursLeft / 24);

  const typeColors: Record<string, string> = {
    weekly: 'bg-blue-500/20 text-blue-400',
    daily: 'bg-green-500/20 text-green-400',
    special: 'bg-purple-500/20 text-purple-400',
  };

  const typeLabels: Record<string, string> = {
    weekly: 'Semanal',
    daily: 'Diária',
    special: 'Especial',
  };

  const Icon = iconMap[mission.icon] || Target;

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${isCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-border bg-card'}`}>
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[mission.missionType]}`}>
                {typeLabels[mission.missionType]}
              </span>
              {isCompleted && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                  Completa
                </span>
              )}
            </div>
            <h3 className="font-bold text-sm truncate">{mission.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{mission.description}</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{completedSteps}/{totalSteps} etapas</span>
                <span className="text-primary font-semibold">
                  +{mission.rewardValue} {mission.rewardType === 'points' ? 'pts' : mission.rewardType === 'badge' ? 'badge' : 'prêmio'}
                </span>
              </div>
              <Progress value={pct} className="h-2 bg-secondary [&>div]:gradient-orange" />
            </div>
          </div>
          <div className="shrink-0 mt-1">
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-2">
          {mission.steps.map((step, i) => {
            const done = step.completed >= step.targetCount;
            return (
              <div key={step.id} className={`flex items-center gap-3 p-2.5 rounded-xl ${done ? 'bg-green-500/10' : 'bg-secondary/50'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground'}`}>
                  {done ? <Check className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <span className={`text-xs flex-1 ${done ? 'text-green-400 line-through' : 'text-foreground'}`}>
                  {step.description}
                </span>
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{daysLeft > 0 ? `${daysLeft}d ${hoursLeft % 24}h` : `${hoursLeft}h`} restantes</span>
            </div>
            <Button
              size="sm"
              onClick={(e) => { e.stopPropagation(); navigate('/home'); }}
              className="gradient-orange border-0 rounded-xl text-xs font-bold h-8"
            >
              <MapPin className="w-3 h-3 mr-1" />
              Ver no Mapa
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionCard;
