import { Bell } from 'lucide-react';
import cimedSymbol from '@/assets/cimed-symbol.png';

const AppHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-background border-b border-border">
    <div className="flex items-center gap-2.5">
      <img src={cimedSymbol} alt="Cimed" className="h-8 w-8 object-contain" />
      <div>
        <h1 className="text-foreground font-black text-base leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Cimed GO
        </h1>
        <p className="text-muted-foreground text-[10px] font-semibold leading-tight">Creator Hub</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
        <Bell className="w-5 h-5 text-foreground" strokeWidth={2} />
        <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-[10px] font-bold">
          3
        </span>
      </button>
      <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center text-accent font-bold text-xs">
        JA
      </div>
    </div>
  </header>
);

export default AppHeader;
