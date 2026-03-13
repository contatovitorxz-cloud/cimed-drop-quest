import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminBottomNav } from '@/components/admin/AdminBottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Users, Target, QrCode, Gift, Plus, TrendingUp, Calendar, Bell,
  ChevronDown, MoreVertical, Pencil, Search, LogOut, LayoutDashboard,
  UserCircle, BarChart3, Settings, Check, Sun, Moon,
  DollarSign, ShoppingCart, Percent, CreditCard, X, SlidersHorizontal,
  ChevronLeft, ChevronRight, Download, Columns3, Wallet
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import EmptyState from '@/components/ui/empty-state';
import { supabase } from '@/integrations/supabase/client';
import { useAdminStats } from '@/hooks/useSupabaseData';
import { useUserRole } from '@/hooks/useUserRole';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  mockAdminMetrics, mockEngagementChart, mockDrops, mockQRCodes,
  mockMissions, mockInfluencers, mockProfiles, mockAnalyticsData,
  mockInfluencerSales, mockSalesOverview, mockSalesChart,
  mockSalesStatus, mockPaymentMethods, mockSalesTypes, mockTopOffers, mockSalesTransactions
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
              <button
                onClick={() => {
                  const isDark = document.documentElement.classList.toggle('dark');
                  localStorage.setItem('theme', isDark ? 'dark' : 'light');
                }}
                className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border-[2px] border-border bg-card"
              >
                <Sun className="w-4 h-4 hidden dark:block" />
                <Moon className="w-4 h-4 block dark:hidden" />
              </button>
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

          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 overflow-auto">
            {section === 'dashboard' && <DashboardSection />}
            {section === 'drops' && <DropsSection />}
            {section === 'qrcodes' && <QRCodesSection />}
            {section === 'missions' && <MissionsSection />}
            {section === 'influencers' && <InfluencersSection />}
            {section === 'profiles' && <ProfilesSection />}
            {section === 'analytics' && <AnalyticsSection />}
            {section === 'settings' && <SettingsSection />}
          </main>

          <AdminBottomNav activeSection={section} onSectionChange={setSection} />
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
  const [localDrops, setLocalDrops] = useState<any[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editDrop, setEditDrop] = useState<any>(null);

  useEffect(() => {
    if (!loading) {
      setLocalDrops(isEmpty ? [...mockDrops] : drops);
    }
  }, [loading, drops, isEmpty]);

  const adminMetrics = [
    { label: 'USUÁRIOS ATIVOS', value: displayStats.totalUsers },
    { label: 'MISSÕES COMPLETAS', value: displayStats.totalMissions },
    { label: 'SCANS QR CODE', value: displayStats.totalScans },
    { label: 'DROPS RESGATADOS', value: displayStats.totalDropsClaimed },
  ];

  const handleCreateDrop = (newDrop: any) => {
    setLocalDrops(prev => [newDrop, ...prev]);
    toast.success('Campanha criada com sucesso!');
  };

  const handleEditDrop = (updated: any) => {
    setLocalDrops(prev => prev.map(d => d.id === updated.id ? updated : d));
    toast.success('Campanha atualizada!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h1 className="font-nunito text-2xl md:text-3xl font-black uppercase">DASHBOARD</h1>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 text-xs h-9 w-full sm:w-auto" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4" /> CRIAR CAMPANHA
        </Button>
      </div>

      <div className="space-y-6">
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

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black uppercase">Drops Ativos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DropsTable drops={localDrops} loading={loading} onEdit={setEditDrop} />
          </CardContent>
        </Card>
      </div>

      <CreateDropDialog open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreateDrop} />
      <EditDropDialog drop={editDrop} onOpenChange={(open) => !open && setEditDrop(null)} onSave={handleEditDrop} />
    </div>
  );
}

function DropStatusBadge({ status, label }: { status: string; label?: string }) {
  const styles: Record<string, string> = {
    active: 'bg-accent text-accent-foreground border-border',
    ativo: 'bg-accent text-accent-foreground border-border',
    ended: 'bg-muted text-muted-foreground border-border',
    expired: 'bg-destructive/15 text-destructive border-destructive',
    approved: 'bg-accent text-accent-foreground border-border',
  };
  return (
    <Badge className={`${styles[status] || styles.active} text-[9px] px-1.5 py-0 font-black border-[2px] rounded-none uppercase`}>
      {label || status}
    </Badge>
  );
}

function DropsTable({ drops, loading, onEdit }: { drops: any[]; loading: boolean; onEdit?: (drop: any) => void }) {
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
              <p className="text-[11px] text-muted-foreground">{d.pharmacies?.name || d.pharmacy || 'Sem farmácia'}</p>
            </div>
            <div className="text-center shrink-0 hidden md:block min-w-[80px]">
              <p className="text-sm font-black">{d.quantity}</p>
            </div>
            <div className="shrink-0">
              <DropStatusBadge status={d.active ? 'active' : 'ended'} label={d.active ? 'Ativo' : 'Encerrado'} />
            </div>
            <div className="shrink-0 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => onEdit?.(d)}>
                <Pencil className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Create Drop Dialog ----
function CreateDropDialog({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (o: boolean) => void; onSave: (d: any) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('coupon');
  const [quantity, setQuantity] = useState('100');
  const [pharmacy, setPharmacy] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) { toast.error('Informe o título'); return; }
    onSave({
      id: crypto.randomUUID(),
      title, description, type,
      quantity: Number(quantity) || 100,
      active: true,
      pharmacies: { name: pharmacy || 'Sem farmácia' },
      products: { name: 'Produto Genérico' },
    });
    setTitle(''); setDescription(''); setType('coupon'); setQuantity('100'); setPharmacy('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[3px] border-border rounded-none max-w-md">
        <DialogHeader>
          <DialogTitle className="font-black uppercase text-lg">Criar Campanha</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Título *</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Vitamina C Drop" className="border-[2px] border-border rounded-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Descrição</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição da campanha..." className="border-[2px] border-border rounded-none min-h-[60px]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Tipo</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-[2px] border-border rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[2px] border-border rounded-none">
                  <SelectItem value="coupon">Cupom</SelectItem>
                  <SelectItem value="discount">Desconto</SelectItem>
                  <SelectItem value="free">Grátis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Quantidade</Label>
              <Input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="border-[2px] border-border rounded-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Farmácia</Label>
            <Input value={pharmacy} onChange={e => setPharmacy(e.target.value)} placeholder="Ex: Drogasil Centro" className="border-[2px] border-border rounded-none" />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="rounded-none gap-1.5">
            <Plus className="w-4 h-4" /> Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Edit Drop Dialog ----
function EditDropDialog({ drop, onOpenChange, onSave }: { drop: any; onOpenChange: (o: boolean) => void; onSave: (d: any) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (drop) {
      setTitle(drop.title || '');
      setDescription(drop.description || '');
      setQuantity(String(drop.quantity || 0));
      setActive(drop.active ?? true);
    }
  }, [drop]);

  const handleSubmit = () => {
    onSave({ ...drop, title, description, quantity: Number(quantity), active });
    onOpenChange(false);
  };

  return (
    <Dialog open={!!drop} onOpenChange={onOpenChange}>
      <DialogContent className="border-[3px] border-border rounded-none max-w-md">
        <DialogHeader>
          <DialogTitle className="font-black uppercase text-lg">Editar Drop</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Título</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} className="border-[2px] border-border rounded-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Descrição</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} className="border-[2px] border-border rounded-none min-h-[60px]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Quantidade</Label>
              <Input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="border-[2px] border-border rounded-none" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Status</Label>
              <Select value={active ? 'true' : 'false'} onValueChange={v => setActive(v === 'true')}>
                <SelectTrigger className="border-[2px] border-border rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[2px] border-border rounded-none">
                  <SelectItem value="true">Ativo</SelectItem>
                  <SelectItem value="false">Encerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="rounded-none gap-1.5">
            <Check className="w-4 h-4" /> Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Create QR Code Dialog ----
function CreateQRDialog({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (o: boolean) => void; onSave: (q: any) => void }) {
  const [code, setCode] = useState('');
  const [type, setType] = useState('checkin');
  const [points, setPoints] = useState('50');
  const [product, setProduct] = useState('');
  const [pharmacy, setPharmacy] = useState('');

  const handleSubmit = () => {
    if (!code.trim()) { toast.error('Informe o código'); return; }
    onSave({
      id: crypto.randomUUID(),
      code: code.toUpperCase(), type,
      points_value: Number(points) || 50,
      active: true, product: product || '—', pharmacy: pharmacy || '—',
    });
    setCode(''); setType('checkin'); setPoints('50'); setProduct(''); setPharmacy('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[3px] border-border rounded-none max-w-md">
        <DialogHeader>
          <DialogTitle className="font-black uppercase text-lg">Criar QR Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Código *</Label>
            <Input value={code} onChange={e => setCode(e.target.value)} placeholder="Ex: CIMED-VIT-C-006" className="border-[2px] border-border rounded-none uppercase" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Tipo</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="border-[2px] border-border rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[2px] border-border rounded-none">
                  <SelectItem value="checkin">Check-in</SelectItem>
                  <SelectItem value="purchase">Compra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Pontos</Label>
              <Input type="number" value={points} onChange={e => setPoints(e.target.value)} className="border-[2px] border-border rounded-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Produto</Label>
            <Input value={product} onChange={e => setProduct(e.target.value)} placeholder="Ex: Vitamina C 1000mg" className="border-[2px] border-border rounded-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Farmácia</Label>
            <Input value={pharmacy} onChange={e => setPharmacy(e.target.value)} placeholder="Ex: Drogasil Centro" className="border-[2px] border-border rounded-none" />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="rounded-none gap-1.5">
            <Plus className="w-4 h-4" /> Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Create Mission Dialog ----
function CreateMissionDialog({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (o: boolean) => void; onSave: (m: any) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [missionType, setMissionType] = useState('weekly');
  const [reward, setReward] = useState('100');
  const [icon, setIcon] = useState('🏆');

  const handleSubmit = () => {
    if (!title.trim()) { toast.error('Informe o título'); return; }
    onSave({
      id: crypto.randomUUID(),
      title, description, mission_type: missionType,
      reward_value: Number(reward) || 100,
      icon, active: true, progress: 0,
    });
    setTitle(''); setDescription(''); setMissionType('weekly'); setReward('100'); setIcon('🏆');
    onOpenChange(false);
  };

  const icons = ['🏆', '🗺️', '📱', '🎁', '⭐', '🔥', '💊', '🏃'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[3px] border-border rounded-none max-w-md">
        <DialogHeader>
          <DialogTitle className="font-black uppercase text-lg">Criar Missão</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Título *</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Explorador Semanal" className="border-[2px] border-border rounded-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Descrição</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição da missão..." className="border-[2px] border-border rounded-none min-h-[60px]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Tipo</Label>
              <Select value={missionType} onValueChange={setMissionType}>
                <SelectTrigger className="border-[2px] border-border rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-[2px] border-border rounded-none">
                  <SelectItem value="daily">Diária</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-black uppercase">Recompensa (pts)</Label>
              <Input type="number" value={reward} onChange={e => setReward(e.target.value)} className="border-[2px] border-border rounded-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase">Ícone</Label>
            <div className="flex gap-2 flex-wrap">
              {icons.map(ic => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`w-10 h-10 text-lg flex items-center justify-center border-[2px] transition-all ${icon === ic ? 'border-accent bg-accent/20 scale-110' : 'border-border bg-muted/50 hover:bg-muted'}`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="rounded-none gap-1.5">
            <Plus className="w-4 h-4" /> Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---- Drops Section ----
function DropsSection() {
  const { drops, loading } = useAdminStats();
  const [localDrops, setLocalDrops] = useState<any[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editDrop, setEditDrop] = useState<any>(null);
  const isEmpty = !loading && drops.length === 0;

  useEffect(() => {
    if (!loading) {
      setLocalDrops(isEmpty ? [...mockDrops] : drops);
    }
  }, [loading, drops, isEmpty]);

  const handleCreate = (d: any) => {
    setLocalDrops(prev => [d, ...prev]);
    toast.success('Campanha criada com sucesso!');
  };

  const handleEdit = (d: any) => {
    setLocalDrops(prev => prev.map(x => x.id === d.id ? d : x));
    toast.success('Campanha atualizada!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Campanhas & Drops</h2>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 w-full sm:w-auto" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4" /> CRIAR CAMPANHA
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <DropsTable drops={localDrops} loading={loading} onEdit={setEditDrop} />
        </CardContent>
      </Card>
      <CreateDropDialog open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
      <EditDropDialog drop={editDrop} onOpenChange={(o) => !o && setEditDrop(null)} onSave={handleEdit} />
    </div>
  );
}

// ---- QR Codes Section ----
function QRCodesSection() {
  const [qrCodes, setQrCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('qr_codes').select('*, products(*), pharmacies(*)').limit(50);
      setQrCodes(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const isEmpty = !loading && qrCodes.length === 0;
  const [localData, setLocalData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) {
      setLocalData(
        isEmpty
          ? [...mockQRCodes]
          : qrCodes.map(q => ({
              id: q.id, code: q.code, type: q.type, points_value: q.points_value,
              active: q.active, product: q.products?.name || '—', pharmacy: q.pharmacies?.name || '—',
            }))
      );
    }
  }, [loading, qrCodes, isEmpty]);

  const handleCreate = (q: any) => {
    setLocalData(prev => [q, ...prev]);
    toast.success('QR Code criado com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">QR Codes</h2>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 w-full sm:w-auto" onClick={() => setCreateOpen(true)}>
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
                {localData.map((q: any) => (
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
      <CreateQRDialog open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
    </div>
  );
}

// ---- Missions Section ----
function MissionsSection() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('missions').select('*').order('created_at', { ascending: false });
      setMissions(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const isEmpty = !loading && missions.length === 0;
  const [localData, setLocalData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) {
      setLocalData(isEmpty ? [...mockMissions] : missions);
    }
  }, [loading, missions, isEmpty]);

  const handleCreate = (m: any) => {
    setLocalData(prev => [m, ...prev]);
    toast.success('Missão criada com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Gestão de Missões</h2>
          {isEmpty && <DemoBadge />}
        </div>
        <Button className="gap-1.5 w-full sm:w-auto" onClick={() => setCreateOpen(true)}>
          <Plus className="w-4 h-4" /> CRIAR MISSÃO
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>
          ) : (
            <div className="divide-y-[2px] divide-border">
              {localData.map((m: any) => (
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
      <CreateMissionDialog open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
    </div>
  );
}

// ---- Influencer Profile Dialog ----
function InfluencerProfileDialog({ influencer, open, onOpenChange, onApprove }: {
  influencer: any | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onApprove: (id: string) => void;
}) {
  if (!influencer) return null;
  const inf = influencer._raw || influencer;
  const name = inf.display_name || 'Influenciador';
  const isApproved = influencer.status === 'approved';

  const formatFollowers = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'k';
    return String(n);
  };

  const socials = [
    { label: 'Instagram', handle: inf.instagram, followers: inf.instagram_followers, color: 'bg-pink-500' },
    { label: 'TikTok', handle: inf.tiktok, followers: inf.tiktok_followers, color: 'bg-foreground' },
    { label: 'YouTube', handle: inf.youtube, followers: inf.youtube_followers, color: 'bg-red-500' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-[3px] border-border bg-background p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-accent/10 p-6 flex flex-col items-center gap-3 border-b-[3px] border-border">
          <div className="w-20 h-20 bg-accent border-[3px] border-border overflow-hidden flex items-center justify-center">
            {inf.avatar_url ? (
              <img src={inf.avatar_url} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-black text-accent-foreground">
                {name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="text-center">
            <h3 className="font-black text-lg uppercase">{name}</h3>
            <p className="text-xs text-muted-foreground font-bold">@{inf.username}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-accent text-accent-foreground border-[2px] border-border rounded-none font-black text-xs px-2">
              {inf.niche || 'Influenciador'}
            </Badge>
            {isApproved ? (
              <Badge className="bg-green-500 text-white border-[2px] border-border rounded-none font-black text-xs px-2">
                ✓ APROVADO
              </Badge>
            ) : (
              <Badge className="bg-orange-400 text-foreground border-[2px] border-border rounded-none font-black text-xs px-2">
                PENDENTE
              </Badge>
            )}
          </div>
        </div>

        {/* Total followers */}
        <div className="px-6 pt-4 pb-2 text-center">
          <p className="text-3xl font-black text-accent">{formatFollowers(inf.followers_total || 0)}+</p>
          <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Seguidores totais</p>
        </div>

        {/* Social breakdown */}
        <div className="px-6 pb-3 grid grid-cols-3 gap-2">
          {socials.map(s => (
            <div key={s.label} className="border-[2px] border-border p-2 text-center">
              <p className="text-xs font-black uppercase text-muted-foreground">{s.label}</p>
              <p className="text-lg font-black">{formatFollowers(s.followers || 0)}</p>
              <p className="text-[9px] text-muted-foreground truncate">{s.handle}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="px-6 pb-4 grid grid-cols-3 gap-2">
          <div className="border-[2px] border-border p-2 text-center bg-accent/5">
            <p className="text-lg font-black">{inf.drops_created || 0}</p>
            <p className="text-[9px] uppercase font-black text-muted-foreground">Drops</p>
          </div>
          <div className="border-[2px] border-border p-2 text-center bg-accent/5">
            <p className="text-lg font-black">{formatFollowers(inf.claims || 0)}</p>
            <p className="text-[9px] uppercase font-black text-muted-foreground">Resgates</p>
          </div>
          <div className="border-[2px] border-border p-2 text-center bg-accent/5">
            <p className="text-lg font-black">R$ {Number(inf.commission_balance || 0).toFixed(0)}</p>
            <p className="text-[9px] uppercase font-black text-muted-foreground">Comissão</p>
          </div>
        </div>

        {/* Approve button */}
        {!isApproved && (
          <div className="px-6 pb-5">
            <Button
              className="w-full"
              onClick={() => { onApprove(influencer.id); onOpenChange(false); }}
            >
              <Check className="w-4 h-4 mr-1" /> Aprovar Influenciador
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ---- Sales Gateway Section ----
function SalesGatewaySection() {
  const metrics = [
    { label: 'RECEITA TOTAL', value: `R$ ${(mockSalesOverview.receitaTotal / 1000).toFixed(0)}k`, icon: DollarSign, accent: true },
    { label: 'VENDAS INFLUENCER', value: formatValue(mockSalesOverview.vendasInfluencer), icon: TrendingUp },
    { label: 'VENDAS ORGÂNICAS', value: formatValue(mockSalesOverview.vendasOrganicas), icon: ShoppingCart },
    { label: 'TAXA CONVERSÃO', value: `${mockSalesOverview.taxaConversao}%`, icon: Percent },
  ];

  const maxReceita = Math.max(...mockInfluencerSales.map(s => s.receita));

  return (
    <div className="space-y-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label}>
              <CardContent className="p-3 md:p-4 flex items-start gap-3">
                <div className={`w-10 h-10 flex items-center justify-center shrink-0 border-[2px] border-border ${m.accent ? 'bg-accent' : 'bg-muted'}`}>
                  <Icon className={`w-5 h-5 ${m.accent ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest leading-tight font-black">{m.label}</p>
                  <p className="text-lg md:text-xl font-black leading-tight mt-1">{m.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
            Orgânico vs Influencer
            <DemoBadge />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockSalesChart} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ border: '2px solid hsl(var(--border))', borderRadius: 0, fontSize: 12, fontWeight: 700 }} />
              <Bar dataKey="organico" fill="hsl(var(--muted-foreground))" name="Orgânico" radius={[0, 0, 0, 0]} />
              <Bar dataKey="influencer" fill="hsl(var(--accent))" name="Influencer" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ranking Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black uppercase">Ranking de Vendas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="hidden md:flex items-center gap-3 px-6 py-2.5 border-b-[2px] border-border text-[10px] uppercase tracking-widest text-muted-foreground font-black">
            <div className="w-6 text-center">#</div>
            <div className="w-8" />
            <div className="flex-1">Influenciador</div>
            <div className="min-w-[70px] text-right">Vendas</div>
            <div className="min-w-[90px] text-right">Receita</div>
            <div className="min-w-[80px] text-right">Comissão</div>
            <div className="min-w-[60px] text-right">Conv.</div>
          </div>
          <div className="divide-y-[2px] divide-border">
            {mockInfluencerSales.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all">
                <div className={`w-6 h-6 flex items-center justify-center shrink-0 text-xs font-black border-[2px] border-border ${i === 0 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {i + 1}
                </div>
                <div className="w-8 h-8 bg-accent border-[2px] border-border shrink-0 overflow-hidden flex items-center justify-center">
                  {s.avatar_url ? (
                    <img src={s.avatar_url} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-black text-accent-foreground">{s.name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black uppercase truncate">{s.name}</p>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-muted mt-1 hidden md:block">
                    <div className="h-full bg-accent" style={{ width: `${(s.receita / maxReceita) * 100}%` }} />
                  </div>
                </div>
                <div className="min-w-[70px] text-right">
                  <p className="text-sm font-black">{formatValue(s.vendas)}</p>
                </div>
                <div className="min-w-[90px] text-right hidden md:block">
                  <p className="text-sm font-black">R$ {(s.receita / 1000).toFixed(1)}k</p>
                </div>
                <div className="min-w-[80px] text-right hidden md:block">
                  <p className="text-xs font-bold text-accent">R$ {formatValue(Math.round(s.comissao))}</p>
                </div>
                <div className="min-w-[60px] text-right">
                  <Badge className="text-[9px] px-1.5 py-0 font-black border-[2px] rounded-none uppercase bg-accent/15 text-accent border-accent/30">
                    {s.conversao}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---- Influencers Section ----
function InfluencersSection() {
  const [subTab, setSubTab] = useState<'gestao' | 'vendas'>('gestao');
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInfluencer, setSelectedInfluencer] = useState<any | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

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
  const [localData, setLocalData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading) {
      setLocalData(
        isEmpty
          ? mockInfluencers.map(inf => ({
              id: inf.id,
              display_name: inf.display_name,
              commission_balance: inf.commission_balance,
              avatar_url: inf.avatar_url,
              profiles: { username: inf.username },
              status: inf.status || 'pending',
              _raw: inf,
            }))
          : influencers.map(inf => ({ ...inf, status: 'pending', _raw: inf }))
      );
    }
  }, [loading, influencers, isEmpty]);

  const handleApprove = (id: string) => {
    setLocalData(prev =>
      prev.map(inf => inf.id === id ? { ...inf, status: 'approved' } : inf)
    );
    toast.success('Influenciador aprovado com sucesso!');
  };

  const openProfile = (inf: any) => {
    setSelectedInfluencer(inf);
    setProfileOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center">
          <h2 className="font-nunito text-xl md:text-2xl font-black uppercase">Influenciadores</h2>
          {isEmpty && <DemoBadge />}
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setSubTab('gestao')}
          className={`px-4 py-2 text-xs font-black uppercase border-[2px] border-border transition-all ${
            subTab === 'gestao' ? 'bg-accent text-accent-foreground shadow-[3px_3px_0_hsl(var(--border))]' : 'bg-card text-muted-foreground hover:bg-muted'
          }`}
        >
          Gestão
        </button>
        <button
          onClick={() => setSubTab('vendas')}
          className={`px-4 py-2 text-xs font-black uppercase border-[2px] border-border transition-all ${
            subTab === 'vendas' ? 'bg-accent text-accent-foreground shadow-[3px_3px_0_hsl(var(--border))]' : 'bg-card text-muted-foreground hover:bg-muted'
          }`}
        >
          Relatório de Vendas
        </button>
      </div>

      {subTab === 'vendas' ? (
        <SalesGatewaySection />
      ) : (
        <>
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="p-6 text-center text-sm text-muted-foreground">Carregando...</div>
              ) : (
                <div className="divide-y-[2px] divide-border">
                  {localData.map((inf: any) => {
                    const profile = inf.profiles;
                    const name = inf.display_name || profile?.username || 'Influenciador';
                    const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
                    const avatarUrl = inf.avatar_url;
                    const isApproved = inf.status === 'approved';
                    return (
                      <div
                        key={inf.id}
                        className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-accent/10 transition-all cursor-pointer"
                        onClick={() => openProfile(inf)}
                      >
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
                        {isApproved ? (
                          <DropStatusBadge status="approved" label="Aprovado" />
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleApprove(inf.id); }}
                            className="text-[9px] font-black px-2 py-0.5 border-[2px] border-border bg-accent/60 text-foreground uppercase hover:bg-accent transition-colors cursor-pointer"
                          >
                            Aprovar
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          <InfluencerProfileDialog
            influencer={selectedInfluencer}
            open={profileOpen}
            onOpenChange={setProfileOpen}
            onApprove={handleApprove}
          />
        </>
      )}
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
