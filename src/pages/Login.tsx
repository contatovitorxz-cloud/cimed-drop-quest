import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
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
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-orange-500 via-yellow-400 to-yellow-300">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full bg-orange-600/20 blur-3xl" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto relative z-10">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3 animate-fade-up">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <img src={cimedSymbol} alt="Cimed GO" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="font-anton text-4xl text-white tracking-tight drop-shadow-md">CIMEDGO</h1>
        </div>

        {/* Card */}
        <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-wider">
            {isSignUp ? 'Crie sua conta e comece a jogar' : 'Entre na sua conta'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 h-14 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 h-14 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button type="submit" disabled={loading}
                    className="w-full h-14 text-lg font-bold uppercase tracking-wider bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100">
              {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
            </button>
          </form>

          {/* Separator */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-semibold uppercase">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
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
            className="w-full h-14 flex items-center justify-center gap-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm uppercase hover:bg-gray-100 hover:shadow-md active:scale-[0.98] transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continuar com Google
          </button>
        </div>

        {/* Bottom links */}
        <div className="mt-6 space-y-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <button onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm text-white/80 hover:text-white transition-colors text-center w-full">
            {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
            <span className="font-bold underline">{isSignUp ? 'Entrar' : 'Criar conta'}</span>
          </button>

          <button onClick={() => navigate('/influencer')}
                  className="text-sm text-white/80 hover:text-white transition-colors text-center w-full">
            Você é influencer? <span className="font-bold underline">Inscreva-se</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
