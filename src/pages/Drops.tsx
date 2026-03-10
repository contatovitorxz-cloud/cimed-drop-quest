import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { useDrops } from '@/hooks/useSupabaseData';
import { Zap, Sparkles, Clock, MapPin, ScanLine } from 'lucide-react';
import EmptyState from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import QRScanner from '@/components/qr/QRScanner';

const Drops = () => {
  const { drops, influencerDrops, loading } = useDrops();
  const [showScanner, setShowScanner] = useState(false);
  const hasDrops = drops.length > 0 || influencerDrops.length > 0;

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            <h2 className="text-xl font-black">Drops</h2>
          </div>
          <Button
            size="sm"
            onClick={() => setShowScanner(true)}
            className="flex items-center gap-2 text-xs font-black h-9"
          >
            <ScanLine className="w-4 h-4" />
            SCAN QR
          </Button>
            SCAN QR
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map(i => <div key={i} className="h-32 bg-muted animate-pulse border-[3px] border-border" />)}
          </div>
        ) : !hasDrops ? (
          <EmptyState
            icon={Zap}
            title="Nenhum drop disponível"
            description="Novos drops aparecerão aqui quando estiverem disponíveis na sua região."
          />
        ) : (
          <>
            {influencerDrops.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-black text-accent uppercase">Drops de Influenciadores</h3>
                </div>
                <div className="space-y-3">
                  {influencerDrops.map((drop) => (
                    <InfluencerDropCardDB key={drop.id} drop={drop} />
                  ))}
                </div>
              </div>
            )}

            {drops.length > 0 && (
              <div>
                <h3 className="text-sm font-black mb-3 uppercase">Drops de Farmácias</h3>
                <div className="space-y-3">
                  {drops.map((drop) => (
                    <DropCardDB key={drop.id} drop={drop} />
                  ))}
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

function DropCardDB({ drop }: { drop: ReturnType<typeof useDrops>['drops'][0] }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!drop.expires_at) return;
    const update = () => {
      const diff = new Date(drop.expires_at!).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Expirado'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [drop.expires_at]);

  return (
    <div className="brutal-card brutal-card-hover overflow-hidden">
      <div className="bg-accent p-4 border-b-[3px] border-border">
        <div className="flex items-center justify-between">
          {drop.product?.image_url && (
            <img src={drop.product.image_url} alt={drop.product.name} className="w-8 h-8 object-contain" />
          )}
          {drop.expires_at && (
            <div className="flex items-center gap-1 bg-background px-2 py-1 border-[2px] border-border">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-black">{timeLeft}</span>
            </div>
          )}
        </div>
        <h3 className="font-black text-sm mt-2 text-accent-foreground uppercase">{drop.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground">{drop.description}</p>
        {drop.pharmacy && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="font-bold">{drop.pharmacy.name}</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-muted-foreground font-bold">{drop.quantity} restantes</span>
          <Button size="sm" className="text-xs font-black h-8">RESGATAR</Button>
        </div>
      </div>
    </div>
  );
}

function InfluencerDropCardDB({ drop }: { drop: ReturnType<typeof useDrops>['influencerDrops'][0] }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = new Date(drop.expires_at).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Expirado'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, [drop.expires_at]);

  const urgency = drop.remaining_quantity / drop.total_quantity;
  const initials = drop.influencer_name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="brutal-card overflow-hidden">
      <div className="bg-accent/20 p-4 border-b-[3px] border-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent flex items-center justify-center text-sm font-black text-accent-foreground shrink-0 border-[2px] border-border">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-accent" />
              <span className="text-[10px] font-black text-accent uppercase">INFLUENCIADOR</span>
            </div>
            <p className="text-sm font-black truncate uppercase">{drop.influencer_name}</p>
          </div>
          <div className="flex items-center gap-1 bg-background px-2 py-1 border-[2px] border-border">
            <Clock className="w-3 h-3 text-accent" />
            <span className="text-xs font-black text-accent">{timeLeft}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-black text-sm mb-1 uppercase">{drop.title}</h3>
        {drop.teaser_message && <p className="text-xs text-muted-foreground italic">"{drop.teaser_message}"</p>}

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
              <span className="font-bold">Próximo a você</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 bg-muted border-[2px] border-border overflow-hidden">
                <div className="h-full transition-all" style={{
                  width: `${(1 - urgency) * 100}%`,
                  background: urgency < 0.3 ? 'hsl(0, 84%, 60%)' : 'hsl(var(--accent))',
                }} />
              </div>
              <span className={`text-[10px] font-black ${urgency < 0.3 ? 'text-destructive' : 'text-accent'}`}>
                {drop.remaining_quantity}/{drop.total_quantity}
              </span>
            </div>
          </div>
          <Button size="sm" className="text-xs font-black h-8">Resgatar</Button>
        </div>

        {drop.type === 'discount' && drop.discount_percent && (
          <div className="mt-2 inline-block px-2 py-0.5 border-[2px] border-green-500 bg-green-500/20 text-green-400 text-[10px] font-black">
            {drop.discount_percent}% OFF
          </div>
        )}
      </div>
    </div>
  );
}

export default Drops;
