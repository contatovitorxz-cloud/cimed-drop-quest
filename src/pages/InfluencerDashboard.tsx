import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, MousePointerClick, TrendingUp, Plus, QrCode, Gift, BarChart3, ArrowLeft, CheckCircle, Clock, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import {
  mockInfluencerMetrics,
  mockInfluencerCampaigns,
  mockInfluencerQRCodes,
  mockInfluencerPerformance,
} from '@/data/mockData';

const statusMap: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  active: { label: 'Ativo', icon: <CheckCircle className="w-3 h-3" />, className: 'bg-green-500/20 text-green-400 border-green-500/30' },
  paused: { label: 'Pausado', icon: <Clock className="w-3 h-3" />, className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  ended: { label: 'Encerrado', icon: <XCircle className="w-3 h-3" />, className: 'bg-muted text-muted-foreground' },
};

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/home')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full gradient-yellow flex items-center justify-center text-lg font-bold text-accent-foreground">V</div>
          <div className="flex-1">
            <h1 className="text-sm font-bold">Virginia Fonseca</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-muted-foreground">Influenciador Verificado</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-5 pt-4">
        {/* Welcome */}
        <div>
          <h2 className="text-xl font-bold">Bem-vindo ao <span className="text-gradient-orange">Creator Hub</span></h2>
          <p className="text-sm text-muted-foreground mt-0.5">Gerencie seus drops, campanhas e desempenho</p>
        </div>

        {/* CTA */}
        <Button className="w-full h-14 text-base font-bold gradient-yellow text-accent-foreground rounded-xl glow-yellow hover:opacity-90 transition-opacity gap-2">
          <Plus className="w-5 h-5" />
          Criar Drop
        </Button>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3">
          {mockInfluencerMetrics.map((m) => {
            const Icon = m.icon === 'eye' ? Eye : m.icon === 'click' ? MousePointerClick : TrendingUp;
            return (
              <Card key={m.label} className="border-border bg-card">
                <CardContent className="p-3 text-center space-y-1">
                  <Icon className="w-5 h-5 mx-auto text-accent" />
                  <p className="text-lg font-bold">{m.value.toLocaleString('pt-BR')}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                  <span className="text-[10px] text-green-400">+{m.change}%</span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList className="w-full bg-secondary grid grid-cols-3">
            <TabsTrigger value="campaigns" className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Gift className="w-3.5 h-3.5 mr-1" /> Campanhas
            </TabsTrigger>
            <TabsTrigger value="qrcodes" className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <QrCode className="w-3.5 h-3.5 mr-1" /> QR Codes
            </TabsTrigger>
            <TabsTrigger value="drops" className="text-xs data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <BarChart3 className="w-3.5 h-3.5 mr-1" /> Drops
            </TabsTrigger>
          </TabsList>

          {/* Campaigns */}
          <TabsContent value="campaigns" className="space-y-3">
            {mockInfluencerCampaigns.map((c) => {
              const s = statusMap[c.status];
              return (
                <Card key={c.id} className="border-border bg-card">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{c.name}</h3>
                        <p className="text-xs text-muted-foreground">{c.pharmacy}</p>
                      </div>
                      <Badge variant="outline" className={`text-[10px] gap-1 ${s.className}`}>
                        {s.icon} {s.label}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>👁 {c.views.toLocaleString('pt-BR')}</span>
                      <span>🖱 {c.clicks.toLocaleString('pt-BR')}</span>
                      <span>✅ {c.conversions}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* QR Codes */}
          <TabsContent value="qrcodes" className="space-y-3">
            {mockInfluencerQRCodes.map((qr) => (
              <Card key={qr.id} className="border-border bg-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{qr.label}</h3>
                    <p className="text-xs text-muted-foreground">{qr.scans} scans • {qr.pharmacy}</p>
                  </div>
                  <Badge variant="outline" className={qr.active ? 'text-green-400 border-green-500/30 text-[10px]' : 'text-muted-foreground text-[10px]'}>
                    {qr.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Drops */}
          <TabsContent value="drops" className="space-y-3">
            {mockInfluencerCampaigns.map((c) => (
              <Card key={c.id} className="border-border bg-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-yellow flex items-center justify-center text-accent-foreground font-bold text-sm">
                    {c.remaining}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.remaining}/{c.total} restantes • {c.pharmacy}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Performance Chart */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold">Análise de Desempenho</CardTitle>
              <div className="flex gap-1">
                {(['7d', '30d', '90d'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-colors ${
                      period === p ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockInfluencerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(0,0%,60%)' }} />
                  <YAxis tick={{ fontSize: 10, fill: 'hsl(0,0%,60%)' }} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(0,0%,10%)', border: '1px solid hsl(0,0%,20%)', borderRadius: 8, fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Line type="monotone" dataKey="cliques" stroke="hsl(48,100%,50%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="conversoes" stroke="hsl(25,100%,50%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="engajamento" stroke="hsl(142,76%,46%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfluencerDashboard;
