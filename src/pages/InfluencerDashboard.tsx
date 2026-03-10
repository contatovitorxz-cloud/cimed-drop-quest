import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, MousePointerClick, ShoppingBag, Plus, QrCode, Megaphone, X, TrendingUp, TrendingDown, Sun, Moon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import cimedSymbol from '@/assets/cimed-symbol.png';

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState('7d');
  const [stats, setStats] = useState({ dropsCount: 0, totalClaims: 0, totalRemaining: 0 });
  const [drops, setDrops] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

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
    const fetch = async () => {
      // Get influencer drops
      const { data: dropsData } = await supabase
        .from('influencer_drops')
        .select('*, products(*)')
        .eq('influencer_id', user.id)
        .order('created_at', { ascending: false });

      const myDrops = dropsData || [];
      setDrops(myDrops);

      // Count claims for their drops
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

      // Get settings
      const { data: settingsData } = await supabase
        .from('influencer_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setSettings(settingsData);
    };
    fetch();
  }, [user]);

  const username = settings?.display_name || user?.user_metadata?.username || user?.email?.split('@')[0] || 'Creator';
  const initials = username.slice(0, 1).toUpperCase();

  const metrics = [
    { icon: Eye, label: 'Drops Criados', value: stats.dropsCount, change: 0 },
    { icon: MousePointerClick, label: 'Resgates', value: stats.totalClaims, change: 0 },
    { icon: ShoppingBag, label: 'Restantes', value: stats.totalRemaining, change: 0 },
  ];

  // Generate performance data from drops
  const perfData = drops.slice(0, 7).reverse().map((d, i) => ({
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
            <span className="font-nunito text-sm font-black">CIMED GO</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsDark(!isDark)} className="p-2 border-[2px] border-border hover:bg-accent hover:text-accent-foreground transition-all" aria-label="Alternar tema">
              {isDark ? <Sun className="w-5 h-5" strokeWidth={2} /> : <Moon className="w-5 h-5" strokeWidth={2} />}
            </button>
            <button onClick={() => navigate('/influencer-profile')} className="w-9 h-9 bg-accent flex items-center justify-center text-sm font-black text-accent-foreground border-[2px] border-border">
              {initials}
            </button>
            <button onClick={() => navigate('/home')} className="p-2 border-[2px] border-border hover:bg-accent hover:text-accent-foreground transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-5 pt-4">
        <div>
          <h2 className="font-nunito text-2xl font-black uppercase">
            BEM-VINDO, <span className="text-accent">{username.toUpperCase()}</span>!
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5 font-bold">Crie drops e campanhas para a Cimed.</p>
          {settings?.commission_balance != null && (
            <p className="text-xs text-accent font-black mt-1">Saldo: R$ {Number(settings.commission_balance).toFixed(2)}</p>
          )}
        </div>

        <Button className="w-full h-14 text-base gap-2">
          <Plus className="w-5 h-5" /> CRIAR DROP
        </Button>

        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-10 h-10 bg-accent mx-auto flex items-center justify-center border-[2px] border-border">
                  <m.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">{m.label}</p>
                <p className="text-xl font-black">{m.value.toLocaleString('pt-BR')}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* My Drops */}
        {drops.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black uppercase">Meus Drops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {drops.slice(0, 5).map(d => (
                <div key={d.id} className="flex items-center gap-3 p-2 border-[2px] border-border">
                  <div className="w-8 h-8 bg-accent flex items-center justify-center border-[2px] border-border shrink-0">
                    <Megaphone className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black uppercase truncate">{d.title}</p>
                    <p className="text-[10px] text-muted-foreground">{d.remaining_quantity}/{d.total_quantity} restantes</p>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 border-[2px] border-border ${d.active ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {d.active ? 'ATIVO' : 'ENCERRADO'}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 bg-accent flex items-center justify-center border-[2px] border-border">
                <Megaphone className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-black text-sm uppercase">Campanhas</h3>
              <p className="text-xs text-muted-foreground">Gerencie suas campanhas.</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
            <CardContent className="p-4 space-y-2">
              <div className="w-10 h-10 bg-accent flex items-center justify-center border-[2px] border-border">
                <QrCode className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-black text-sm uppercase">Meus QR Codes</h3>
              <p className="text-xs text-muted-foreground">Ver e gerenciar QR Codes ativos.</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
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
    </div>
  );
};

export default InfluencerDashboard;
