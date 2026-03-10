import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Target, QrCode, Gift, Plus, TrendingUp, Calendar, Bell, ChevronDown, MoreVertical, ArrowRight, Maximize2, Pencil, Search, UserCircle, Mail, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import EmptyState from '@/components/ui/empty-state';
import { supabase } from '@/integrations/supabase/client';
import { useAdminStats } from '@/hooks/useSupabaseData';

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
              </Button>
              <div className="flex items-center gap-2 ml-1 cursor-pointer">
                <div className="w-8 h-8 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                  <span className="text-xs font-black text-accent-foreground">AD</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-black leading-tight uppercase">Admin</p>
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
  const { stats, drops, loading } = useAdminStats();

  const adminMetrics = [
    { label: 'USUÁRIOS ATIVOS', value: stats.totalUsers },
    { label: 'MISSÕES COMPLETAS', value: stats.totalMissions },
    { label: 'SCANS QR CODE', value: stats.totalScans },
    { label: 'DROPS RESGATADOS', value: stats.totalDropsClaimed },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="font-nunito text-2xl md:text-3xl font-black uppercase">DASHBOARD</h1>
        <Button className="gap-1.5 text-xs h-9 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> CRIAR CAMPANHA
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0 space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {adminMetrics.map((m, i) => {
              const Icon = metricIcons[i];
              return (
                <Card key={m.label} className="relative">
                  <CardContent className="p-3 md:p-4 flex items-start gap-3">
                    <div className="w-10 h-10 md:w-11 md:h-11 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                      <Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest leading-tight font-black">{m.label}</p>
                      <p className="text-lg md:text-xl font-black leading-tight mt-1">{loading ? '—' : formatValue(m.value)}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Drops table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase">Drops Ativos</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <DropsTable drops={drops} loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DropStatusBadge({ status, label }: { status: string; label?: string }) {
  const styles: Record<string, string> = {
    active: 'bg-accent text-accent-foreground border-border',
    ativo: 'bg-accent text-accent-foreground border-border',
    ended: 'bg-muted text-muted-foreground border-border',
    expired: 'bg-destructive/15 text-destructive border-destructive',
  };
  return (
    <Badge className={`${styles[status] || styles.active} text-[9px] px-1.5 py-0 font-black border-[2px] rounded-none uppercase`}>
      {label || status}
    </Badge>
  );
}

function DropsTable({ drops, loading }: { drops: any[]; loading: boolean }) {
  if (loading) return <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>;
  if (drops.length === 0) {
    return <EmptyState icon={Gift} title="Nenhum drop" description="Crie sua primeira campanha para começar." />;
  }
  return (
    <div className="overflow-x-auto">
      <div className="hidden md:flex items-center gap-3 px-6 py-2.5 border-b-[2px] border-border text-[10px] uppercase tracking-widest text-muted-foreground font-black">
        <div className="w-10 shrink-0" />
        <div className="flex-1">Drop</div>
        <div className="min-w-[80px] text-center">Qtd</div>
        <div className="min-w-[80px] text-center">Status</div>
        <div className="min-w-[80px] text-center">Ações</div>
      </div>
      <div className="divide-y-[2px] divide-border">
        {drops.map((d: any) => (
          <div key={d.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
            <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
              <Gift className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black uppercase">{d.title}</p>
              <p className="text-[11px] text-muted-foreground">{d.pharmacies?.name || 'Sem farmácia'}</p>
            </div>
            <div className="text-center shrink-0 hidden md:block min-w-[80px]">
              <p className="text-sm font-black">{d.quantity}</p>
            </div>
            <div className="shrink-0">
              <DropStatusBadge status={d.active ? 'active' : 'ended'} label={d.active ? 'Ativo' : 'Encerrado'} />
            </div>
            <div className="shrink-0 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                <Pencil className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DropsSection() {
  const { drops, loading } = useAdminStats();
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
          <DropsTable drops={drops} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}

function InfluencersSection() {
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('influencer_settings')
        .select('*, profiles:user_id(username, avatar_url, level, total_points)');
      setInfluencers(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Influenciadores</h2>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>
          ) : influencers.length === 0 ? (
            <EmptyState icon={Users} title="Nenhum influenciador cadastrado" description="Influenciadores aparecerão aqui após se cadastrarem." />
          ) : (
            <div className="divide-y-[2px] divide-border">
              {influencers.map((inf: any) => {
                const profile = inf.profiles;
                const name = inf.display_name || profile?.username || 'Influenciador';
                const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
                return (
                  <div key={inf.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                    <div className="w-9 h-9 bg-accent flex items-center justify-center border-[2px] border-border shrink-0">
                      <span className="text-xs font-black text-accent-foreground">{initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-black text-sm uppercase">{name}</span>
                      <p className="text-[10px] text-muted-foreground">Comissão: R$ {Number(inf.commission_balance || 0).toFixed(2)}</p>
                    </div>
                    <DropStatusBadge status="active" label="Ativo" />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ProfilesSection() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(100);
      setProfiles(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = profiles.filter(p => {
    if (!searchTerm) return true;
    return (p.username || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  const stats = {
    total: profiles.length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Perfis</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 md:p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
              <Users className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Total</p>
              <p className="text-xl font-black">{loading ? '—' : stats.total}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-[3px] border-border bg-background"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={Users} title="Nenhum perfil encontrado" description="Tente alterar os filtros de busca." />
          ) : (
            <>
              <div className="hidden md:flex items-center gap-3 px-6 py-2.5 border-b-[2px] border-border text-[10px] uppercase tracking-widest text-muted-foreground font-black">
                <div className="w-9 shrink-0" />
                <div className="flex-1">Usuário</div>
                <div className="min-w-[70px] text-center">Nível</div>
                <div className="min-w-[90px] text-center">Pontos</div>
                <div className="min-w-[90px] text-center">Desde</div>
              </div>
              <div className="divide-y-[2px] divide-border">
                {filtered.map((profile: any) => {
                  const initials = (profile.username || '??').slice(0, 2).toUpperCase();
                  return (
                    <div key={profile.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                      <div className="w-9 h-9 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                        <span className="text-xs font-black text-accent-foreground">{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black uppercase truncate">{profile.username || 'Sem nome'}</p>
                      </div>
                      <div className="text-center shrink-0 hidden md:block min-w-[70px]">
                        <p className="text-sm font-black">{profile.level}</p>
                      </div>
                      <div className="text-center shrink-0 hidden md:block min-w-[90px]">
                        <p className="text-sm font-black">{profile.total_points.toLocaleString('pt-BR')}</p>
                      </div>
                      <div className="text-center shrink-0 hidden md:block min-w-[90px]">
                        <p className="text-[11px] text-muted-foreground">{new Date(profile.created_at).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="shrink-0">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
