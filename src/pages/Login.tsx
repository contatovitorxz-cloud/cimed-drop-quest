import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import cimedSymbol from '@/assets/cimed-symbol.png';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

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
      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-sm mx-auto">
        {/* Logo */}
        <div className="mb-10 mt-4 flex items-center justify-center w-full -ml-8">
          <img src={cimedSymbol} alt="Cimed GO" className="w-14 h-14 object-contain" />
          <span className="font-anton text-4xl text-accent-foreground leading-none">CIMEDGO</span>
        </div>

        <p className="text-accent-foreground/60 text-sm mb-8 font-bold uppercase tracking-wider">
          {isSignUp ? 'Crie sua conta e comece a jogar' : 'Entre na sua conta'}
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 h-14 bg-accent-foreground text-background placeholder:text-background/50 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-background/30 transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-background/50 z-10" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-11 h-14 bg-accent-foreground text-background placeholder:text-background/50 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-background/30 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-background/50 z-10" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-11 pr-11 h-14 bg-accent-foreground text-background placeholder:text-background/50 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-background/30 transition-all"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-background/50 hover:text-background/80 transition-colors">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button type="submit" disabled={loading}
                  className="w-full h-14 text-lg font-black uppercase tracking-wider bg-accent-foreground text-accent rounded-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50">
            {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center gap-3 w-full my-5">
          <div className="flex-1 h-px bg-accent-foreground/20" />
          <span className="text-sm text-accent-foreground/50 font-bold uppercase">ou</span>
          <div className="flex-1 h-px bg-accent-foreground/20" />
        </div>

        {/* Google Button */}
        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: { redirectTo: window.location.origin + '/home' },
            });
            if (error) toast({ title: 'Erro', description: error.message, variant: 'destructive' });
          }}
          className="w-full h-14 flex items-center justify-center gap-3 bg-accent-foreground text-background font-bold text-base uppercase rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continuar com Google
        </button>

        <button onClick={() => setIsSignUp(!isSignUp)}
                className="mt-6 text-sm text-accent-foreground/60 hover:text-accent-foreground transition-colors text-center w-full">
          {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
          <span className="text-accent-foreground font-black">{isSignUp ? 'Entrar' : 'Criar conta'}</span>
        </button>

        <button onClick={() => navigate('/influencer')}
                className="mt-3 text-sm text-accent-foreground/60 hover:text-accent-foreground transition-colors text-center w-full">
          Você é influencer? <span className="text-accent-foreground font-black">Inscreva-se</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
