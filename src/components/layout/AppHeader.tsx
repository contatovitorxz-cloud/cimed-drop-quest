import { useState, useEffect } from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import cimedSymbol from '@/assets/cimed-symbol.png';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

const AppHeader = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
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
          <div className="w-9 h-9 bg-accent flex items-center justify-center text-accent-foreground font-black text-xs border-[2px] border-border">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
