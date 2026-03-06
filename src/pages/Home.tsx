import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AppHeader from '@/components/layout/AppHeader';
import BottomNav from '@/components/layout/BottomNav';
import { mockPharmacies, mockDrops } from '@/data/mockData';
import { MapPin, Zap, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const pharmacyIcon = new L.DivIcon({
  html: `<div style="width:36px;height:36px;background:linear-gradient(135deg,#FFD400,#FFC200);border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #0F0F0F;box-shadow:0 0 12px rgba(255,212,0,0.5)"><img src="/images/cimed-symbol.png" style="width:20px;height:20px;object-fit:contain" /></div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const dropIcon = new L.DivIcon({
  html: `<div style="width:40px;height:40px;background:linear-gradient(135deg,#FFD400,#FFC200);border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #0F0F0F;box-shadow:0 0 20px rgba(255,212,0,0.6);animation:pulse 2s infinite"><img src="/images/cimed-symbol.png" style="width:22px;height:22px;object-fit:contain" /></div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const Home = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);
  const center: [number, number] = [-23.5629, -46.6544];

  return (
    <div className="fixed inset-0 bg-background">
      <AppHeader />

      {/* Map */}
      <div className="absolute inset-0 pt-14 pb-16">
        <MapContainer center={center} zoom={14} className="h-full w-full" zoomControl={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution=""
          />

          {/* Pharmacy markers */}
          {mockPharmacies.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={pharmacyIcon}>
              <Popup className="custom-popup">
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-sm text-foreground">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{p.address}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                    <Navigation className="w-3 h-3" />
                    <span>{p.distance}</span>
                  </div>
                  <Button size="sm" className="w-full mt-2 gradient-orange border-0 text-xs h-8 rounded-lg">
                    Ver produtos
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Drop markers */}
          {mockDrops.map((d) => (
            <Marker key={`drop-${d.id}`} position={[d.pharmacy.lat, d.pharmacy.lng]} icon={dropIcon}>
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-sm text-foreground">{d.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{d.description}</p>
                  <p className="text-xs text-primary mt-1 font-semibold">{d.pharmacy.name}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Floating action buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-2 z-30">
        <button className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shadow-lg hover:border-primary/50 transition-all">
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Bottom info card */}
      <div className="fixed bottom-20 left-4 right-20 z-30">
        <div className="bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold">{mockPharmacies.length} farmácias próximas</p>
            <p className="text-[10px] text-muted-foreground">{mockDrops.length} drops ativos • Toque para explorar</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold text-accent">{mockDrops.length}</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
