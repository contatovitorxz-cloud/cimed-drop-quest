import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, MousePointerClick, ShoppingBag, Plus, QrCode, Megaphone, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import cimedSymbol from '@/assets/cimed-symbol.png';
import {
  mockInfluencerMetrics,
  mockInfluencerPerformance,
} from '@/data/mockData';

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState('7d');

  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'Creator';
  const initials = username.slice(0, 1).toUpperCase();

  const metrics = [
    { icon: Eye, label: 'Visualizações', value: mockInfluencerMetrics[0]?.value ?? 12500 },
    { icon: MousePointerClick, label: 'Cliques', value: mockInfluencerMetrics[1]?.value ?? 620 },
    { icon: ShoppingBag, label: 'Conversões', value: mockInfluencerMetrics[2]?.value ?? 218 },
  ];

  const periodLabel: Record<string, string> = {
    '7d': 'Últimos 7 dias',
    '30d': 'Últimos 30 dias',
    '90d': 'Últimos 90 dias',
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={cimedSymbol} alt="Cimed" className="w-7 h-7" />
              <span className="text-sm font-bold">Cimed GO</span>
            </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/influencer-profile')} className="w-9 h-9 rounded-full gradient-yellow flex items-center justify-center text-sm font-bold text-accent-foreground">
              {initials}
            </button>
            <button onClick={() => navigate('/home')} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-5 pt-4">
        {/* Welcome */}
        <div>
          <h2 className="text-xl font-bold">
            Bem-vindo, <span className="text-accent">{username}</span>!
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Crie drops e campanhas para a Cimed.</p>
        </div>

        {/* CTA */}
        <Button className="w-full h-14 text-base font-bold gradient-yellow text-accent-foreground rounded-xl glow-yellow hover:opacity-90 transition-opacity gap-2">
          <Plus className="w-5 h-5" />
          Criar Drop
        </Button>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <Card key={m.label} className="border-border bg-card">
              <CardContent className="p-4 text-center space-y-2">
                <m.icon className="w-7 h-7 mx-auto text-accent" />
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">{m.label}</p>
                <p className="text-xl font-extrabold">{m.value.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-border bg-card cursor-pointer hover:border-accent/50 transition-colors">
            <CardContent className="p-4 space-y-2">
              <Megaphone className="w-6 h-6 text-accent" />
              <h3 className="font-semibold text-sm">Campanhas</h3>
              <p className="text-xs text-muted-foreground">Gerencie suas campanhas.</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card cursor-pointer hover:border-accent/50 transition-colors">
            <CardContent className="p-4 space-y-2">
              <QrCode className="w-6 h-6 text-accent" />
              <h3 className="font-semibold text-sm">Meus QR Codes</h3>
              <p className="text-xs text-muted-foreground">Ver e gerenciar QR Codes ativos.</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">Análise de Desempenho</CardTitle>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[150px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {mockInfluencerPerformance.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-sm text-muted-foreground">
                Dados disponíveis após primeiras atividades
              </div>
            ) : (
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockInfluencerPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12, color: 'hsl(var(--foreground))' }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="cliques" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="conversoes" stroke="hsl(var(--foreground))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
