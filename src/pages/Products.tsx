import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockData';
import { useState } from 'react';

const categories = ['Todos', 'Carmed', 'Lavitan', 'Medicamento'];

const Products = () => {
  const [active, setActive] = useState('Todos');

  const filtered = active === 'Todos'
    ? mockProducts
    : mockProducts.filter((p) => p.category.toLowerCase() === active.toLowerCase());

  return (
    <div className="min-h-screen bg-background pb-20 pt-14">
      <AppHeader />

      <div className="px-4 pt-4">
        <h2 className="text-xl font-black mb-4">Produtos</h2>

        {/* Category filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                active === cat
                  ? 'gradient-orange text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Products;
