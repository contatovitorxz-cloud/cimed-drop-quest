import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import cimedLogo from '@/assets/cimed-logo.svg';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem('cimed-onboarded', 'true');
    navigate('/login', { replace: true });
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-accent">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={cimedLogo} alt="Cimed" className="h-16 md:h-20 mb-6" />
        <p className="text-accent-foreground/70 text-sm font-black tracking-widest uppercase">
          Encontre, jogue e descubra
        </p>
      </div>

      <div className="w-full p-8 pb-12">
        <button
          onClick={handleStart}
          className="w-full h-14 text-lg font-black uppercase tracking-wider bg-accent-foreground text-primary-foreground border-[3px] border-accent-foreground shadow-[4px_4px_0_hsl(var(--brutal-black))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
        >
          Começar
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
