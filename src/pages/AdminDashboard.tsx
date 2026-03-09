import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, QrCode, Gift, Plus, TrendingUp, Calendar, Bell, ChevronDown, MoreVertical, ArrowRight, Maximize2, Pencil } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EmptyState from '@/components/ui/empty-state';
import {
  mockAdminMetrics,
  mockAdminGrowth,
  mockAdminCampaigns,
  mockAdminInfluencers,
  mockAdminDropRanking,
} from '@/data/mockData';

const metricIcons = [Users, Target, QrCode, Gift];

function formatValue(val: number) {
  if (val >= 1000000) return (val / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (val >= 1000) return (val / 1000).toFixed(1).replace('.0', '') + 'k';
  return val.toLocaleString('pt-BR');
}

const AdminDashboard = () => {
  const [section, setSection] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground dark">
        <AdminSidebar activeSection={section} onSectionChange={setSection} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b border-border/40 px-6 glass-header sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <span className="font-['Nunito'] font-black text-lg text-accent" style={{ fontWeight: 900 }}>CIMED</span>
              <span className="font-['Nunito'] font-black text-lg text-foreground" style={{ fontWeight: 900 }}>GO</span>
              <span className="text-sm text-muted-foreground ml-2 font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9 hover:bg-accent/10 transition-all duration-300">
                <Calendar className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground relative h-9 w-9 hover:bg-accent/10 transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-[9px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
              </Button>
              <div className="flex items-center gap-2.5 ml-2 cursor-pointer">
                <div className="avatar-ring w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-accent-foreground">JP</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold leading-tight">João Pedro</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Administrador</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {section === 'dashboard' && <DashboardSection />}
            {section === 'drops' && <DropsSection />}
            {section === 'influencers' && <InfluencersSection />}
            {!['dashboard', 'drops', 'influencers'].includes(section) && (
              <EmptyState icon={Target} title="Em desenvolvimento" description="Esta seção estará disponível em breve." />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

function DashboardSection() {
  return (
    <div className="space-y-6 stagger-children">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button className="gradient-yellow text-accent-foreground gap-1.5 text-xs font-semibold rounded-lg h-9 shadow-depth hover:opacity-90 transition-all duration-300">
          <Plus className="w-4 h-4" /> Criar Campanha
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockAdminMetrics.map((m, i) => {
              const Icon = metricIcons[i];
              return (
                <Card key={m.label} className="glass-card glow-border-hover shadow-depth border-0 transition-all duration-300">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${metricGradients[i]} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight font-medium">{m.label}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xl font-bold leading-tight">{formatValue(m.value)}</p>
                        {m.change > 0 && (
                          <Badge className="bg-accent/15 text-accent border-accent/30 text-[10px] px-1.5 py-0 font-medium">
                            <TrendingUp className="w-2.5 h-2.5 mr-0.5" />+{m.change}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Chart */}
          <Card className="glass-card glow-border shadow-depth border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold">Visão Geral</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-[10px] h-7 gap-1 border-border/50 text-muted-foreground bg-background/30 hover:bg-background/50 transition-all duration-300">
                  <Calendar className="w-3 h-3" /> Últimos 30 dias <ChevronDown className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground transition-all duration-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAdminGrowth}>
                    <defs>
                      <linearGradient id="gradientUsuarios" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(48,100%,50%)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(48,100%,50%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} domain={[0, 360000]} ticks={[0, 90000, 180000, 270000, 360000]} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card) / 0.9)', backdropFilter: 'blur(12px)', border: '1px solid hsl(var(--border) / 0.3)', borderRadius: 12, fontSize: 11, color: 'hsl(var(--foreground))', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} formatter={(value: number) => [formatValue(value)]} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'hsl(var(--muted-foreground))' }} />
                    <Line type="monotone" dataKey="usuarios" stroke="hsl(48,100%,50%)" strokeWidth={3} dot={false} name="Usuários" />
                    <Line type="monotone" dataKey="scans" stroke="hsl(25,100%,50%)" strokeWidth={2} dot={false} name="Scans" />
                    <Line type="monotone" dataKey="drops" stroke="hsl(0,0%,60%)" strokeWidth={1.5} dot={false} name="Drops" />
                    <Line type="monotone" dataKey="missoes" stroke="hsl(0,0%,40%)" strokeWidth={1.5} dot={false} name="Missões" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Drops table */}
          <Card className="glass-card glow-border shadow-depth border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Últimos Drops Liberados</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DropsTable />
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="hidden xl:flex flex-col gap-6 w-80 shrink-0">
          {/* Drop ranking */}
          <Card className="glass-card glow-border shadow-depth border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Ranking dos Drops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAdminDropRanking.map((drop, i) => (
                <div key={drop.id} className="flex items-center gap-3 glow-border-hover rounded-xl p-2 -mx-2 transition-all duration-300">
                  <div className="w-8 h-8 rounded-full gradient-yellow flex items-center justify-center shrink-0 text-xs font-black text-accent-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{drop.name}</p>
                    <p className="text-[10px] text-muted-foreground">{drop.city}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{new Intl.NumberFormat('pt-BR').format(drop.claimed)}</p>
                    <DropStatusBadge status={drop.status} label={drop.statusLabel} />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-border/30">
                <Button variant="ghost" size="sm" className="text-[10px] text-muted-foreground h-7 px-2">
                  Detalhes <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[10px] text-accent h-7 px-2 font-semibold">
                  Ver drop
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* New influencers */}
          <Card className="glass-card glow-border shadow-depth border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Novos Influenciadores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminInfluencers.filter(inf => inf.status === 'pending').map((inf) => (
                <div key={inf.id} className="flex items-center gap-3 glow-border-hover rounded-xl p-2 -mx-2 transition-all duration-300">
                  <div className="avatar-ring w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img src={inf.avatar} alt={inf.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{inf.name}</p>
                    <p className="text-[10px] text-muted-foreground">{inf.handle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{(inf.followers / 1000).toFixed(0)}k</p>
                    <p className="text-[9px] text-muted-foreground">seguidores</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[10px] h-7 px-3 border-accent/30 text-accent hover:bg-accent/10 font-semibold rounded-full transition-all duration-300">
                    Aprovar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DropStatusBadge({ status, label }: { status: string; label?: string }) {
  const styles: Record<string, string> = {
    esgotado: 'bg-muted text-muted-foreground border-border',
    encerra_hoje: 'bg-accent/15 text-accent border-accent/30',
    ativo: 'bg-accent/15 text-accent border-accent/30',
    ended: 'bg-muted text-muted-foreground border-border',
    expired: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    expirada: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    paused: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    active: 'bg-accent/15 text-accent border-accent/30',
  };
  const labels: Record<string, string> = {
    esgotado: 'Esgotado', encerra_hoje: 'Encerra hoje', ativo: 'Ativo', ended: 'Encerrado',
    expired: 'Expirada', expirada: 'Expirada', paused: 'Pausado', active: 'Ativo',
  };
  return (
    <Badge className={`${styles[status] || styles.ativo} text-[9px] px-1.5 py-0 font-medium`}>
      {label || labels[status] || status}
    </Badge>
  );
}

function DropsTable() {
  if (mockAdminCampaigns.length === 0) {
    return <EmptyState icon={Gift} title="Nenhum drop" description="Crie sua primeira campanha para começar." />;
  }
  return (
    <div>
      <div className="flex items-center gap-3 px-6 py-2.5 border-b border-border/30 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
        <div className="w-10 shrink-0" />
        <div className="flex-1">Drop</div>
        <div className="min-w-[80px] text-center">Resgates</div>
        <div className="min-w-[80px] text-center">Status</div>
        <div className="min-w-[80px] text-center">Ações</div>
      </div>
      <div className="divide-y divide-border/20">
        {mockAdminCampaigns.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-6 py-3 hover:bg-accent/5 transition-all duration-300">
            <div className="w-10 h-10 rounded-full gradient-yellow flex items-center justify-center shrink-0 shadow-sm">
              <Gift className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.pharmacy}</p>
            </div>
            <div className="text-center shrink-0 min-w-[80px]">
              <p className="text-sm font-bold">{c.claimed}/{c.total}</p>
            </div>
            <div className="shrink-0 min-w-[80px] flex justify-center">
              <DropStatusBadge status={c.status} label={c.statusLabel} />
            </div>
            <div className="shrink-0 min-w-[80px] flex items-center justify-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-300">
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-300">
                <MoreVertical className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center py-3">
          <Button variant="ghost" className="text-xs text-accent font-semibold gap-1 hover:bg-accent/10 transition-all duration-300">
            Ver Todos <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DropsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Gestão de Campanhas & Drops</h2>
        <Button className="gradient-yellow text-accent-foreground gap-1.5 shadow-depth hover:opacity-90 transition-all duration-300">
          <Plus className="w-4 h-4" /> Criar Campanha
        </Button>
      </div>
      <Card className="glass-card glow-border shadow-depth border-0">
        <CardContent className="p-0">
          <DropsTable />
        </CardContent>
      </Card>
    </div>
  );
}

function InfluencersSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Gestão de Influenciadores</h2>
      <Card className="glass-card glow-border shadow-depth border-0">
        <CardContent className="p-0">
          {mockAdminInfluencers.length === 0 ? (
            <EmptyState icon={Users} title="Nenhum influenciador cadastrado" description="Influenciadores aparecerão aqui após se cadastrarem." />
          ) : (
            <div className="divide-y divide-border/20">
              {mockAdminInfluencers.map((inf) => (
                <div key={inf.id} className="flex items-center gap-3 px-6 py-3 hover:bg-accent/5 transition-all duration-300">
                  <div className="avatar-ring w-9 h-9 rounded-full overflow-hidden">
                    <img src={inf.avatar} alt={inf.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{inf.name}</span>
                    <p className="text-[10px] text-muted-foreground">{inf.handle}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{(inf.followers / 1000).toFixed(0)}k</p>
                  <DropStatusBadge status={inf.status === 'approved' ? 'active' : inf.status === 'pending' ? 'encerra_hoje' : 'ended'} />
                  {inf.status === 'pending' && (
                    <Button variant="outline" size="sm" className="text-xs h-7 border-accent/30 text-accent hover:bg-accent/10 rounded-full transition-all duration-300">
                      Aprovar
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
