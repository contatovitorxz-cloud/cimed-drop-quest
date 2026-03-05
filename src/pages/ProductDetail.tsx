import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, mockPharmacies, rarityColors } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Share2 } from 'lucide-react';

const rarityLabel: Record<string, string> = {
  common: 'Comum', rare: 'Raro', epic: 'Épico', legendary: 'Lendário',
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Produto não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Product image */}
      <div className="h-48 flex items-center justify-center bg-secondary/30 mx-4 rounded-3xl mb-6">
        <span className="text-8xl animate-bounce-in">{product.image_url}</span>
      </div>

      <div className="px-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${rarityColors[product.rarity]}`}>
            {rarityLabel[product.rarity]}
          </span>
          <span className="text-xs text-muted-foreground capitalize">{product.category}</span>
        </div>

        <h1 className="text-2xl font-black mb-2">{product.name}</h1>
        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
        <p className="text-3xl font-black text-primary mb-6">R$ {product.price.toFixed(2)}</p>

        {/* Pharmacies nearby */}
        <h3 className="font-bold text-sm mb-3">📍 Farmácias com estoque</h3>
        <div className="space-y-2 mb-6">
          {mockPharmacies.slice(0, 3).map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.distance}</p>
                </div>
              </div>
              <Button size="sm" className="gradient-orange border-0 rounded-lg text-xs h-8">Ir</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
