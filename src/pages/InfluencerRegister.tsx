import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import cimedSymbol from '@/assets/cimed-symbol.png';
import { ArrowLeft, Mail } from 'lucide-react';

const followerRanges = [
  'Menos de 1.000',
  '1.000 - 10.000',
  '10.000 - 50.000',
  '50.000 - 100.000',
  '100.000 - 500.000',
  '500.000 - 1M',
  '1M - 5M',
  '5M+',
];

const platforms = ['TikTok', 'Instagram', 'YouTube', 'Kwai'];

const InfluencerRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [form, setForm] = useState({
    name: '',
    age: '',
    cpf: '',
    instagram: '',
    phone: '',
    city: '',
    followers: '',
    platforms: [] as string[],
    niche: '',
    reason: '',
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const togglePlatform = (p: string) => {
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(p)
        ? f.platforms.filter(x => x !== p)
        : [...f.platforms, p],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Inscrição enviada!', description: 'Entraremos em contato em breve.' });
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FFD400] shrink-0">
        <div className="flex items-center gap-1">
          <button onClick={() => navigate('/login')} className="mr-2">
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <img src={cimedSymbol} alt="Cimed" className="w-8 h-8 object-contain" />
          <span className="text-lg font-black text-black tracking-tight font-['Nunito']">CIMEDGO</span>
        </div>
        <button className="flex items-center gap-1 text-sm font-semibold text-black bg-black/10 hover:bg-black/20 rounded-lg px-3 py-1.5 transition-colors">
          <Mail className="w-4 h-4" />
          Contato
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
        <h1 className="text-xl font-black text-black font-['Nunito'] mb-1">Inscrição Influencer</h1>
        <p className="text-sm text-black/60 font-['Nunito'] mb-4">Preencha seus dados para participar do programa.</p>

        <Input placeholder="Nome completo" value={form.name} onChange={e => update('name', e.target.value)}
          required className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />

        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Idade" type="number" value={form.age} onChange={e => update('age', e.target.value)}
            required className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />
          <Input placeholder="CPF" value={form.cpf} onChange={e => update('cpf', e.target.value)}
            required className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />
        </div>

        <Input placeholder="@ do Instagram" value={form.instagram} onChange={e => update('instagram', e.target.value)}
          required className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />

        <Input placeholder="Contato / Telefone" value={form.phone} onChange={e => update('phone', e.target.value)}
          required className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />

        <Input placeholder="Cidade" value={form.city} onChange={e => update('city', e.target.value)}
          required className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />

        <Input
          placeholder="Número de seguidores"
          value={form.followers}
          onChange={e => {
            const raw = e.target.value.replace(/\D/g, '');
            const formatted = raw ? Number(raw).toLocaleString('pt-BR') : '';
            update('followers', formatted);
          }}
          inputMode="numeric"
          required
          className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400"
        />

        <Input placeholder="Plataformas que trabalha (ex: TikTok, Instagram, YouTube)"
          value={form.platforms.join(', ')}
          onChange={e => setForm(f => ({ ...f, platforms: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
          required
          className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />

        <Input placeholder="Nicho de trabalho" value={form.niche} onChange={e => update('niche', e.target.value)}
          required className="h-14 bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400" />

        <Textarea placeholder="Por que quer entrar no programa de influencer?" value={form.reason}
          onChange={e => update('reason', e.target.value)} required
          className="min-h-[100px] bg-gray-50 border-gray-200 rounded-xl text-black placeholder:text-gray-400 resize-none" />

        <label className="flex items-start gap-3 cursor-pointer mt-2">
          <Checkbox checked={acceptedTerms} onCheckedChange={(v) => setAcceptedTerms(!!v)}
            className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#FFD400] data-[state=checked]:border-[#FFD400] data-[state=checked]:text-black" />
          <span className="text-sm text-black/70 font-['Nunito'] leading-tight">
            Li e aceito os <a href="#" className="underline font-semibold text-black">Termos de Uso</a> e <a href="#" className="underline font-semibold text-black">Política de Privacidade</a>
          </span>
        </label>

        <Button type="submit" disabled={loading || !acceptedTerms}
          className="w-full h-14 text-lg font-bold bg-[#FFD400] hover:bg-[#FFD400]/90 text-black rounded-xl hover:scale-105 transition-transform duration-200 mt-2 disabled:opacity-40">
          {loading ? 'Enviando...' : 'Enviar inscrição'}
        </Button>
      </form>
    </div>
  );
};

export default InfluencerRegister;
