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
    <div className="fixed inset-0 flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-10 animate-bounce-in">
          <img src={cimedSymbol} alt="Cimed GO" className="w-20 h-20 object-contain" />
        </div>

        <h1 className="text-3xl font-black mb-2">
          <span className="text-gradient-orange">CIMED</span> GO
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          {isSignUp ? 'Crie sua conta e comece a jogar' : 'Entre na sua conta'}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {isSignUp && (
            <div className="relative animate-fade-up">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-11 h-14 bg-secondary border-border rounded-xl text-foreground"
              />
            </div>
          )}

          <div className="relative animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-11 h-14 bg-secondary border-border rounded-xl text-foreground"
            />
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-11 pr-11 h-14 bg-secondary border-border rounded-xl text-foreground"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <Button type="submit" disabled={loading}
                  className="w-full h-14 text-lg font-bold gradient-orange border-0 rounded-xl glow-orange animate-fade-up"
                  style={{ animationDelay: '0.15s' }}>
            {loading ? 'Carregando...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </Button>
        </form>

        <button onClick={() => setIsSignUp(!isSignUp)}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
          {isSignUp ? 'Já tem conta? ' : 'Não tem conta? '}
          <span className="text-primary font-semibold">{isSignUp ? 'Entrar' : 'Criar conta'}</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
