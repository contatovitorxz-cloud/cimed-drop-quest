import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, MousePointerClick, ShoppingBag, Plus, QrCode, Megaphone, X, TrendingUp, TrendingDown } from 'lucide-react';
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
    { icon: Eye, label: 'Visualizações', value: mockInfluencerMetrics[0]?.value ?? 12500, change: mockInfluencerMetrics[0]?.change ?? 8.2 },
    { icon: MousePointerClick, label: 'Cliques', value: mockInfluencerMetrics[1]?.value ?? 620, change: mockInfluencerMetrics[1]?.change ?? 5.1 },
    { icon: ShoppingBag, label: 'Conversões', value: mockInfluencerMetrics[2]?.value ?? 218, change: mockInfluencerMetrics[2]?.change ?? 12.3 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 brutal-header px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={cimedSymbol} alt="Cimed" className="w-7 h-7" />
            <span className="font-anton text-sm">CIMED GO</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/influencer-profile')} className="w-9 h-9 bg-accent flex items-center justify-center text-sm font-black text-accent-foreground border-[2px] border-border">
              {initials}
            </button>
            <button onClick={() => navigate('/home')} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-5 pt-4 stagger-children">
        {/* Welcome */}
        <div>
          <h2 className="font-anton text-2xl">
            BEM-VINDO, <span className="text-accent">{username.toUpperCase()}</span>!
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5 font-bold">Crie drops e campanhas para a Cimed.</p>
        </div>

        {/* CTA */}
        <Button className="w-full h-14 text-base gap-2">
          <Plus className="w-5 h-5" />
          CRIAR DROP
        </Button>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <Card key={m.label} className="brutal-card-hover">
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-10 h-10 bg-accent mx-auto flex items-center justify-center border-[2px] border-border">
                  <m.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">{m.label}</p>
                <p className="text-xl font-black">{m.value.toLocaleString('pt-BR')}</p>
                {m.change !== 0 && (
                  <div className={`inline-flex items-center gap-0.5 ${m.change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {m.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-[10px] font-black">{m.change > 0 ? '+' : ''}{m.change}%</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="brutal-card-hover cursor-pointer">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 bg-accent flex items-center justify-center border-[2px] border-border">
                <Megaphone className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-black text-sm uppercase">Campanhas</h3>
              <p className="text-xs text-muted-foreground">Gerencie suas campanhas.</p>
            </CardContent>
          </Card>
          <Card className="brutal-card-hover cursor-pointer">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 bg-accent flex items-center justify-center border-[2px] border-border">
                <QrCode className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-black text-sm uppercase">Meus QR Codes</h3>
              <p className="text-xs text-muted-foreground">Ver e gerenciar QR Codes ativos.</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-black uppercase">Análise de Desempenho</CardTitle>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[150px] h-8 text-xs border-[2px] border-border bg-background">
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
              <div className="flex items-center justify-center h-40 text-sm text-muted-foreground font-bold">
                Dados disponíveis após primeiras atividades
              </div>
            ) : (
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockInfluencerPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '3px solid hsl(var(--border))', borderRadius: 0, fontSize: 12, color: 'hsl(var(--foreground))', boxShadow: '4px 4px 0 hsl(var(--border))' }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="cliques" stroke="hsl(50,100%,50%)" strokeWidth={2.5} dot={false} name="Cliques" />
                    <Line type="monotone" dataKey="conversoes" stroke="hsl(25,100%,50%)" strokeWidth={2} dot={false} name="Conversões" />
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
