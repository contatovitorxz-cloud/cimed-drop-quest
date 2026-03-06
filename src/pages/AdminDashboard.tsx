import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Target, QrCode, Gift, Plus, TrendingUp, Calendar, Bell, ChevronDown, MoreVertical, ArrowRight, Maximize2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EmptyState from '@/components/ui/empty-state';
import cimedLogo from '@/assets/cimed-logo.svg';
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

function formatResgates(val: number) {
  if (val >= 1000) {
    const formatted = new Intl.NumberFormat('pt-BR').format(val);
    return formatted;
  }
  return val.toString();
}

const AdminDashboard = () => {
  const [section, setSection] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground dark">
        <AdminSidebar activeSection={section} onSectionChange={setSection} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b border-border px-6 bg-card sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <img src={cimedLogo} alt="Cimed GO" className="h-5" />
              <span className="text-sm font-semibold text-muted-foreground ml-2">Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9">
                <Calendar className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground relative h-9 w-9">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive text-[9px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
              </Button>
              <div className="flex items-center gap-2.5 ml-2 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  alt="Admin"
                  className="w-8 h-8 rounded-full object-cover"
                />
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
    <div className="space-y-6">
      {/* Title row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button className="gradient-yellow text-accent-foreground gap-1.5 text-xs font-semibold rounded-lg h-9">
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
                <Card key={m.label} className="border-border bg-card">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-yellow flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">{m.label}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xl font-bold leading-tight">{formatValue(m.value)}</p>
                        {m.change > 0 && (
                          <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-[10px] px-1.5 py-0 font-medium">
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
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold">Visão Geral</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-[10px] h-7 gap-1 border-border text-muted-foreground">
                  <Calendar className="w-3 h-3" /> Últimos 30 dias <ChevronDown className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                  <Maximize2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Legend on top */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(48,100%,50%)' }} />
                  <span className="text-[10px] text-muted-foreground">Usuários Ativos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(217,91%,60%)' }} />
                  <span className="text-[10px] text-muted-foreground">Missões Completas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(25,100%,50%)' }} />
                  <span className="text-[10px] text-muted-foreground">Escaneamentos QR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'hsl(142,76%,46%)' }} />
                  <span className="text-[10px] text-muted-foreground">Drops Resgatados</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAdminGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(0,0%,50%)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(0,0%,50%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${v/1000}k` : v} />
                    <Tooltip contentStyle={{ background: 'hsl(0,0%,10%)', border: '1px solid hsl(0,0%,20%)', borderRadius: 8, fontSize: 11 }} />
                    <Line type="monotone" dataKey="usuarios" stroke="hsl(48,100%,50%)" strokeWidth={2.5} dot={false} name="Usuários" />
                    <Line type="monotone" dataKey="missoes" stroke="hsl(217,91%,60%)" strokeWidth={1.5} dot={false} name="Missões" />
                    <Line type="monotone" dataKey="scans" stroke="hsl(25,100%,50%)" strokeWidth={1.5} dot={false} name="Scans" />
                    <Line type="monotone" dataKey="drops" stroke="hsl(142,76%,46%)" strokeWidth={1.5} dot={false} name="Drops" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Drops table */}
          <Card className="border-border bg-card">
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
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Ranking dos Drops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAdminDropRanking.map((drop) => (
                <div key={drop.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-yellow flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold truncate">{drop.name}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{drop.city}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{new Intl.NumberFormat('pt-BR').format(drop.claimed)}</p>
                    <DropStatusBadge status={drop.status} label={drop.statusLabel} />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-border">
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
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Novos Influenciadores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminInfluencers.filter(inf => inf.status === 'pending').map((inf) => (
                <div key={inf.id} className="flex items-center gap-3">
                  <img
                    src={inf.avatar}
                    alt={inf.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{inf.name}</p>
                    <p className="text-[10px] text-muted-foreground">{inf.handle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{(inf.followers / 1000).toFixed(0)}k</p>
                    <p className="text-[9px] text-muted-foreground">seguidores</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[10px] h-7 px-3 border-accent text-accent hover:bg-accent/10 font-semibold rounded-full">
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
    encerra_hoje: 'bg-green-500/15 text-green-400 border-green-500/30',
    ativo: 'bg-green-500/15 text-green-400 border-green-500/30',
    ended: 'bg-muted text-muted-foreground border-border',
    expired: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    expirada: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    paused: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    active: 'bg-green-500/15 text-green-400 border-green-500/30',
  };
  const labels: Record<string, string> = {
    esgotado: 'Esgotado',
    encerra_hoje: 'Encerra hoje',
    ativo: 'Ativo',
    ended: 'Encerrado',
    expired: 'Expirada',
    expirada: 'Expirada',
    paused: 'Pausado',
    active: 'Ativo',
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
    <div className="divide-y divide-border">
      {mockAdminCampaigns.map((c) => (
        <div key={c.id} className="flex items-center gap-3 px-6 py-3">
          <div className="w-10 h-10 rounded-full gradient-yellow flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-[11px] text-muted-foreground">{c.pharmacy}</p>
          </div>
          <div className="text-center shrink-0 min-w-[80px]">
            <p className="text-sm font-bold">{formatResgates(c.claimed)}</p>
            <p className="text-[9px] text-muted-foreground">Resgates</p>
          </div>
          <div className="shrink-0">
            <DropStatusBadge status={c.status} label={c.statusLabel} />
          </div>
          <Button variant="outline" size="sm" className="text-[11px] h-7 px-3 border-border text-muted-foreground hover:text-foreground">
            Editar
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0">
            <MoreVertical className="w-3.5 h-3.5" />
          </Button>
        </div>
      ))}
      {/* Ver todos button */}
      <div className="flex items-center justify-center py-3">
        <Button variant="ghost" className="text-xs text-accent font-semibold gap-1 hover:bg-accent/10">
          Ver Todos <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

function DropsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Gestão de Campanhas & Drops</h2>
        <Button className="gradient-yellow text-accent-foreground gap-1.5">
          <Plus className="w-4 h-4" /> Criar Campanha
        </Button>
      </div>
      <Card className="border-border bg-card">
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
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          {mockAdminInfluencers.length === 0 ? (
            <EmptyState icon={Users} title="Nenhum influenciador cadastrado" description="Influenciadores aparecerão aqui após se cadastrarem." />
          ) : (
            <div className="divide-y divide-border">
              {mockAdminInfluencers.map((inf) => (
                <div key={inf.id} className="flex items-center gap-3 px-6 py-3">
                  <img src={inf.avatar} alt={inf.name} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{inf.name}</span>
                    <p className="text-[10px] text-muted-foreground">{inf.handle}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{(inf.followers / 1000).toFixed(0)}k</p>
                  <DropStatusBadge status={inf.status === 'approved' ? 'active' : inf.status === 'pending' ? 'encerra_hoje' : 'ended'} />
                  {inf.status === 'pending' && (
                    <Button variant="outline" size="sm" className="text-xs h-7 border-accent text-accent hover:bg-accent/10 rounded-full">
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
