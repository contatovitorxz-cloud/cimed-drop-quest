import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Trophy, Sparkles, ChevronRight } from 'lucide-react';

const slides = [
  {
    icon: MapPin,
    title: 'Descubra produtos Cimed perto de você',
    description: 'Encontre farmácias, produtos e ofertas exclusivas no mapa interativo.',
    color: 'text-primary',
  },
  {
    icon: Trophy,
    title: 'Participe de desafios e ganhe recompensas',
    description: 'Complete missões, suba de nível e desbloqueie badges exclusivas.',
    color: 'text-accent',
  },
  {
    icon: Sparkles,
    title: 'Influenciadores liberam drops exclusivos',
    description: 'Seus creators favoritos escondem prêmios no mapa. Fique ligado!',
    color: 'text-primary',
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
      {/* Skip */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => { localStorage.setItem('cimed-onboarded', 'true'); navigate('/login', { replace: true }); }}
          className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
        >
          Pular
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center" key={current}>
        <div className={`w-24 h-24 rounded-3xl gradient-orange flex items-center justify-center mb-8 animate-bounce-in`}>
          <Icon className="w-12 h-12 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-4 animate-fade-up">{slide.title}</h2>
        <p className="text-muted-foreground max-w-xs animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {slide.description}
        </p>
      </div>

      {/* Bottom */}
      <div className="p-8 pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-muted'}`}
            />
          ))}
        </div>

        <Button onClick={handleNext} className="w-full h-14 text-lg font-bold gradient-orange border-0 rounded-2xl glow-orange">
          {current === slides.length - 1 ? 'Começar' : 'Próximo'}
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
