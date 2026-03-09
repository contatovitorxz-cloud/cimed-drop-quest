import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Wallet, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import cimedSymbol from '@/assets/cimed-symbol.png';

const InfluencerProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState('');
  const [pixKeyType, setPixKeyType] = useState('cpf');
  const [pixKey, setPixKey] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [commissionBalance, setCommissionBalance] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initials = (displayName || user?.email?.split('@')[0] || 'U').slice(0, 1).toUpperCase();

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    const { data: profile } = await supabase.from('profiles').select('avatar_url, username').eq('id', user.id).single();
    if (profile) { setAvatarUrl(profile.avatar_url); setDisplayName(profile.username || ''); }
    const { data: settings } = await supabase.from('influencer_settings').select('*').eq('user_id', user.id).single();
    if (settings) {
      setPixKeyType(settings.pix_key_type || 'cpf');
      setPixKey(settings.pix_key || '');
      setCommissionBalance(Number(settings.commission_balance) || 0);
      if (settings.display_name) setDisplayName(settings.display_name);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const filePath = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (uploadError) { toast({ title: 'Erro ao enviar foto', description: uploadError.message, variant: 'destructive' }); return; }
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const { error: updateError } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
      if (updateError) { toast({ title: 'Erro ao salvar URL', description: updateError.message, variant: 'destructive' }); return; }
      setAvatarUrl(publicUrl + '?t=' + Date.now());
      toast({ title: 'Foto atualizada!' });
    } catch { toast({ title: 'Erro inesperado ao enviar foto', variant: 'destructive' }); }
    finally { setUploading(false); }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from('profiles').update({ username: displayName }).eq('id', user.id);
    const { error } = await supabase.from('influencer_settings').upsert({
      user_id: user.id, display_name: displayName, pix_key_type: pixKeyType, pix_key: pixKey, updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
    setSaving(false);
    if (error) { toast({ title: 'Erro ao salvar', description: error.message, variant: 'destructive' }); }
    else { toast({ title: 'Perfil salvo com sucesso!' }); }
  };

  const pixKeyTypeLabels: Record<string, string> = { cpf: 'CPF', email: 'E-mail', phone: 'Telefone', random: 'Chave Aleatória' };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-header px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-md animate-glow-breathe" />
              <img src={cimedSymbol} alt="Cimed" className="relative w-7 h-7" />
            </div>
            <span className="text-sm font-bold">Cimed GO</span>
          </div>
          <button onClick={() => navigate('/influencer-dashboard')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-6 pt-6 stagger-children">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="avatar-ring w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-card">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-accent">{initials}</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-yellow flex items-center justify-center text-accent-foreground shadow-lg shadow-accent/30"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>
          <p className="text-xs text-muted-foreground">{uploading ? 'Enviando...' : 'Toque para alterar a foto'}</p>
        </div>

        {/* Name */}
        <Card className="glass-card glow-border-hover shadow-depth border-0">
          <CardContent className="p-4 space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-widest">Nome de exibição</Label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Seu nome" className="bg-background/50 border-border/50" />
          </CardContent>
        </Card>

        {/* PIX Settings */}
        <Card className="glass-card glow-border-hover shadow-depth border-0">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm font-bold">Configuração PIX</span>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-widest">Tipo de chave</Label>
              <Select value={pixKeyType} onValueChange={setPixKeyType}>
                <SelectTrigger className="bg-background/50 border-border/50"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="random">Chave Aleatória</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-widest">Chave PIX</Label>
              <Input value={pixKey} onChange={(e) => setPixKey(e.target.value)} placeholder={`Digite seu ${pixKeyTypeLabels[pixKeyType]}`} className="bg-background/50 border-border/50" />
            </div>
          </CardContent>
        </Card>

        {/* Commission Balance */}
        <Card className="glass-card glow-border shadow-depth border-0">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-yellow flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-bold">Comissão</span>
            </div>
            <div className="text-center py-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Saldo disponível</p>
              <p className="text-3xl font-extrabold text-gradient-orange">
                R$ {commissionBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300" disabled={commissionBalance <= 0}>
              Solicitar Saque
            </Button>
          </CardContent>
        </Card>

        {/* Save */}
        <Button onClick={handleSave} disabled={saving} className="w-full h-14 text-base font-bold gradient-yellow text-accent-foreground rounded-xl shadow-lg shadow-accent/20 hover:opacity-90 transition-all duration-300 shimmer-btn">
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </div>
  );
};

export default InfluencerProfile;
