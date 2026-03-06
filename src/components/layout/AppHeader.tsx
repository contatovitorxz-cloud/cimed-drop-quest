import cimedSymbol from '@/assets/cimed-symbol.png';
import { Bell } from 'lucide-react';

const AppHeader = () => (
  <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 gradient-yellow backdrop-blur-xl border-b border-yellow-600/30">
    <img src={cimedSymbol} alt="Cimed" className="h-8 w-8 object-contain" />
    <div className="w-8" />
    <button className="relative p-2 rounded-full hover:bg-black/10 transition-colors">
      <Bell className="w-5 h-5 text-black" strokeWidth={2} />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
    </button>
  </header>
);

export default AppHeader;
