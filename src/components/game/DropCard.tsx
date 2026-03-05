import { useEffect, useState } from 'react';
import type { Drop } from '@/data/mockData';
import { dropTypeColors } from '@/data/mockData';
import { Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DropCard = ({ drop }: { drop: Drop }) => {
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

  const gradientClass = dropTypeColors[drop.type] || 'from-primary to-accent';

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <div className={`bg-gradient-to-r ${gradientClass} p-4`}>
        <div className="flex items-center justify-between">
          <span className="text-2xl">{drop.product.image_url}</span>
          <div className="flex items-center gap-1 bg-background/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-bold">{timeLeft}</span>
          </div>
        </div>
        <h3 className="font-black text-sm mt-2">{drop.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground">{drop.description}</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{drop.pharmacy.name} • {drop.pharmacy.distance}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground">{drop.quantity} restantes</span>
          <Button size="sm" className="gradient-orange border-0 rounded-xl text-xs font-bold h-8">
            Resgatar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DropCard;
