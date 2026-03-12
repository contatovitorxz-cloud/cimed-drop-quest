import { ArrowLeft, QrCode, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScanHistory } from '@/hooks/useSupabaseData';
import EmptyState from '@/components/ui/empty-state';

const formatDate = (d: string) => {
  const now = Date.now();
  const diff = now - new Date(d).getTime();
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min atrás`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
  return `${Math.floor(diff / 86400000)}d atrás`;
};

const ScanHistory = () => {
  const navigate = useNavigate();
  const { scans, loading } = useScanHistory();
  const totalPoints = scans.reduce((acc, s) => acc + s.points_earned, 0);

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="p-2 border-[2px] border-border bg-card shadow-[2px_2px_0_hsl(var(--border))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <QrCode className="w-6 h-6 text-accent" />
        <h1 className="font-anton text-2xl">HISTÓRICO DE SCANS</h1>
      </div>

      <div className="px-4">
        <div className="brutal-card-dark p-4 mb-6">
          <p className="text-xs text-muted-foreground font-black uppercase">Total de pontos por scans</p>
          <p className="text-3xl font-black">{totalPoints.toLocaleString('pt-BR')}</p>
          <p className="text-xs text-muted-foreground mt-1 font-bold">{scans.length} scans realizados</p>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-muted animate-pulse border-[3px] border-border" />)}
          </div>
        ) : scans.length === 0 ? (
          <EmptyState
            icon={QrCode}
            title="Nenhum scan realizado"
            description="Escaneie QR Codes em farmácias para ganhar pontos!"
          />
        ) : (
          <div className="space-y-2">
            {scans.map(scan => (
              <div key={scan.id} className="flex items-center gap-3 p-3 brutal-card">
                <div className="w-10 h-10 bg-accent dark:bg-accent/15 flex items-center justify-center shrink-0 border-[2px] border-border dark:border-border/50">
                  <QrCode className="w-5 h-5 text-accent-foreground dark:text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate uppercase">{scan.product?.name || 'Check-in'}</p>
                  {scan.pharmacy && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate font-bold">{scan.pharmacy.name}</span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black text-accent">+{scan.points_earned}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="w-2.5 h-2.5" />
                    <span className="font-bold">{formatDate(scan.scanned_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;
