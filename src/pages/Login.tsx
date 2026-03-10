import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import cimedSymbol from '@/assets/cimed-symbol.png';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, username);
        toast({ title: 'Conta criada!', description: 'Verifique seu email para confirmar.' });
      } else {
        await signIn(email, password);
        navigate('/home', { replace: true });
      }
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-accent">
      <div className="flex-1 flex flex-col items-center justify-between px-6 w-full max-w-sm mx-auto py-16">
        {/* Branding — top section with generous spacing */}
        <div className="flex flex-col items-center gap-6 pt-8">
          <img src={cimedSymbol} alt="Cimed" className="w-8 h-8 object-contain" />
          <h1 className="font-anton text-7xl text-accent-foreground leading-[0.85] tracking-tight text-center">
            CIMED<br />GO
          </h1>
          <p className="text-[10px] text-accent-foreground/50 font-bold uppercase tracking-[0.35em]">
            {isSignUp ? 'Crie sua conta' : 'Sua jornada começa aqui'}
          </p>
        </div>

        {/* Form — center section */}
        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {isSignUp && (
            <input
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 h-14 bg-background text-foreground placeholder:text-muted-foreground border border-accent-foreground/20 focus:outline-none focus:border-accent-foreground transition-colors"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 h-14 bg-background text-foreground placeholder:text-muted-foreground border border-accent-foreground/20 focus:outline-none focus:border-accent-foreground transition-colors"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 pr-12 h-14 bg-background text-foreground placeholder:text-muted-foreground border border-accent-foreground/20 focus:outline-none focus:border-accent-foreground transition-colors"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button type="submit" disabled={loading}
                  className="w-full h-16 text-lg font-black uppercase tracking-[0.15em] bg-accent-foreground text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50">
            {loading ? '...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>

        {/* Bottom links */}
        <div className="flex flex-col items-center gap-4 pb-4">
          <button
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin + '/home' },
              });
              if (error) toast({ title: 'Erro', description: error.message, variant: 'destructive' });
            }}
            className="text-xs text-accent-foreground/40 hover:text-accent-foreground transition-colors uppercase tracking-[0.2em] underline underline-offset-4"
          >
            Continuar com Google
          </button>

          <button onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-accent-foreground/40 hover:text-accent-foreground transition-colors">
            {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
            <span className="font-black uppercase">{isSignUp ? 'Entrar' : 'Criar conta'}</span>
          </button>

          <button onClick={() => navigate('/influencer')}
                  className="text-xs text-accent-foreground/30 hover:text-accent-foreground transition-colors">
            Influencer? <span className="font-black uppercase">Inscreva-se</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
