import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Target, QrCode, Gift, Plus, TrendingUp, Calendar, Bell, ChevronDown, MoreVertical, ArrowRight, Maximize2, Pencil, Search, UserCircle, Mail, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
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
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AdminSidebar activeSection={section} onSectionChange={setSection} />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 flex items-center justify-between border-b-[3px] border-border px-4 md:px-6 bg-background sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <span className="font-nunito text-lg font-black text-accent">CIMED</span>
              <span className="font-nunito text-lg font-black text-foreground">GO</span>
              <span className="text-sm text-muted-foreground ml-2 font-bold uppercase tracking-wider hidden sm:inline">Dashboard</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground h-9 w-9 hidden sm:flex">
                <Calendar className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground relative h-9 w-9">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-[9px] text-destructive-foreground flex items-center justify-center font-black border-[2px] border-border">3</span>
              </Button>
              <div className="flex items-center gap-2 ml-1 cursor-pointer">
                <div className="w-8 h-8 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                  <span className="text-xs font-black text-accent-foreground">JP</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-black leading-tight uppercase">João Pedro</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Administrador</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {section === 'dashboard' && <DashboardSection />}
            {section === 'drops' && <DropsSection />}
            {section === 'influencers' && <InfluencersSection />}
            {section === 'profiles' && <ProfilesSection />}
            {!['dashboard', 'drops', 'influencers', 'profiles'].includes(section) && (
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="font-nunito text-2xl md:text-3xl font-black uppercase">DASHBOARD</h1>
        <Button className="gap-1.5 text-xs h-9 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> CRIAR CAMPANHA
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {mockAdminMetrics.map((m, i) => {
              const Icon = metricIcons[i];
              return (
                <Card key={m.label} className="relative">
                  {m.change > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-0.5 text-emerald-500 text-[10px] font-black">
                        <TrendingUp className="w-3 h-3" />+{m.change}%
                      </span>
                    </div>
                  )}
                  <CardContent className="p-3 md:p-4 flex items-start gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                      <Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest leading-tight font-black">{m.label}</p>
                      <p className="text-lg md:text-xl font-black leading-tight mt-1">{formatValue(m.value)}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Chart */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <CardTitle className="text-sm font-black uppercase">Visão Geral</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-[10px] h-7 gap-1">
                  <Calendar className="w-3 h-3" /> <span className="hidden sm:inline">Últimos 30 dias</span><span className="sm:hidden">30d</span> <ChevronDown className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                  <Maximize2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-52 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAdminGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} domain={[0, 360000]} ticks={[0, 90000, 180000, 270000, 360000]} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '3px solid hsl(var(--border))', borderRadius: 0, fontSize: 11, color: 'hsl(var(--foreground))', boxShadow: '4px 4px 0 hsl(var(--border))' }} formatter={(value: number) => [formatValue(value)]} />
                    <Legend verticalAlign="bottom" height={36} iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'hsl(var(--muted-foreground))' }} />
                    <Line type="monotone" dataKey="usuarios" stroke="hsl(50,100%,50%)" strokeWidth={3} dot={false} name="Usuários" />
                    <Line type="monotone" dataKey="scans" stroke="hsl(25,100%,50%)" strokeWidth={2} dot={false} name="Scans" />
                    <Line type="monotone" dataKey="drops" stroke="hsl(0,0%,60%)" strokeWidth={1.5} dot={false} name="Drops" />
                    <Line type="monotone" dataKey="missoes" stroke="hsl(0,0%,40%)" strokeWidth={1.5} dot={false} name="Missões" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Drops table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase">Últimos Drops Liberados</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DropsTable />
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-6 xl:w-80 shrink-0">
          {/* Drop ranking */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-black uppercase">Ranking dos Drops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAdminDropRanking.map((drop, i) => (
                <div key={drop.id} className="flex items-center gap-3 p-2 -mx-2 transition-all">
                  <div className="w-8 h-8 bg-accent flex items-center justify-center shrink-0 text-xs font-black text-accent-foreground border-[2px] border-border">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black truncate uppercase">{drop.name}</p>
                    <p className="text-[10px] text-muted-foreground">{drop.city}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black">{new Intl.NumberFormat('pt-BR').format(drop.claimed)}</p>
                    <DropStatusBadge status={drop.status} label={drop.statusLabel} />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t-[2px] border-border">
                <Button variant="ghost" size="sm" className="text-[10px] text-muted-foreground h-7 px-2">
                  Detalhes <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="ghost" size="sm" className="text-[10px] text-accent h-7 px-2 font-black">
                  Ver drop
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* New influencers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-black uppercase">Novos Influenciadores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAdminInfluencers.filter(inf => inf.status === 'pending').map((inf) => (
                <div key={inf.id} className="flex items-center gap-3 p-2 -mx-2 transition-all">
                  <div className="w-10 h-10 overflow-hidden shrink-0 border-[2px] border-border">
                    <img src={inf.avatar} alt={inf.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black truncate uppercase">{inf.name}</p>
                    <p className="text-[10px] text-muted-foreground">{inf.handle}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs font-black">{(inf.followers / 1000).toFixed(0)}k</p>
                    <p className="text-[9px] text-muted-foreground">seguidores</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-[10px] h-7 px-3 font-black">
                    APROVAR
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
    encerra_hoje: 'bg-accent text-accent-foreground border-border',
    ativo: 'bg-accent text-accent-foreground border-border',
    ended: 'bg-muted text-muted-foreground border-border',
    expired: 'bg-destructive/15 text-destructive border-destructive',
    expirada: 'bg-destructive/15 text-destructive border-destructive',
    paused: 'bg-muted text-muted-foreground border-border',
    active: 'bg-accent text-accent-foreground border-border',
  };
  const labels: Record<string, string> = {
    esgotado: 'Esgotado', encerra_hoje: 'Encerra hoje', ativo: 'Ativo', ended: 'Encerrado',
    expired: 'Expirada', expirada: 'Expirada', paused: 'Pausado', active: 'Ativo',
  };
  return (
    <Badge className={`${styles[status] || styles.ativo} text-[9px] px-1.5 py-0 font-black border-[2px] rounded-none uppercase`}>
      {label || labels[status] || status}
    </Badge>
  );
}

function DropsTable() {
  if (mockAdminCampaigns.length === 0) {
    return <EmptyState icon={Gift} title="Nenhum drop" description="Crie sua primeira campanha para começar." />;
  }
  return (
    <div className="overflow-x-auto">
      {/* Desktop header */}
      <div className="hidden md:flex items-center gap-3 px-6 py-2.5 border-b-[2px] border-border text-[10px] uppercase tracking-widest text-muted-foreground font-black">
        <div className="w-10 shrink-0" />
        <div className="flex-1">Drop</div>
        <div className="min-w-[80px] text-center">Resgates</div>
        <div className="min-w-[80px] text-center">Status</div>
        <div className="min-w-[80px] text-center">Ações</div>
      </div>
      <div className="divide-y-[2px] divide-border">
        {mockAdminCampaigns.map((c) => (
          <div key={c.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
            <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
              <Gift className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black uppercase">{c.name}</p>
              <p className="text-[11px] text-muted-foreground">{c.pharmacy}</p>
            </div>
            <div className="text-center shrink-0 hidden md:block min-w-[80px]">
              <p className="text-sm font-black">{c.claimed}/{c.total}</p>
            </div>
            <div className="shrink-0">
              <DropStatusBadge status={c.status} label={c.statusLabel} />
            </div>
            <div className="shrink-0 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground hidden sm:flex">
                <MoreVertical className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center py-3">
          <Button variant="ghost" className="text-xs text-accent font-black gap-1">
            VER TODOS <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DropsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Campanhas & Drops</h2>
        <Button className="gap-1.5 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> CRIAR CAMPANHA
        </Button>
      </div>
      <Card>
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
      <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Influenciadores</h2>
      <Card>
        <CardContent className="p-0">
          {mockAdminInfluencers.length === 0 ? (
            <EmptyState icon={Users} title="Nenhum influenciador cadastrado" description="Influenciadores aparecerão aqui após se cadastrarem." />
          ) : (
            <div className="divide-y-[2px] divide-border">
              {mockAdminInfluencers.map((inf) => (
                <div key={inf.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                  <div className="w-9 h-9 overflow-hidden border-[2px] border-border shrink-0">
                    <img src={inf.avatar} alt={inf.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-black text-sm uppercase">{inf.name}</span>
                    <p className="text-[10px] text-muted-foreground">{inf.handle}</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-bold hidden sm:block">{(inf.followers / 1000).toFixed(0)}k</p>
                  <DropStatusBadge status={inf.status === 'approved' ? 'active' : inf.status === 'pending' ? 'encerra_hoje' : 'ended'} />
                  {inf.status === 'pending' && (
                    <Button variant="outline" size="sm" className="text-xs h-7 font-black">
                      APROVAR
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

// Mock profiles data
const mockProfiles = [
  { id: '1', username: 'joao_pedro', email: 'joao@cimed.com', role: 'admin', level: 15, totalPoints: 8500, createdAt: '2025-01-15', avatarInitials: 'JP' },
  { id: '2', username: 'maria_silva', email: 'maria@email.com', role: 'user', level: 8, totalPoints: 3200, createdAt: '2025-02-20', avatarInitials: 'MS' },
  { id: '3', username: 'amanda_costa', email: 'amanda@influencer.com', role: 'influencer', level: 12, totalPoints: 6800, createdAt: '2025-01-28', avatarInitials: 'AC' },
  { id: '4', username: 'carlos_neto', email: 'carlos@email.com', role: 'user', level: 5, totalPoints: 1500, createdAt: '2025-03-10', avatarInitials: 'CN' },
  { id: '5', username: 'rafael_silva', email: 'rafael@influencer.com', role: 'influencer', level: 10, totalPoints: 5200, createdAt: '2025-02-05', avatarInitials: 'RS' },
  { id: '6', username: 'lucia_mendes', email: 'lucia@email.com', role: 'user', level: 3, totalPoints: 800, createdAt: '2025-04-01', avatarInitials: 'LM' },
];

function ProfilesSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = mockProfiles.filter(p => {
    const matchSearch = p.username.toLowerCase().includes(searchTerm.toLowerCase()) || p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'all' || p.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'influencer': return <ShieldCheck className="w-3.5 h-3.5" />;
      default: return <Shield className="w-3.5 h-3.5" />;
    }
  };

  const roleBadgeStyle = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive/15 text-destructive border-destructive';
      case 'influencer': return 'bg-accent text-accent-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const stats = {
    total: mockProfiles.length,
    admins: mockProfiles.filter(p => p.role === 'admin').length,
    influencers: mockProfiles.filter(p => p.role === 'influencer').length,
    users: mockProfiles.filter(p => p.role === 'user').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Perfis</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: stats.total, icon: Users },
          { label: 'Admins', value: stats.admins, icon: ShieldAlert },
          { label: 'Influencers', value: stats.influencers, icon: ShieldCheck },
          { label: 'Usuários', value: stats.users, icon: UserCircle },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-3 md:p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                <s.icon className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">{s.label}</p>
                <p className="text-xl font-black">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-[3px] border-border bg-background"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'admin', 'influencer', 'user'].map(role => (
                <Button
                  key={role}
                  variant={roleFilter === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setRoleFilter(role)}
                  className="text-[10px] h-8 font-black uppercase"
                >
                  {role === 'all' ? 'Todos' : role === 'admin' ? 'Admin' : role === 'influencer' ? 'Influencer' : 'Usuário'}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profiles list */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState icon={Users} title="Nenhum perfil encontrado" description="Tente alterar os filtros de busca." />
          ) : (
            <>
              {/* Desktop header */}
              <div className="hidden md:flex items-center gap-3 px-6 py-2.5 border-b-[2px] border-border text-[10px] uppercase tracking-widest text-muted-foreground font-black">
                <div className="w-9 shrink-0" />
                <div className="flex-1">Usuário</div>
                <div className="min-w-[100px]">Role</div>
                <div className="min-w-[70px] text-center">Nível</div>
                <div className="min-w-[90px] text-center">Pontos</div>
                <div className="min-w-[90px] text-center">Desde</div>
                <div className="min-w-[60px]" />
              </div>
              <div className="divide-y-[2px] divide-border">
                {filtered.map((profile) => (
                  <div key={profile.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                    <div className="w-9 h-9 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                      <span className="text-xs font-black text-accent-foreground">{profile.avatarInitials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase truncate">{profile.username}</p>
                      <p className="text-[10px] text-muted-foreground truncate flex items-center gap-1">
                        <Mail className="w-3 h-3 shrink-0" /> {profile.email}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Badge className={`${roleBadgeStyle(profile.role)} text-[9px] px-1.5 py-0 font-black border-[2px] rounded-none uppercase flex items-center gap-1`}>
                        {roleIcon(profile.role)}
                        <span className="hidden sm:inline">{profile.role}</span>
                      </Badge>
                    </div>
                    <div className="text-center shrink-0 hidden md:block min-w-[70px]">
                      <p className="text-sm font-black">{profile.level}</p>
                    </div>
                    <div className="text-center shrink-0 hidden md:block min-w-[90px]">
                      <p className="text-sm font-black">{profile.totalPoints.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="text-center shrink-0 hidden md:block min-w-[90px]">
                      <p className="text-[11px] text-muted-foreground">{new Date(profile.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="shrink-0">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
