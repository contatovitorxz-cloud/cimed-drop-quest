import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Trophy, Sparkles, ChevronRight } from 'lucide-react';
import cimedSymbol from '@/assets/cimed-symbol.png';

const slides = [
  {
    icon: MapPin,
    title: 'Descubra produtos Cimed perto de você',
    description: 'Encontre farmácias, produtos e ofertas exclusivas no mapa interativo.',
  },
  {
    icon: Trophy,
    title: 'Participe de desafios e ganhe recompensas',
    description: 'Complete missões, suba de nível e desbloqueie badges exclusivas.',
  },
  {
    icon: Sparkles,
    title: 'Influenciadores liberam drops exclusivos',
    description: 'Seus creators favoritos escondem prêmios no mapa. Fique ligado!',
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem('cimed-onboarded', 'true');
      navigate('/login', { replace: true });
    }
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Header: Logo + Skip */}
      <div className="flex items-center justify-between p-5 pt-6">
        <img src={cimedSymbol} alt="Cimed" className="h-10 w-10 rounded-xl" />
        <button
          onClick={() => { localStorage.setItem('cimed-onboarded', 'true'); navigate('/login', { replace: true }); }}
          className="text-muted-foreground text-sm font-semibold hover:text-accent transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary"
        >
          Pular
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center" key={current}>
        <div className="w-28 h-28 rounded-3xl gradient-yellow flex items-center justify-center mb-10 animate-bounce-in shadow-lg">
          <Icon className="w-14 h-14 text-accent-foreground" />
        </div>
        <h2 className="text-3xl font-extrabold mb-5 leading-tight animate-fade-up">{slide.title}</h2>
        <p className="text-muted-foreground text-base max-w-sm leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {slide.description}
        </p>
      </div>

      {/* Bottom */}
      <div className="p-8 pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2.5 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-accent' : 'w-2 bg-muted'}`}
            />
          ))}
        </div>

        <Button onClick={handleNext} className="w-full h-14 text-lg font-bold gradient-yellow text-accent-foreground border-0 rounded-2xl glow-yellow hover:opacity-90 transition-opacity">
          {current === slides.length - 1 ? 'Começar' : 'Próximo'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
