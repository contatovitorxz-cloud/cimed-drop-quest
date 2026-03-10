import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cimedLogo from '@/assets/cimed-logo.svg';

const Splash = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'logo' | 'text' | 'exit'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 800);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(() => {
      navigate('/onboarding', { replace: true });
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-accent z-50 transition-opacity duration-500"
         style={{ opacity: phase === 'exit' ? 0 : 1 }}>
      <div className={`transition-all duration-700 ease-out ${phase === 'logo' ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
        <img src={cimedLogo} alt="Cimed" className="h-16 md:h-20" />
      </div>
      <p className={`mt-6 text-accent-foreground/70 text-sm font-black tracking-widest uppercase transition-all duration-500 delay-300 ${phase === 'text' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        Encontre, jogue e descubra
      </p>
    </div>
  );
};

export default Splash;
