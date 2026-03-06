import { Bell } from 'lucide-react';
import cimedSymbol from '@/assets/cimed-symbol.png';
import { useAuth } from '@/contexts/AuthContext';

const AppHeader = () => {
  const { user } = useAuth();
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || '';
  const initials = username.slice(0, 2).toUpperCase() || 'U';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-md" />
          <img src={cimedSymbol} alt="Cimed" className="relative h-9 w-9 object-contain drop-shadow-lg" />
        </div>
        <div>
          <h1 className="text-foreground font-black text-base leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Cimed GO
          </h1>
          <p className="text-muted-foreground text-[10px] font-semibold leading-tight tracking-wide">Creator Hub</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button className="relative p-2 rounded-full hover:bg-secondary/80 transition-colors">
          <Bell className="w-5 h-5 text-foreground" strokeWidth={2} />
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center border-2 border-background">3</span>
        </button>
        <div className="w-9 h-9 rounded-full bg-accent border-2 border-accent flex items-center justify-center text-accent-foreground font-bold text-xs shadow-md shadow-accent/30">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
