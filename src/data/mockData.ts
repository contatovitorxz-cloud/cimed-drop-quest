export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
}

export interface Drop {
  id: string;
  product: Product;
  pharmacy: Pharmacy;
  type: 'rare' | 'coupon' | 'free' | 'kit';
  title: string;
  description: string;
  quantity: number;
  expiresAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  rewardType: 'points' | 'badge' | 'product';
  rewardValue: number;
  challengeType: 'visit' | 'collect' | 'share' | 'route';
  goal: number;
  progress: number;
  icon: string;
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: Date;
}

// São Paulo area pharmacies
export const mockPharmacies: Pharmacy[] = [
  { id: '1', name: 'Drogasil Paulista', address: 'Av. Paulista, 1000', lat: -23.5629, lng: -46.6544, distance: '350m' },
  { id: '2', name: 'Droga Raia Consolação', address: 'Rua da Consolação, 2300', lat: -23.5560, lng: -46.6625, distance: '800m' },
  { id: '3', name: 'Pague Menos Liberdade', address: 'Rua da Liberdade, 500', lat: -23.5580, lng: -46.6350, distance: '1.2km' },
  { id: '4', name: 'Drogaria São Paulo', address: 'Av. Brigadeiro, 1500', lat: -23.5700, lng: -46.6480, distance: '1.5km' },
  { id: '5', name: 'Farmácia Venâncio', address: 'Rua Augusta, 800', lat: -23.5530, lng: -46.6560, distance: '2km' },
  { id: '6', name: 'Droga Raia Vila Mariana', address: 'Rua Domingos de Morais, 200', lat: -23.5880, lng: -46.6380, distance: '3.5km' },
  { id: '7', name: 'Drogasil Augusta', address: 'Rua Augusta, 2200', lat: -23.5535, lng: -46.6590, distance: '1.8km' },
  { id: '8', name: 'Droga Raia Moema', address: 'Av. Moema, 400', lat: -23.6010, lng: -46.6620, distance: '4.5km' },
  { id: '9', name: 'Pague Menos Tatuapé', address: 'Rua Tuiuti, 1500', lat: -23.5380, lng: -46.5760, distance: '6km' },
  { id: '10', name: 'Drogaria São Paulo Pinheiros', address: 'Rua dos Pinheiros, 900', lat: -23.5670, lng: -46.6930, distance: '3.2km' },
  { id: '11', name: 'Farmácia Venâncio Itaim', address: 'Rua João Cachoeira, 350', lat: -23.5820, lng: -46.6730, distance: '2.8km' },
  { id: '12', name: 'Ultrafarma Centro', address: 'Av. São João, 1200', lat: -23.5410, lng: -46.6400, distance: '3km' },
  { id: '13', name: 'Drogasil Butantã', address: 'Av. Corifeu de Azevedo Marques, 500', lat: -23.5720, lng: -46.7210, distance: '5.5km' },
  { id: '14', name: 'Panvel Santana', address: 'Rua Voluntários da Pátria, 2100', lat: -23.5100, lng: -46.6290, distance: '7km' },
  { id: '15', name: 'Drogaria Onofre Bela Vista', address: 'Rua Rui Barbosa, 600', lat: -23.5730, lng: -46.6400, distance: '1.5km' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Carmed Fini', description: 'Hidratante labial sabor Fini. Edição limitada com sabor de bala.', image_url: '🍬', category: 'carmed', rarity: 'rare', price: 29.90 },
  { id: '2', name: 'Carmed Barbie', description: 'Hidratante labial Barbie. Edição especial colecionável.', image_url: '💄', category: 'carmed', rarity: 'epic', price: 34.90 },
  { id: '3', name: 'Carmed Original', description: 'Hidratante labial clássico. Proteção e hidratação.', image_url: '💋', category: 'carmed', rarity: 'common', price: 19.90 },
  { id: '4', name: 'Lavitan Energia', description: 'Vitaminas para energia e disposição. 60 comprimidos.', image_url: '⚡', category: 'lavitan', rarity: 'common', price: 49.90 },
  { id: '5', name: 'Carmed BT21', description: 'Hidratante labial BT21. Collab exclusiva com BTS.', image_url: '🎵', category: 'carmed', rarity: 'legendary', price: 39.90 },
  { id: '6', name: 'Lavitan Hair', description: 'Vitaminas para cabelo, pele e unhas.', image_url: '💇', category: 'lavitan', rarity: 'common', price: 54.90 },
  { id: '7', name: 'Carmed Bubble', description: 'Hidratante labial sabor chiclete. Edição divertida.', image_url: '🫧', category: 'carmed', rarity: 'rare', price: 24.90 },
  { id: '8', name: 'Benegrip Multi', description: 'Antigripal completo. Alívio rápido dos sintomas.', image_url: '💊', category: 'medicamento', rarity: 'common', price: 22.90 },
];

export const mockDrops: Drop[] = [
  {
    id: '1',
    product: mockProducts[0],
    pharmacy: mockPharmacies[0],
    type: 'rare',
    title: '🔥 Carmed Fini Edição Limitada',
    description: 'Apenas 5 unidades disponíveis! Corra!',
    quantity: 5,
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    product: mockProducts[4],
    pharmacy: mockPharmacies[2],
    type: 'free',
    title: '🎁 Carmed BT21 Grátis',
    description: 'Os 10 primeiros ganham grátis!',
    quantity: 10,
    expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    product: mockProducts[1],
    pharmacy: mockPharmacies[4],
    type: 'coupon',
    title: '🎟️ 50% OFF Carmed Barbie',
    description: 'Cupom exclusivo para membros do app.',
    quantity: 50,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    product: mockProducts[6],
    pharmacy: mockPharmacies[1],
    type: 'kit',
    title: '📦 Kit Carmed Colecionador',
    description: 'Kit com 3 Carmeds + nécessaire exclusiva.',
    quantity: 3,
    expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
  },
];

export const mockChallenges: Challenge[] = [
  { id: '1', title: 'Caçador de Carmeds', description: 'Encontre 3 tipos diferentes de Carmed', rewardType: 'badge', rewardValue: 500, challengeType: 'collect', goal: 3, progress: 1, icon: '🏆' },
  { id: '2', title: 'Explorador Cimed', description: 'Visite 5 farmácias diferentes', rewardType: 'points', rewardValue: 300, challengeType: 'visit', goal: 5, progress: 2, icon: '🗺️' },
  { id: '3', title: 'Rota da Saúde', description: 'Complete a rota especial de 3 farmácias', rewardType: 'product', rewardValue: 1, challengeType: 'route', goal: 3, progress: 0, icon: '🏃' },
  { id: '4', title: 'Influencer Hunter', description: 'Resgate 2 drops de influenciadores', rewardType: 'badge', rewardValue: 400, challengeType: 'collect', goal: 2, progress: 1, icon: '📲' },
  { id: '5', title: 'Compartilhador', description: 'Compartilhe 3 produtos com amigos', rewardType: 'points', rewardValue: 150, challengeType: 'share', goal: 3, progress: 0, icon: '📣' },
];

export const mockBadges: UserBadge[] = [
  { id: '1', name: 'Caçador de Carmed', icon: '🏆', description: 'Encontrou 3 tipos de Carmed', earnedAt: new Date('2025-01-15') },
  { id: '2', name: 'Explorador Cimed', icon: '🗺️', description: 'Visitou 5 farmácias' },
  { id: '3', name: 'Top Fã da Marca', icon: '⭐', description: 'Resgatou 10 produtos' },
  { id: '4', name: 'Influencer Hunter', icon: '📲', description: 'Resgatou drop de influenciador', earnedAt: new Date('2025-02-01') },
  { id: '5', name: 'Primeiro Drop', icon: '🎁', description: 'Resgatou seu primeiro drop', earnedAt: new Date('2025-01-10') },
  { id: '6', name: 'Maratonista', icon: '🏃', description: 'Completou 5 desafios' },
];

export const rarityColors: Record<string, string> = {
  common: 'bg-muted text-muted-foreground',
  rare: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-accent/20 text-accent border-accent/30',
};

export const dropTypeColors: Record<string, string> = {
  rare: 'from-purple-600 to-pink-600',
  coupon: 'from-primary to-amber-500',
  free: 'from-green-600 to-emerald-500',
  kit: 'from-blue-600 to-cyan-500',
};
