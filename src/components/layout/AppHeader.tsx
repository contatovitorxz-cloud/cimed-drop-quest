import cimedSymbol from '@/assets/cimed-symbol.png';
import { Bell } from 'lucide-react';

const AppHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
    <img src={cimedSymbol} alt="Cimed" className="h-8 w-8 object-contain" />
    <h1 className="text-lg font-black">
      <span className="text-gradient-orange">CIMED</span>{' '}
      <span className="text-foreground">GO</span>
    </h1>
    <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
      <Bell className="w-5 h-5 text-muted-foreground" />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
    </button>
  </header>
);

export default AppHeader;
