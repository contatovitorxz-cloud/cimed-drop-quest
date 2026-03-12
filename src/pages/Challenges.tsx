import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { Trophy } from 'lucide-react';
import EmptyState from '@/components/ui/empty-state';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Challenges = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('challenges')
        .select('*')
        .eq('active', true);
      setChallenges(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-accent" />
          <h2 className="font-anton text-2xl">DESAFIOS</h2>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-muted animate-pulse border-[3px] border-border" />)}
          </div>
        ) : challenges.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="Nenhum desafio disponível"
            description="Novos desafios serão publicados em breve!"
          />
        ) : (
          <>
            <div className="brutal-card-dark p-4 mb-4">
              <p className="text-sm font-black uppercase">
                {challenges.length} desafios disponíveis
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Complete desafios para ganhar pontos, badges e produtos!
              </p>
            </div>

            <div className="space-y-3">
              {challenges.map((challenge: any) => (
                <div key={challenge.id} className="p-4 brutal-card brutal-card-hover">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-accent dark:bg-accent/15 flex items-center justify-center shrink-0 border-[2px] border-border dark:border-border/50">
                      <Trophy className="w-6 h-6 text-accent-foreground dark:text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-sm truncate uppercase">{challenge.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{challenge.description}</p>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground font-bold">Meta: {challenge.goal}</span>
                          <span className="text-accent font-black">+{challenge.reward_value} {challenge.reward_type === 'points' ? 'pts' : 'prêmio'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Challenges;
