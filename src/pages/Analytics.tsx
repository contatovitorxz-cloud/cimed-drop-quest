import { ArrowLeft, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '@/components/ui/empty-state';

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="p-2 border-[2px] border-border bg-card shadow-[2px_2px_0_hsl(var(--border))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <BarChart3 className="w-6 h-6 text-accent" />
        <h1 className="font-anton text-2xl">DADOS DE CONSUMO</h1>
      </div>

      <div className="px-4">
        <EmptyState
          icon={BarChart3}
          title="Dados disponíveis em breve"
          description="Seus dados de consumo aparecerão aqui após suas primeiras atividades na plataforma."
        />
      </div>
    </div>
  );
};

export default Analytics;
