import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sun, Moon, LayoutDashboard, TrendingUp, UserCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import cimedSymbol from '@/assets/cimed-symbol.png';
import CimedWordmark from '@/assets/cimed-wordmark.svg?react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useUserRole } from '@/hooks/useUserRole';

const AppHeader = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();
  const username = profile?.username || user?.user_metadata?.username || user?.email?.split('@')[0] || '';
  const initials = username.slice(0, 2).toUpperCase() || 'U';
  const avatarUrl = profile?.avatar_url;

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 brutal-header">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <img src={cimedSymbol} alt="Cimed" className="h-9 w-9 object-contain" />
          <div>
            <h1 className="font-nunito text-foreground text-lg font-black leading-tight">
              CIMED GO
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold leading-tight tracking-widest uppercase">Creator Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsDark(!isDark)}
            className="relative p-2 border-[2px] border-border hover:bg-accent hover:text-accent-foreground transition-all"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun className="w-5 h-5 text-foreground" strokeWidth={2} /> : <Moon className="w-5 h-5 text-foreground" strokeWidth={2} />}
          </button>
          <button className="relative p-2 border-[2px] border-border hover:bg-accent hover:text-accent-foreground transition-all">
            <Bell className="w-5 h-5 text-foreground" strokeWidth={2} />
            <span className="absolute -top-1 -right-1 min-w-[18px] min-h-[18px] bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center border-[2px] border-border">3</span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-9 h-9 bg-accent flex items-center justify-center text-accent-foreground font-black text-xs border-[2px] border-border overflow-hidden cursor-pointer">
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
    </header>
  );
};

export default AppHeader;
