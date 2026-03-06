import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Target, QrCode, Gift, Plus, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EmptyState from '@/components/ui/empty-state';
import {
  mockAdminMetrics,
  mockAdminGrowth,
  mockAdminCampaigns,
  mockAdminInfluencers,
} from '@/data/mockData';

const metricIcons = [Users, Target, QrCode, Gift];

const AdminDashboard = () => {
  const [section, setSection] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AdminSidebar activeSection={section} onSectionChange={setSection} />

        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/90 backdrop-blur-md sticky top-0 z-30">
            <SidebarTrigger className="mr-3" />
            <h1 className="text-sm font-bold capitalize">{section === 'dashboard' ? 'Dashboard' : section === 'influencers' ? 'Influenciadores' : section === 'drops' ? 'Gestão de Drops' : section}</h1>
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
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockAdminMetrics.map((m, i) => {
          const Icon = metricIcons[i];
          return (
            <Card key={m.label} className="border-border bg-card">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{m.value.toLocaleString('pt-BR')}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  {m.change > 0 && (
                    <span className="text-xs text-green-400 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +{m.change}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Growth Chart */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm font-bold">Crescimento da Plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          {mockAdminGrowth.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
              Dados de crescimento disponíveis após primeiras atividades
            </div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAdminGrowth}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(48,100%,50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(48,100%,50%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(25,100%,50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(25,100%,50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,20%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(0,0%,60%)' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(0,0%,60%)' }} />
                  <Tooltip contentStyle={{ background: 'hsl(0,0%,10%)', border: '1px solid hsl(0,0%,20%)', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="usuarios" stroke="hsl(48,100%,50%)" fill="url(#colorUsers)" strokeWidth={2} />
                  <Area type="monotone" dataKey="scans" stroke="hsl(25,100%,50%)" fill="url(#colorScans)" strokeWidth={2} />
                  <Area type="monotone" dataKey="drops" stroke="hsl(142,76%,46%)" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="missoes" stroke="hsl(217,91%,60%)" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold">Campanhas Recentes</CardTitle>
          <Button size="sm" className="gradient-yellow text-accent-foreground gap-1 text-xs">
            <Plus className="w-3.5 h-3.5" /> Criar Campanha
          </Button>
        </CardHeader>
        <CardContent>
          <CampaignTable />
        </CardContent>
      </Card>
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
          <CampaignTable />
        </CardContent>
      </Card>
    </div>
  );
}

function CampaignTable() {
  if (mockAdminCampaigns.length === 0) {
    return (
      <EmptyState icon={Gift} title="Nenhuma campanha" description="Crie sua primeira campanha para começar a distribuir drops." />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-xs text-muted-foreground">Nome</TableHead>
          <TableHead className="text-xs text-muted-foreground">Farmácia</TableHead>
          <TableHead className="text-xs text-muted-foreground">Resgatados</TableHead>
          <TableHead className="text-xs text-muted-foreground">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockAdminCampaigns.map((c) => (
          <TableRow key={c.id} className="border-border">
            <TableCell className="font-medium text-sm">{c.name}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{c.pharmacy}</TableCell>
            <TableCell className="text-sm">{c.claimed}/{c.total}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{c.status === 'active' ? 'Ativo' : c.status === 'paused' ? 'Pausado' : 'Encerrado'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function InfluencersSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Gestão de Influenciadores</h2>
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          {mockAdminInfluencers.length === 0 ? (
            <EmptyState icon={Users} title="Nenhum influenciador cadastrado" description="Influenciadores aparecerão aqui após se cadastrarem na plataforma." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-xs text-muted-foreground">Influenciador</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Seguidores</TableHead>
                  <TableHead className="text-xs text-muted-foreground">Status</TableHead>
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
                        <span className="font-medium text-sm">{inf.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{inf.followers.toLocaleString('pt-BR')}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {inf.status === 'approved' ? 'Aprovado' : inf.status === 'pending' ? 'Pendente' : 'Suspenso'}
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
