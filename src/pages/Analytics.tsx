import { ArrowLeft, BarChart3, TrendingUp, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { mockAnalyticsMetrics, mockScanTrend, mockTopProducts, mockPharmacyRanking } from '@/data/mockData';

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 p-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <BarChart3 className="w-6 h-6 text-accent" />
        <h1 className="text-xl font-black">Dados de Consumo</h1>
      </div>

      <div className="px-4 space-y-4">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-2">
          {mockAnalyticsMetrics.map(metric => (
            <div key={metric.label} className="rounded-2xl bg-card border border-border p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{metric.icon}</span>
                <span className="text-[10px] font-bold text-green-400 bg-green-500/20 px-1.5 py-0.5 rounded-full">
                  +{metric.change}%
                </span>
              </div>
              <p className="text-lg font-black">{metric.value.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Scan Trend Chart */}
        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-bold">Scans por Dia</h3>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockScanTrend}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(0, 0%, 60%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(0, 0%, 60%)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'hsl(0, 0%, 10%)', border: '1px solid hsl(0, 0%, 20%)', borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: 'white' }}
                />
                <Line type="monotone" dataKey="scans" stroke="hsl(48, 100%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(48, 100%, 50%)', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products Chart */}
        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-bold">Top Produtos</h3>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTopProducts} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(0, 0%, 60%)' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: 'hsl(0, 0%, 60%)' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip
                  contentStyle={{ background: 'hsl(0, 0%, 10%)', border: '1px solid hsl(0, 0%, 20%)', borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="scans" fill="hsl(25, 100%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pharmacy Ranking */}
        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-bold">Farmácias Mais Ativas</h3>
          </div>
          <div className="space-y-2">
            {mockPharmacyRanking.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 p-2 rounded-xl bg-secondary/50">
                <span className="text-sm font-black text-muted-foreground w-5 text-center">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.city}</p>
                </div>
                <span className="text-xs font-bold text-accent">{p.scans.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
