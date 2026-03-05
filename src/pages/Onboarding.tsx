import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
        <p className="text-accent-foreground/70 text-sm font-medium tracking-wide">
          Encontre, jogue e descubra
        </p>
      </div>

      <div className="w-full p-8 pb-12">
        <Button
          onClick={handleStart}
          className="w-full h-14 text-lg font-bold bg-black text-white border-0 rounded-2xl hover:scale-105 hover:bg-black transition-transform duration-200"
        >
          Começar
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
