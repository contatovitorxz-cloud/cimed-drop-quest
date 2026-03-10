import { useEffect, useState } from 'react';
import type { Drop } from '@/data/mockData';
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

  return (
    <div className="brutal-card brutal-card-hover overflow-hidden">
      <div className="bg-accent p-4 border-b-[3px] border-border">
        <div className="flex items-center justify-between">
          <img src={drop.product.image_url} alt={drop.product.name} className="w-8 h-8 object-contain" />
          <div className="flex items-center gap-1 bg-background px-2 py-1 border-[2px] border-border">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-black">{timeLeft}</span>
          </div>
        </div>
        <h3 className="font-black text-sm mt-2 text-accent-foreground uppercase">{drop.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground">{drop.description}</p>
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="font-bold">{drop.pharmacy.name}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground font-bold">{drop.quantity} restantes</span>
          <Button size="sm" className="text-xs font-black h-8">
            RESGATAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DropCard;
