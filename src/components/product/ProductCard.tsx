import type { Product } from '@/data/mockData';
import { rarityColors } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const rarityLabel: Record<string, string> = {
  common: 'Comum',
  rare: 'Raro',
  epic: 'Épico',
  legendary: 'Lendário',
};

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-all text-left w-full"
    >
      <div className="h-32 flex items-center justify-center bg-secondary/50">
        <span className="text-5xl">{product.image_url}</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rarityColors[product.rarity]}`}>
            {rarityLabel[product.rarity]}
          </span>
        </div>
        <h3 className="font-bold text-sm truncate">{product.name}</h3>
        <p className="text-primary font-black text-sm mt-1">R$ {product.price.toFixed(2)}</p>
      </div>
    </button>
  );
};

export default ProductCard;
