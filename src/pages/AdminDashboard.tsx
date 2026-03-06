import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Users, Target, QrCode, Gift, Plus, TrendingUp, Calendar, Bell, Edit, MoreVertical } from 'lucide-react';
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
          <header className="h-14 flex items-center justify-between border-b border-border px-6 bg-background/90 backdrop-blur-md sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <img src={cimedLogo} alt="Cimed GO" className="h-6" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <Calendar className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-[9px] text-destructive-foreground flex items-center justify-center font-bold">3</span>
              </Button>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full gradient-yellow flex items-center justify-center text-accent-foreground font-bold text-xs">JP</div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold leading-tight">João Pedro</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Administrador</p>
                </div>
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
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Button className="gradient-yellow text-accent-foreground gap-1.5 text-xs font-semibold">
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
                    <div className="w-10 h-10 rounded-xl gradient-yellow flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold">{formatValue(m.value)}</p>
                        {m.change > 0 && (
                          <Badge className="bg-green-500/15 text-green-400 border-green-500/30 text-[10px] px-1.5 py-0">
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
              <Button variant="outline" size="sm" className="text-[10px] h-7 gap-1 border-border text-muted-foreground">
                <Calendar className="w-3 h-3" /> Últimos 30 dias
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAdminGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(0,0%,50%)' }} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(0,0%,50%)' }} />
                    <Tooltip contentStyle={{ background: 'hsl(0,0%,10%)', border: '1px solid hsl(0,0%,20%)', borderRadius: 8, fontSize: 11 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="usuarios" stroke="hsl(48,100%,50%)" strokeWidth={2} dot={false} name="Usuários" />
                    <Line type="monotone" dataKey="scans" stroke="hsl(25,100%,50%)" strokeWidth={2} dot={false} name="Scans" />
                    <Line type="monotone" dataKey="drops" stroke="hsl(142,76%,46%)" strokeWidth={2} dot={false} name="Drops" />
                    <Line type="monotone" dataKey="missoes" stroke="hsl(217,91%,60%)" strokeWidth={2} dot={false} name="Missões" />
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
        <div className="hidden xl:flex flex-col gap-6 w-72 shrink-0">
          {/* Drop ranking */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Ranking dos Drops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminDropRanking.map((drop, i) => (
                <div key={drop.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg gradient-yellow flex items-center justify-center text-accent-foreground font-bold text-xs shrink-0">
                    #{i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold truncate">{drop.name}</p>
                      <DropStatusBadge status={drop.status} />
                    </div>
                    <p className="text-[10px] text-muted-foreground">{drop.city} · {drop.claimed}/{drop.total}</p>
                    <Progress value={(drop.claimed / drop.total) * 100} className="h-1 mt-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* New influencers */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold">Novos Influenciadores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminInfluencers.filter(inf => inf.status === 'pending').map((inf) => (
                <div key={inf.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-yellow flex items-center justify-center text-accent-foreground font-bold text-[10px] shrink-0">
                    {inf.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{inf.name}</p>
                    <p className="text-[10px] text-muted-foreground">{inf.handle} · {(inf.followers / 1000).toFixed(0)}k seguidores</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[10px] h-6 px-2 border-accent text-accent hover:bg-accent/10">
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

function DropStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    esgotado: 'bg-destructive/15 text-destructive border-destructive/30',
    encerra_hoje: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    ativo: 'bg-green-500/15 text-green-400 border-green-500/30',
    ended: 'bg-muted text-muted-foreground border-border',
    paused: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    active: 'bg-green-500/15 text-green-400 border-green-500/30',
  };
  const labels: Record<string, string> = {
    esgotado: 'Esgotado',
    encerra_hoje: 'Encerra hoje',
    ativo: 'Ativo',
    ended: 'Encerrado',
    paused: 'Pausado',
    active: 'Ativo',
  };
  return (
    <Badge className={`${styles[status] || styles.ativo} text-[9px] px-1.5 py-0 font-medium`}>
      {labels[status] || status}
    </Badge>
  );
}

function DropsTable() {
  if (mockAdminCampaigns.length === 0) {
    return <EmptyState icon={Gift} title="Nenhum drop" description="Crie sua primeira campanha para começar." />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-[10px] text-muted-foreground">Drop</TableHead>
          <TableHead className="text-[10px] text-muted-foreground">Resgates</TableHead>
          <TableHead className="text-[10px] text-muted-foreground">Status</TableHead>
          <TableHead className="text-[10px] text-muted-foreground w-20">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockAdminCampaigns.map((c) => (
          <TableRow key={c.id} className="border-border">
            <TableCell>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-medium">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.pharmacy}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-xs">{c.claimed}/{c.total}</TableCell>
            <TableCell>
              <DropStatusBadge status={c.status} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <MoreVertical className="w-3.5 h-3.5" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs text-muted-foreground">Influenciador</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Seguidores</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Status</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAdminInfluencers.map((inf) => (
                  <TableRow key={inf.id} className="border-border">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full gradient-yellow flex items-center justify-center text-accent-foreground font-bold text-sm">
                          {inf.initials}
                        </div>
                        <div>
                          <span className="font-medium text-sm">{inf.name}</span>
                          <p className="text-[10px] text-muted-foreground">{inf.handle}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{(inf.followers / 1000).toFixed(0)}k</TableCell>
                    <TableCell>
                      <DropStatusBadge status={inf.status === 'approved' ? 'active' : inf.status === 'pending' ? 'encerra_hoje' : 'ended'} />
                    </TableCell>
                    <TableCell>
                      {inf.status === 'pending' && (
                        <Button variant="outline" size="sm" className="text-xs h-7 border-accent text-accent hover:bg-accent/10">
                          Aprovar
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
