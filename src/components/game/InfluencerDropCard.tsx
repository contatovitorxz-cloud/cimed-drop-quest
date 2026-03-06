import { useEffect, useState } from 'react';
import type { InfluencerDropMock } from '@/data/mockData';
import { Clock, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InfluencerDropCard = ({ drop }: { drop: InfluencerDropMock }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = drop.expiresAt.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Expirado'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [drop.expiresAt]);

  const urgency = drop.remainingQuantity / drop.totalQuantity;

  return (
    <div className="rounded-2xl border border-accent/30 overflow-hidden bg-card relative">
      <div className="bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 p-4 relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center text-accent text-sm font-bold shrink-0">
            {drop.influencerInitials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-bold text-accent">INFLUENCIADOR</span>
            </div>
            <p className="text-sm font-black truncate">{drop.influencerName}</p>
          </div>
          <div className="flex items-center gap-1 bg-background/30 backdrop-blur-sm px-2 py-1 rounded-full">
            <Clock className="w-3 h-3 text-accent" />
            <span className="text-xs font-bold text-accent">{timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-black text-sm mb-1">{drop.title}</h3>
        <p className="text-xs text-muted-foreground italic">"{drop.teaserMessage}"</p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
              <span>Próximo a você</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{
                  width: `${(1 - urgency) * 100}%`,
                  background: urgency < 0.3 ? 'hsl(0, 84%, 60%)' : 'hsl(var(--accent))',
                }} />
              </div>
              <span className={`text-[10px] font-bold ${urgency < 0.3 ? 'text-destructive' : 'text-accent'}`}>
                {drop.remainingQuantity}/{drop.totalQuantity}
              </span>
            </div>
          </div>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 border-0 rounded-xl text-xs font-bold h-8">
            Resgatar
          </Button>
        </div>

        {drop.type === 'discount' && (
          <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold">
            {drop.discountPercent}% OFF
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerDropCard;
