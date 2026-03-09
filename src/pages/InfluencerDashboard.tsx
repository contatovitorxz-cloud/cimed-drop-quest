import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, MousePointerClick, ShoppingBag, Plus, QrCode, Megaphone, X, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import cimedSymbol from '@/assets/cimed-symbol.png';
import { Badge } from '@/components/ui/badge';
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
    { icon: Eye, label: 'Visualizações', value: mockInfluencerMetrics[0]?.value ?? 12500, change: mockInfluencerMetrics[0]?.change ?? 8.2, gradient: 'from-yellow-500/20 to-orange-500/20' },
    { icon: MousePointerClick, label: 'Cliques', value: mockInfluencerMetrics[1]?.value ?? 620, change: mockInfluencerMetrics[1]?.change ?? 5.1, gradient: 'from-blue-500/20 to-cyan-500/20' },
    { icon: ShoppingBag, label: 'Conversões', value: mockInfluencerMetrics[2]?.value ?? 218, change: mockInfluencerMetrics[2]?.change ?? 12.3, gradient: 'from-green-500/20 to-emerald-500/20' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-header px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md" />
              <img src={cimedSymbol} alt="Cimed" className="relative w-7 h-7" />
            </div>
            <span className="text-sm font-bold">Cimed GO</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/influencer-profile')} className="avatar-ring w-9 h-9 rounded-full gradient-yellow flex items-center justify-center text-sm font-bold text-accent-foreground">
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
          <h2 className="text-xl font-bold">
            Bem-vindo, <span className="text-gradient-orange">{username}</span>!
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">Crie drops e campanhas para a Cimed.</p>
        </div>

        {/* CTA */}
        <Button className="w-full h-14 text-base font-bold gradient-yellow text-accent-foreground rounded-xl shadow-lg shadow-accent/20 hover:opacity-90 transition-all duration-300 gap-2 shimmer-btn">
          <Plus className="w-5 h-5" />
          Criar Drop
        </Button>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <Card key={m.label} className="glass-card glow-border-hover shadow-depth border-0">
              <CardContent className="p-4 text-center space-y-2">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.gradient} mx-auto flex items-center justify-center`}>
                  <m.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">{m.label}</p>
                <p className="text-xl font-extrabold">{m.value.toLocaleString('pt-BR')}</p>
                {m.change > 0 && (
                  <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-[9px] px-1.5 py-0">
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />+{m.change}%
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="glass-card glow-border-hover shadow-depth border-0 cursor-pointer transition-all duration-300">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-sm">Campanhas</h3>
              <p className="text-xs text-muted-foreground">Gerencie suas campanhas.</p>
            </CardContent>
          </Card>
          <Card className="glass-card glow-border-hover shadow-depth border-0 cursor-pointer transition-all duration-300">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-sm">Meus QR Codes</h3>
              <p className="text-xs text-muted-foreground">Ver e gerenciar QR Codes ativos.</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="glass-card glow-border shadow-depth border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">Análise de Desempenho</CardTitle>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[150px] h-8 text-xs bg-background/50 border-border/50">
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
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12, color: 'hsl(var(--foreground))', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="cliques" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={false} name="Cliques" />
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
