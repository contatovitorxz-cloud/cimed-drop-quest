import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Wallet, DollarSign } from 'lucide-react';
import BottomNav from '@/components/layout/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AppHeader from '@/components/layout/AppHeader';

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
      <AppHeader />

      <div className="px-4 pb-8 space-y-5 pt-20">
        {/* Back button */}
        <button
          onClick={() => navigate('/influencer-dashboard')}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <h2 className="font-nunito text-2xl font-black uppercase tracking-tight">Meu Perfil</h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 border-[3px] border-border bg-card overflow-hidden flex items-center justify-center shadow-[4px_4px_0_hsl(var(--border))]">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-black text-accent">{initials}</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent border-[2px] border-border flex items-center justify-center shadow-[2px_2px_0_hsl(var(--border))] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              <Camera className="w-4 h-4 text-accent-foreground" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            {uploading ? 'Enviando...' : 'Toque para alterar'}
          </p>
        </div>

        {/* Name */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Nome de exibição</Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Seu nome"
              className="border-[3px] border-border bg-background"
            />
          </CardContent>
        </Card>

        {/* PIX Settings */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent border-[2px] border-border flex items-center justify-center">
                <Wallet className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-black uppercase tracking-wider">Configuração PIX</span>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tipo de chave</Label>
              <Select value={pixKeyType} onValueChange={setPixKeyType}>
                <SelectTrigger className="border-[3px] border-border bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="phone">Telefone</SelectItem>
                  <SelectItem value="random">Chave Aleatória</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Chave PIX</Label>
              <Input
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                placeholder={`Digite seu ${pixKeyTypeLabels[pixKeyType]}`}
                className="border-[3px] border-border bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Commission Balance */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent border-[2px] border-border flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-black uppercase tracking-wider">Comissão</span>
            </div>
            <div className="text-center py-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Saldo disponível</p>
              <p className="text-3xl font-black text-accent">
                R$ {commissionBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Button variant="outline" className="w-full" disabled={commissionBalance <= 0}>
              Solicitar Saque
            </Button>
          </CardContent>
        </Card>

        {/* Save */}
        <Button onClick={handleSave} disabled={saving} className="w-full h-14 text-base">
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </div>
  );
};

export default InfluencerProfile;
