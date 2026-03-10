import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Users, Target, QrCode, Gift, Plus, TrendingUp, Calendar, Bell,
  ChevronDown, MoreVertical, Pencil, Search, LogOut, LayoutDashboard,
  UserCircle, BarChart3, Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import EmptyState from '@/components/ui/empty-state';
import { supabase } from '@/integrations/supabase/client';
import { useAdminStats } from '@/hooks/useSupabaseData';
import { useUserRole } from '@/hooks/useUserRole';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import {
  mockAdminMetrics, mockEngagementChart, mockDrops, mockQRCodes,
  mockMissions, mockInfluencers, mockProfiles, mockAnalyticsData
} from '@/data/adminMockData';

const metricIcons = [Users, Target, QrCode, Gift];

function formatValue(val: number) {
  if (val >= 1000000) return (val / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (val >= 1000) return (val / 1000).toFixed(1).replace('.0', '') + 'k';
  return val.toLocaleString('pt-BR');
}

function DemoBadge() {
  return (
    <Badge className="bg-accent/20 text-accent border-accent/40 text-[8px] px-1.5 py-0 font-black border rounded-none uppercase ml-2">
      DEMO
    </Badge>
  );
}

const AdminDashboard = () => {
  const [section, setSection] = useState('dashboard');
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { profile } = useProfile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      navigate('/home');
    }
  }, [roleLoading, isAdmin, navigate]);

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-bold">Verificando permissões...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const username = profile?.username || user?.email?.split('@')[0] || 'Admin';
  const initials = username.slice(0, 2).toUpperCase();
  const avatarUrl = profile?.avatar_url;

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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 ml-1 cursor-pointer">
                    <div className="w-8 h-8 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-black text-accent-foreground">{initials}</span>
                      )}
                    </div>
                    <div className="hidden md:block">
                      <p className="text-xs font-black leading-tight uppercase">{username}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">Administrador</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden md:block" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 border-[2px] border-border rounded-none">
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="gap-2 font-bold text-xs uppercase cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" /> Painel Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/influencer-dashboard')} className="gap-2 font-bold text-xs uppercase cursor-pointer">
                    <TrendingUp className="w-4 h-4" /> Painel Influencer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/home')} className="gap-2 font-bold text-xs uppercase cursor-pointer">
                    <UserCircle className="w-4 h-4" /> Painel Usuário
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="gap-2 font-bold text-xs uppercase cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4" /> Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {section === 'dashboard' && <DashboardSection />}
            {section === 'drops' && <DropsSection />}
            {section === 'qrcodes' && <QRCodesSection />}
            {section === 'missions' && <MissionsSection />}
            {section === 'influencers' && <InfluencersSection />}
            {section === 'profiles' && <ProfilesSection />}
            {section === 'analytics' && <AnalyticsSection />}
            {section === 'settings' && <SettingsSection />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// ---- Dashboard ----
function DashboardSection() {
  const { stats, drops, loading } = useAdminStats();
  const isEmpty = !loading && stats.totalUsers === 0 && stats.totalScans === 0;
  const displayStats = isEmpty ? mockAdminMetrics : stats;
  const displayDrops = isEmpty ? mockDrops : drops;

  const adminMetrics = [
    { label: 'USUÁRIOS ATIVOS', value: displayStats.totalUsers },
    { label: 'MISSÕES COMPLETAS', value: displayStats.totalMissions },
    { label: 'SCANS QR CODE', value: displayStats.totalScans },
    { label: 'DROPS RESGATADOS', value: displayStats.totalDropsClaimed },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h1 className="font-nunito text-2xl md:text-3xl font-black uppercase">DASHBOARD</h1>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 text-xs h-9 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> CRIAR CAMPANHA
        </Button>
      </div>

      <div className="space-y-6">
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

        {/* Engagement Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black uppercase flex items-center">
              Engajamento Mensal
              {isEmpty && <DemoBadge />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockEngagementChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ border: '2px solid hsl(var(--border))', borderRadius: 0, fontSize: 12, fontWeight: 700 }} />
                <Line type="monotone" dataKey="scans" stroke="hsl(var(--accent))" strokeWidth={3} name="Scans" />
                <Line type="monotone" dataKey="missoes" stroke="hsl(var(--primary))" strokeWidth={2} name="Missões" />
                <Line type="monotone" dataKey="drops" stroke="hsl(var(--destructive))" strokeWidth={2} name="Drops" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Drops table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black uppercase">Drops Ativos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DropsTable drops={displayDrops} loading={loading} />
          </CardContent>
        </Card>
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

// ---- Drops Section ----
function DropsSection() {
  const { drops, loading } = useAdminStats();
  const displayDrops = !loading && drops.length === 0 ? mockDrops : drops;
  const isEmpty = !loading && drops.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Campanhas & Drops</h2>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> CRIAR CAMPANHA
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <DropsTable drops={displayDrops} loading={loading} />
        </CardContent>
      </Card>
    </div>
  );
}

// ---- QR Codes Section ----
function QRCodesSection() {
  const [qrCodes, setQrCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('qr_codes').select('*, products(*), pharmacies(*)').limit(50);
      setQrCodes(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const isEmpty = !loading && qrCodes.length === 0;
  const displayData = isEmpty ? mockQRCodes : qrCodes.map(q => ({
    id: q.id, code: q.code, type: q.type, points_value: q.points_value,
    active: q.active, product: q.products?.name || '—', pharmacy: q.pharmacies?.name || '—',
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">QR Codes</h2>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> CRIAR QR CODE
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-3 px-6 py-2.5 border-b-[2px] border-border text-[10px] uppercase tracking-widest text-muted-foreground font-black">
                <div className="w-10 shrink-0" />
                <div className="flex-1">Código</div>
                <div className="min-w-[80px] text-center">Tipo</div>
                <div className="min-w-[80px] text-center">Pontos</div>
                <div className="min-w-[80px] text-center">Status</div>
              </div>
              <div className="divide-y-[2px] divide-border">
                {displayData.map((q: any) => (
                  <div key={q.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                    <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
                      <QrCode className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase truncate">{q.code}</p>
                      <p className="text-[11px] text-muted-foreground">{q.product} • {q.pharmacy}</p>
                    </div>
                    <div className="text-center shrink-0 hidden md:block min-w-[80px]">
                      <Badge className="text-[9px] px-1.5 py-0 font-black border-[2px] rounded-none uppercase bg-muted text-muted-foreground border-border">
                        {q.type}
                      </Badge>
                    </div>
                    <div className="text-center shrink-0 hidden md:block min-w-[80px]">
                      <p className="text-sm font-black">{q.points_value}</p>
                    </div>
                    <div className="shrink-0">
                      <DropStatusBadge status={q.active ? 'active' : 'ended'} label={q.active ? 'Ativo' : 'Inativo'} />
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

// ---- Missions Section ----
function MissionsSection() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('missions').select('*').order('created_at', { ascending: false });
      setMissions(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const isEmpty = !loading && missions.length === 0;
  const displayData = isEmpty ? mockMissions : missions;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Missões</h2>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> CRIAR MISSÃO
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>
          ) : (
            <div className="divide-y-[2px] divide-border">
              {displayData.map((m: any) => (
                <div key={m.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                  <div className="w-10 h-10 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border text-lg">
                    {m.icon || '🏆'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black uppercase">{m.title}</p>
                    <p className="text-[11px] text-muted-foreground">{m.description || 'Sem descrição'}</p>
                  </div>
                  <div className="shrink-0 hidden md:flex items-center gap-2">
                    <Badge className="text-[9px] px-1.5 py-0 font-black border-[2px] rounded-none uppercase bg-muted text-muted-foreground border-border">
                      {m.mission_type}
                    </Badge>
                    <span className="text-xs font-black text-accent">{m.reward_value} pts</span>
                  </div>
                  <div className="shrink-0">
                    <DropStatusBadge status={m.active ? 'active' : 'ended'} label={m.active ? 'Ativa' : 'Inativa'} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Influencers Section ----
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

  const isEmpty = !loading && influencers.length === 0;
  const displayData = isEmpty
    ? mockInfluencers.map(inf => ({
        id: inf.id,
        display_name: inf.display_name,
        commission_balance: inf.commission_balance,
        avatar_url: inf.avatar_url,
        profiles: { username: inf.username },
      }))
    : influencers;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Influenciadores</h2>
        {isEmpty && <DemoBadge />}
      </div>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>
          ) : (
            <div className="divide-y-[2px] divide-border">
              {displayData.map((inf: any) => {
                const profile = inf.profiles;
                const name = inf.display_name || profile?.username || 'Influenciador';
                const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
                const avatarUrl = inf.avatar_url;
                return (
                  <div key={inf.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                    <div className="w-9 h-9 bg-accent flex items-center justify-center border-[2px] border-border shrink-0 overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-black text-accent-foreground">{initials}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-black text-sm uppercase">{name}</span>
                      <p className="text-[10px] text-muted-foreground">Comissão: R$ {Number(inf.commission_balance || 0).toFixed(2)}</p>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 border-[2px] border-border bg-orange-400 text-foreground uppercase">Aprovar</span>
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

// ---- Profiles Section ----
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

  const isEmpty = !loading && profiles.length === 0;
  const displayData = isEmpty ? mockProfiles : profiles;

  const filtered = displayData.filter(p => {
    if (!searchTerm) return true;
    return (p.username || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Perfis</h2>
        {isEmpty && <DemoBadge />}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3 md:p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-accent flex items-center justify-center shrink-0 border-[2px] border-border">
              <Users className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Total</p>
              <p className="text-xl font-black">{loading ? '—' : displayData.length}</p>
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
                        <p className="text-sm font-black">{(profile.total_points || 0).toLocaleString('pt-BR')}</p>
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

// ---- Analytics Section ----
function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Analytics</h2>
        <DemoBadge />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Taxa de Conversão</p>
            <p className="text-3xl font-black text-accent mt-1">{mockAnalyticsData.conversionRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Tempo Médio</p>
            <p className="text-3xl font-black mt-1">{mockAnalyticsData.avgSessionTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Retenção</p>
            <p className="text-3xl font-black text-accent mt-1">{mockAnalyticsData.retentionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black uppercase">Usuários Ativos por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockAnalyticsData.dailyActiveUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 700 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ border: '2px solid hsl(var(--border))', borderRadius: 0, fontSize: 12, fontWeight: 700 }} />
              <Bar dataKey="users" fill="hsl(var(--accent))" name="Usuários" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black uppercase">Top Produtos Escaneados</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockAnalyticsData.topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fontWeight: 700 }} width={100} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ border: '2px solid hsl(var(--border))', borderRadius: 0, fontSize: 12, fontWeight: 700 }} />
              <Bar dataKey="scans" fill="hsl(var(--primary))" name="Scans" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Settings Section ----
function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Configurações</h2>
      <Card>
        <CardContent className="p-6">
          <EmptyState icon={Settings} title="Configurações" description="As configurações do sistema estarão disponíveis em breve." />
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
