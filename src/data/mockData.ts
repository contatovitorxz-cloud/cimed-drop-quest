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

export interface MissionMock {
  id: string;
  title: string;
  description: string;
  missionType: 'weekly' | 'daily' | 'special';
  rewardType: string;
  rewardValue: number;
  icon: string;
  startsAt: Date;
  endsAt: Date;
  steps: MissionStepMock[];
}

export interface MissionStepMock {
  id: string;
  description: string;
  type: string;
  targetCount: number;
  completed: number;
}

export interface InfluencerDropMock {
  id: string;
  influencerName: string;
  influencerInitials: string;
  title: string;
  description: string;
  product: Product;
  lat: number;
  lng: number;
  totalQuantity: number;
  remainingQuantity: number;
  type: 'free' | 'discount' | 'exclusive';
  discountPercent: number;
  expiresAt: Date;
  teaserMessage: string;
}

export interface SocialActivity {
  id: string;
  userName: string;
  userInitials: string;
  type: 'drop_claimed' | 'mission_completed' | 'badge_earned' | 'level_up';
  title: string;
  description: string;
  createdAt: Date;
}

export interface AnalyticsMetric {
  label: string;
  value: number;
  change: number;
  icon: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  type: 'collect' | 'visit' | 'route' | 'share';
  reward: number;
  icon: string;
}

export interface RareProduct {
  id: string;
  product: Product;
  lat: number;
  lng: number;
}

// São Paulo area pharmacies
export const mockPharmacies: Pharmacy[] = [
  { id: '1', name: 'Drogasil Paulista', address: 'Av. Paulista, 1000', lat: -23.5645, lng: -46.6520 },
  { id: '2', name: 'Droga Raia Consolação', address: 'Rua da Consolação, 2300', lat: -23.5560, lng: -46.6625 },
  { id: '3', name: 'Pague Menos Liberdade', address: 'Rua da Liberdade, 500', lat: -23.5580, lng: -46.6350 },
  { id: '4', name: 'Drogaria São Paulo', address: 'Av. Brigadeiro, 1500', lat: -23.5700, lng: -46.6480 },
  { id: '5', name: 'Farmácia Venâncio', address: 'Rua Augusta, 800', lat: -23.5530, lng: -46.6560 },
  { id: '6', name: 'Droga Raia Vila Mariana', address: 'Rua Domingos de Morais, 200', lat: -23.5880, lng: -46.6380 },
  { id: '7', name: 'Drogasil Augusta', address: 'Rua Augusta, 2200', lat: -23.5535, lng: -46.6590 },
  { id: '8', name: 'Droga Raia Moema', address: 'Av. Moema, 400', lat: -23.6010, lng: -46.6620 },
  { id: '9', name: 'Pague Menos Tatuapé', address: 'Rua Tuiuti, 1500', lat: -23.5380, lng: -46.5760 },
  { id: '10', name: 'Drogaria São Paulo Pinheiros', address: 'Rua dos Pinheiros, 900', lat: -23.5670, lng: -46.6930 },
  { id: '11', name: 'Farmácia Venâncio Itaim', address: 'Rua João Cachoeira, 350', lat: -23.5820, lng: -46.6730 },
  { id: '12', name: 'Ultrafarma Centro', address: 'Av. São João, 1200', lat: -23.5410, lng: -46.6400 },
  { id: '13', name: 'Drogasil Butantã', address: 'Av. Corifeu de Azevedo Marques, 500', lat: -23.5720, lng: -46.7210 },
  { id: '14', name: 'Panvel Santana', address: 'Rua Voluntários da Pátria, 2100', lat: -23.5100, lng: -46.6290 },
  { id: '15', name: 'Drogaria Onofre Bela Vista', address: 'Rua Rui Barbosa, 600', lat: -23.5730, lng: -46.6400 },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Carmed Fini', description: 'Hidratante labial sabor Fini. Edição limitada com sabor de bala.', image_url: '/images/cimed-symbol.png', category: 'carmed', rarity: 'rare', price: 29.90 },
  { id: '2', name: 'Carmed Barbie', description: 'Hidratante labial Barbie. Edição especial colecionável.', image_url: '/images/cimed-symbol.png', category: 'carmed', rarity: 'epic', price: 34.90 },
  { id: '3', name: 'Carmed Original', description: 'Hidratante labial clássico. Proteção e hidratação.', image_url: '/images/cimed-symbol.png', category: 'carmed', rarity: 'common', price: 19.90 },
  { id: '4', name: 'Lavitan Energia', description: 'Vitaminas para energia e disposição. 60 comprimidos.', image_url: '/images/cimed-symbol.png', category: 'lavitan', rarity: 'common', price: 49.90 },
  { id: '5', name: 'Carmed BT21', description: 'Hidratante labial BT21. Collab exclusiva com BTS.', image_url: '/images/cimed-symbol.png', category: 'carmed', rarity: 'legendary', price: 39.90 },
  { id: '6', name: 'Lavitan Hair', description: 'Vitaminas para cabelo, pele e unhas.', image_url: '/images/cimed-symbol.png', category: 'lavitan', rarity: 'common', price: 54.90 },
  { id: '7', name: 'Carmed Bubble', description: 'Hidratante labial sabor chiclete. Edição divertida.', image_url: '/images/cimed-symbol.png', category: 'carmed', rarity: 'rare', price: 24.90 },
  { id: '8', name: 'Benegrip Multi', description: 'Antigripal completo. Alívio rápido dos sintomas.', image_url: '/images/cimed-symbol.png', category: 'medicamento', rarity: 'common', price: 22.90 },
];

export const mockDrops: Drop[] = [];
export const mockChallenges: Challenge[] = [];

export const mockBadges: UserBadge[] = [
  { id: '1', name: 'Caçador de Carmed', icon: 'trophy', description: 'Encontrou 3 tipos de Carmed' },
  { id: '2', name: 'Explorador Cimed', icon: 'map', description: 'Visitou 5 farmácias' },
  { id: '3', name: 'Top Fã da Marca', icon: 'star', description: 'Resgatou 10 produtos' },
  { id: '4', name: 'Influencer Hunter', icon: 'smartphone', description: 'Resgatou drop de influenciador' },
  { id: '5', name: 'Primeiro Drop', icon: 'gift', description: 'Resgatou seu primeiro drop' },
  { id: '6', name: 'Maratonista', icon: 'footprints', description: 'Completou 5 desafios' },
];

// Map markers near fallback position (-23.5629, -46.6544)
export const mockMapDrops = [
  { id: 'md1', lat: -23.5610, lng: -46.6530, count: 2, type: 'drop' as const },
  { id: 'md2', lat: -23.5650, lng: -46.6510, count: 1, type: 'drop' as const },
  { id: 'md3', lat: -23.5600, lng: -46.6570, count: 3, type: 'drop' as const },
];

export const mockMapRareDrops = [
  { id: 'mr1', lat: -23.5620, lng: -46.6500, label: 'Drop Raro', distance: '130m' },
];

export const mockMapMissions = [
  { id: 'mm1', lat: -23.5640, lng: -46.6580, type: 'mission' as const },
  { id: 'mm2', lat: -23.5590, lng: -46.6490, type: 'mission' as const },
];

export const mockMissions: Mission[] = [];
export const mockRareProducts: RareProduct[] = [];
export const mockMissionCards: MissionMock[] = [];
export const mockInfluencerDrops: InfluencerDropMock[] = [];
export const mockSocialFeed: SocialActivity[] = [];

export const mockAnalyticsMetrics: AnalyticsMetric[] = [];
export const mockScanTrend: { day: string; scans: number }[] = [];
export const mockTopProducts: { name: string; scans: number }[] = [];
export const mockPharmacyRanking: { name: string; scans: number; city: string }[] = [];

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

// ===== INFLUENCER DASHBOARD MOCK DATA =====
export interface InfluencerMetric {
  label: string;
  value: number;
  change: number;
  icon: 'eye' | 'click' | 'conversion';
}

export const mockInfluencerMetrics: InfluencerMetric[] = [
  { label: 'Visualizações', value: 12500, change: 8.2, icon: 'eye' },
  { label: 'Cliques', value: 620, change: 5.1, icon: 'click' },
  { label: 'Conversões', value: 218, change: 12.3, icon: 'conversion' },
];

export interface InfluencerCampaign {
  id: string;
  name: string;
  pharmacy: string;
  status: 'active' | 'paused' | 'ended';
  views: number;
  clicks: number;
  conversions: number;
  total: number;
  remaining: number;
}

export const mockInfluencerCampaigns: InfluencerCampaign[] = [];

export interface InfluencerQRCode {
  id: string;
  label: string;
  pharmacy: string;
  scans: number;
  active: boolean;
}

export const mockInfluencerQRCodes: InfluencerQRCode[] = [];

export const mockInfluencerPerformance: { day: string; cliques: number; conversoes: number }[] = [
  { day: 'Seg', cliques: 85, conversoes: 32 },
  { day: 'Ter', cliques: 72, conversoes: 28 },
  { day: 'Qua', cliques: 110, conversoes: 45 },
  { day: 'Qui', cliques: 95, conversoes: 38 },
  { day: 'Sex', cliques: 130, conversoes: 52 },
  { day: 'Sáb', cliques: 68, conversoes: 25 },
  { day: 'Dom', cliques: 60, conversoes: 18 },
];

// ===== ADMIN DASHBOARD MOCK DATA =====
export interface AdminMetric {
  label: string;
  value: number;
  change: number;
}

export const mockAdminMetrics: AdminMetric[] = [
  { label: 'Usuários Ativos', value: 72500, change: 12 },
  { label: 'Missões Completas', value: 185200, change: 8 },
  { label: 'Escaneamentos QR', value: 75900, change: 32 },
  { label: 'Drops Resgatados', value: 39100, change: 25 },
];

export const mockAdminGrowth: { date: string; usuarios: number; missoes: number; scans: number; drops: number }[] = [
  { date: '1 abr', usuarios: 18000, missoes: 42000, scans: 15000, drops: 8000 },
  { date: '4 abr', usuarios: 22000, missoes: 55000, scans: 20000, drops: 11000 },
  { date: '7 abr', usuarios: 28000, missoes: 68000, scans: 28000, drops: 14000 },
  { date: '10 abr', usuarios: 35000, missoes: 82000, scans: 35000, drops: 18000 },
  { date: '13 abr', usuarios: 42000, missoes: 98000, scans: 42000, drops: 22000 },
  { date: '16 abr', usuarios: 50000, missoes: 115000, scans: 50000, drops: 26000 },
  { date: '19 abr', usuarios: 58000, missoes: 135000, scans: 58000, drops: 30000 },
  { date: '22 abr', usuarios: 65000, missoes: 155000, scans: 65000, drops: 34000 },
  { date: '25 abr', usuarios: 70000, missoes: 170000, scans: 70000, drops: 37000 },
  { date: '28 abr', usuarios: 72500, missoes: 185200, scans: 75900, drops: 39100 },
];

export interface AdminCampaign {
  id: string;
  name: string;
  pharmacy: string;
  claimed: number;
  total: number;
  status: 'active' | 'paused' | 'ended' | 'expired';
  statusLabel: string;
}

export const mockAdminCampaigns: AdminCampaign[] = [
  { id: '1', name: 'Carmed Grátis', pharmacy: 'Drogasil Paulista · 200m', claimed: 2000, total: 2000, status: 'ended', statusLabel: 'Encerrado' },
  { id: '2', name: 'Produtos Cimed Grátis', pharmacy: 'Droga Raia Consolação · 450m', claimed: 417, total: 500, status: 'expired', statusLabel: 'Expirada' },
  { id: '3', name: 'Cupom 20% OFF', pharmacy: 'Pague Menos Liberdade · 800m', claimed: 361, total: 500, status: 'active', statusLabel: 'Encerra hoje' },
];

export interface AdminInfluencer {
  id: string;
  name: string;
  handle: string;
  initials: string;
  followers: number;
  avatar: string;
  status: 'approved' | 'pending' | 'suspended';
}

export const mockAdminInfluencers: AdminInfluencer[] = [
  { id: '1', name: 'Amanda Costa', handle: '@acosta', initials: 'AC', followers: 515000, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', status: 'pending' },
  { id: '2', name: 'Rafael Silva', handle: '@rafaelsilva', initials: 'RS', followers: 382000, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', status: 'pending' },
  { id: '3', name: 'Carla Menezes', handle: '@carlamenezes', initials: 'CM', followers: 275000, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', status: 'pending' },
];

export interface AdminDropRanking {
  id: string;
  name: string;
  city: string;
  claimed: number;
  total: number;
  status: 'esgotado' | 'encerra_hoje' | 'ativo' | 'expirada';
  statusLabel: string;
}

export const mockAdminDropRanking: AdminDropRanking[] = [
  { id: '1', name: 'Carmed Grátis', city: 'São Paulo', claimed: 4835, total: 5000, status: 'esgotado', statusLabel: 'Esgotado' },
  { id: '2', name: 'Lipogel', city: 'Rio de Janeiro', claimed: 3991, total: 5000, status: 'expirada', statusLabel: 'Expirada' },
  { id: '3', name: 'Cupom de 30% OFF', city: 'Belo Horizonte', claimed: 3645, total: 5000, status: 'encerra_hoje', statusLabel: 'Encerra hoje' },
];
