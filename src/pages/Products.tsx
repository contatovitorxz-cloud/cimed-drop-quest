import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { useProducts } from '@/hooks/useSupabaseData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const rarityColors: Record<string, string> = {
  common: 'bg-muted text-muted-foreground border-border',
  rare: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-accent/20 text-accent border-accent/30',
};

const rarityLabel: Record<string, string> = {
  common: 'Comum', rare: 'Raro', epic: 'Épico', legendary: 'Lendário',
};

const Products = () => {
  const { products, loading } = useProducts();
  const [active, setActive] = useState('Todos');
  const navigate = useNavigate();

  const categories = ['Todos', ...new Set(products.map(p => p.category))];

  const filtered = active === 'Todos'
    ? products
    : products.filter((p: any) => p.category.toLowerCase() === active.toLowerCase());

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />

      <div className="px-4 pt-4">
        <h2 className="text-xl font-black mb-4">Produtos</h2>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs font-black whitespace-nowrap transition-all border-[2px] border-border uppercase ${
                active === cat ? 'bg-accent text-accent-foreground shadow-[2px_2px_0_hsl(var(--border))]' : 'bg-card text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-44 bg-muted animate-pulse border-[3px] border-border" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((product: any) => (
              <button
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex flex-col brutal-card brutal-card-hover overflow-hidden text-left w-full"
              >
                <div className="h-32 flex items-center justify-center bg-muted">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-16 h-16 object-contain" />
                  ) : (
                    <span className="text-3xl text-muted-foreground">📦</span>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black px-2 py-0.5 border-[2px] ${rarityColors[product.rarity] || rarityColors.common}`}>
                      {rarityLabel[product.rarity] || 'Comum'}
                    </span>
                  </div>
                  <h3 className="font-black text-sm truncate uppercase">{product.name}</h3>
                  {product.price && <p className="text-accent font-black text-sm mt-1">R$ {Number(product.price).toFixed(2)}</p>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Products;
