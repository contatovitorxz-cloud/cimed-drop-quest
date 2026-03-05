import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
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
    <div className="fixed inset-0 flex flex-col bg-[#FFD400]">
      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full max-w-sm mx-auto">
        {/* Logo */}
        <div className="mb-10 animate-bounce-in flex items-center justify-center gap-3 w-full">
          <img src={cimedSymbol} alt="Cimed GO" className="w-14 h-14 object-contain" />
          <span className="text-4xl font-black text-black tracking-tight leading-none font-['Nunito']">CIMEDGO</span>
        </div>

        <p className="text-black/60 text-sm mb-8 font-['Nunito']">
          {isSignUp ? 'Crie sua conta e comece a jogar' : 'Entre na sua conta'}
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isSignUp && (
            <div className="relative animate-fade-up">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-11 h-14 bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
              />
            </div>
          )}

          <div className="relative animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-11 h-14 bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
            />
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-11 pr-11 h-14 bg-white border-gray-200 rounded-xl text-black placeholder:text-gray-400"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button type="submit" disabled={loading}
                  className="w-full h-14 text-lg font-bold bg-black hover:bg-black text-white border-0 rounded-xl hover:scale-105 transition-transform duration-200 animate-fade-up"
                  style={{ animationDelay: '0.15s' }}>
            {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </Button>
        </form>

        <button onClick={() => setIsSignUp(!isSignUp)}
                className="mt-6 text-sm text-black/60 hover:text-black transition-colors">
          {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
          <span className="text-black font-semibold">{isSignUp ? 'Entrar' : 'Criar conta'}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
