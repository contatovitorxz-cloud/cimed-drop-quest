import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MousePointerClick, ShoppingBag, Plus, QrCode, Megaphone, TrendingUp, UserCircle, LayoutDashboard, LogOut, Sun, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import cimedSymbol from '@/assets/cimed-symbol.png';
import InfluencerBottomNav from '@/components/layout/InfluencerBottomNav';
import CimedWordmark from '@/assets/cimed-wordmark.svg?react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

// Mock data for demo
const mockDrops = [
  { id: '1', title: 'Vitamina C Drop', remaining_quantity: 18, total_quantity: 50, active: true },
  { id: '2', title: 'Kit Protetor Solar', remaining_quantity: 5, total_quantity: 30, active: true },
  { id: '3', title: 'Desconto Lavitan', remaining_quantity: 0, total_quantity: 100, active: false },
  { id: '4', title: 'Promoção Cimed Care', remaining_quantity: 42, total_quantity: 80, active: true },
  { id: '5', title: 'Drop Exclusivo Verão', remaining_quantity: 93, total_quantity: 200, active: true },
];
const mockPerfData = [
  { day: 'Seg', total: 50, restante: 38 },
  { day: 'Ter', total: 30, restante: 22 },
  { day: 'Qua', total: 80, restante: 55 },
  { day: 'Qui', total: 100, restante: 60 },
  { day: 'Sex', total: 200, restante: 93 },
  { day: 'Sáb', total: 45, restante: 30 },
  { day: 'Dom', total: 70, restante: 42 },
];
const mockStats = { dropsCount: 12, totalClaims: 340, totalRemaining: 158 };
const mockBalance = 1250.50;

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { isAdmin } = useUserRole();
  const [stats, setStats] = useState({ dropsCount: 0, totalClaims: 0, totalRemaining: 0 });
  const [drops, setDrops] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [isDemo, setIsDemo] = useState(false);

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data: dropsData } = await supabase
        .from('influencer_drops')
        .select('*, products(*)')
        .eq('influencer_id', user.id)
        .order('created_at', { ascending: false });

      const myDrops = dropsData || [];

      if (myDrops.length === 0) {
        setIsDemo(true);
        setDrops(mockDrops);
        setStats(mockStats);
        setSettings({ commission_balance: mockBalance });
        return;
      }

      setDrops(myDrops);
      const dropIds = myDrops.map(d => d.id);
      let claimsCount = 0;
      if (dropIds.length > 0) {
        const { count } = await supabase
          .from('drop_claims')
          .select('*', { count: 'exact', head: true })
          .in('drop_id', dropIds);
        claimsCount = count || 0;
      }
      setStats({
        dropsCount: myDrops.length,
        totalClaims: claimsCount,
        totalRemaining: myDrops.reduce((sum, d) => sum + d.remaining_quantity, 0),
      });

      const { data: settingsData } = await supabase
        .from('influencer_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setSettings(settingsData);
    };
    fetchData();
  }, [user]);

  const username = settings?.display_name || profile?.username || user?.user_metadata?.username || user?.email?.split('@')[0] || 'Creator';
  const initials = username.slice(0, 2).toUpperCase();
  const avatarUrl = profile?.avatar_url;
  const balance = settings?.commission_balance ?? (isDemo ? mockBalance : 0);

  const metrics = [
    { icon: Eye, label: 'Drops Criados', value: stats.dropsCount },
    { icon: MousePointerClick, label: 'Resgates', value: stats.totalClaims },
    { icon: ShoppingBag, label: 'Restantes', value: stats.totalRemaining },
  ];

  const perfData = isDemo
    ? mockPerfData
    : drops.slice(0, 7).reverse().map((d, i) => ({
        day: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i % 7],
        total: d.total_quantity,
        restante: d.remaining_quantity,
      }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-30 brutal-header px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={cimedSymbol} alt="Cimed" className="w-7 h-7" />
            <CimedWordmark className="h-4 w-auto text-foreground" />
            <span className="font-nunito text-accent text-sm font-black">GO</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsDark(!isDark)} className="p-2 border-[2px] border-border/50 hover:bg-accent hover:text-accent-foreground transition-all" aria-label="Alternar tema">
              {isDark ? <Sun className="w-5 h-5" strokeWidth={2} /> : <Moon className="w-5 h-5" strokeWidth={2} />}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-9 h-9 bg-accent flex items-center justify-center text-sm font-black text-accent-foreground border-[2px] border-border overflow-hidden cursor-pointer">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 border-[2px] border-border rounded-none">
                <DropdownMenuItem onClick={() => navigate('/home')} className="gap-2 font-bold text-xs uppercase cursor-pointer">
                  <UserCircle className="w-4 h-4" /> Painel Usuário
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/influencer-dashboard')} className="gap-2 font-bold text-xs uppercase cursor-pointer">
                  <TrendingUp className="w-4 h-4" /> Painel Influencer
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')} className="gap-2 font-bold text-xs uppercase cursor-pointer">
                    <LayoutDashboard className="w-4 h-4" /> Painel Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="gap-2 font-bold text-xs uppercase cursor-pointer text-destructive">
                  <LogOut className="w-4 h-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-5 pt-4">

        <div>
          <h2 className="font-nunito text-2xl font-black uppercase">
            BEM-VINDO, <span className="text-accent">{username.toUpperCase()}</span>!
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5 font-bold">Crie drops e campanhas para a Cimed.</p>
          <p className="text-xs text-accent font-black mt-1">Saldo: R$ {Number(balance).toFixed(2)}</p>
        </div>

        <Button className="w-full h-14 text-base gap-2">
          <Plus className="w-5 h-5" /> CRIAR DROP
        </Button>

        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-10 h-10 bg-accent/20 dark:bg-accent/10 mx-auto flex items-center justify-center border-[2px] border-border/30 dark:border-[hsl(0,0%,25%)]">
                  <m.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">{m.label}</p>
                <p className="text-xl font-black">{m.value.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black uppercase">Meus Drops</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {drops.slice(0, 5).map(d => (
              <div key={d.id} className="flex items-center gap-3 p-2 border-[2px] border-border/30 dark:bg-muted/50 dark:border-border/10">
                <div className="w-8 h-8 bg-accent/20 dark:bg-accent/10 flex items-center justify-center shrink-0">
                  <Megaphone className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase truncate">{d.title}</p>
                  <p className="text-[10px] text-muted-foreground">{d.remaining_quantity}/{d.total_quantity} restantes</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 border-[2px] border-border dark:border-border/20 ${d.active ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {d.active ? 'ATIVO' : 'ENCERRADO'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 bg-accent/20 dark:bg-accent/15 flex items-center justify-center border-[2px] border-border/30">
                <Megaphone className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-black text-sm uppercase">Campanhas</h3>
              <p className="text-xs text-muted-foreground">Gerencie suas campanhas.</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 bg-accent/20 dark:bg-accent/15 flex items-center justify-center border-[2px] border-border/30">
                <QrCode className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-black text-sm uppercase">Meus QR Codes</h3>
              <p className="text-xs text-muted-foreground">Ver e gerenciar QR Codes ativos.</p>
            </CardContent>
          </Card>
        </div>

        {perfData.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase">Análise de Drops</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={perfData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '3px solid hsl(var(--border))', borderRadius: 0, fontSize: 12, color: 'hsl(var(--foreground))', boxShadow: '4px 4px 0 hsl(var(--border))' }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="total" stroke="hsl(50,100%,50%)" strokeWidth={2.5} dot={false} name="Total" />
                    <Line type="monotone" dataKey="restante" stroke="hsl(25,100%,50%)" strokeWidth={2} dot={false} name="Restante" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <InfluencerBottomNav />
    </div>
  );
};

export default InfluencerDashboard;
