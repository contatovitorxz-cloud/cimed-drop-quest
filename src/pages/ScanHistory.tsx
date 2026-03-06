import { ArrowLeft, QrCode, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockScans = [
  { id: '1', pharmacy: 'Drogasil Paulista', product: 'Carmed Fini', points: 50, date: new Date(Date.now() - 1 * 60 * 60 * 1000), emoji: '🍬' },
  { id: '2', pharmacy: 'Droga Raia Consolação', product: 'Check-in', points: 30, date: new Date(Date.now() - 5 * 60 * 60 * 1000), emoji: '📍' },
  { id: '3', pharmacy: 'Pague Menos Liberdade', product: 'Carmed BT21', points: 75, date: new Date(Date.now() - 24 * 60 * 60 * 1000), emoji: '🎵' },
  { id: '4', pharmacy: 'Drogaria São Paulo', product: 'Lavitan Energia', points: 40, date: new Date(Date.now() - 48 * 60 * 60 * 1000), emoji: '⚡' },
  { id: '5', pharmacy: 'Farmácia Venâncio', product: 'Carmed Barbie', points: 60, date: new Date(Date.now() - 72 * 60 * 60 * 1000), emoji: '💄' },
];

const formatDate = (d: Date) => {
  const now = Date.now();
  const diff = now - d.getTime();
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min atrás`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
  return `${Math.floor(diff / 86400000)}d atrás`;
};

const ScanHistory = () => {
  const navigate = useNavigate();
  const totalPoints = mockScans.reduce((acc, s) => acc + s.points, 0);

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <QrCode className="w-6 h-6 text-accent" />
        <h1 className="text-xl font-black">Histórico de Scans</h1>
      </div>

      <div className="px-4">
        <div className="gradient-orange rounded-2xl p-4 mb-6">
          <p className="text-xs text-primary-foreground/70">Total de pontos por scans</p>
          <p className="text-3xl font-black text-primary-foreground">{totalPoints.toLocaleString()}</p>
          <p className="text-xs text-primary-foreground/70 mt-1">{mockScans.length} scans realizados</p>
        </div>

        <div className="space-y-2">
          {mockScans.map(scan => (
            <div key={scan.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl shrink-0">
                {scan.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{scan.product}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{scan.pharmacy}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-accent">+{scan.points}</p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="w-2.5 h-2.5" />
                  <span>{formatDate(scan.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;
