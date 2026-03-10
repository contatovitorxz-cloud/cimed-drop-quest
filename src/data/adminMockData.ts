// Dados fake para o Admin Dashboard quando o banco está vazio

export const mockAdminMetrics = {
  totalUsers: 1247,
  totalMissions: 856,
  totalScans: 3421,
  totalDropsClaimed: 612,
};

export const mockEngagementChart = [
  { month: 'Jan', scans: 420, missoes: 180, drops: 95 },
  { month: 'Fev', scans: 580, missoes: 240, drops: 120 },
  { month: 'Mar', scans: 710, missoes: 310, drops: 155 },
  { month: 'Abr', scans: 640, missoes: 280, drops: 140 },
  { month: 'Mai', scans: 890, missoes: 390, drops: 210 },
  { month: 'Jun', scans: 1020, missoes: 450, drops: 265 },
  { month: 'Jul', scans: 960, missoes: 420, drops: 240 },
  { month: 'Ago', scans: 1150, missoes: 510, drops: 290 },
];

export const mockDrops = [
  { id: '1', title: 'Vitamina C Drop', description: 'Ganhe uma amostra grátis', type: 'coupon', quantity: 200, active: true, pharmacies: { name: 'Drogasil Centro' }, products: { name: 'Vitamina C 1000mg' } },
  { id: '2', title: 'Kit Protetor Solar', description: '30% off no kit', type: 'discount', quantity: 150, active: true, pharmacies: { name: 'Droga Raia Paulista' }, products: { name: 'Protetor Solar FPS50' } },
  { id: '3', title: 'Desconto Lavitan', description: 'R$10 off', type: 'coupon', quantity: 300, active: true, pharmacies: { name: 'Pague Menos' }, products: { name: 'Lavitan A-Z' } },
  { id: '4', title: 'Campanha Inverno', description: 'Antigripal grátis', type: 'free', quantity: 100, active: true, pharmacies: { name: 'Ultrafarma' }, products: { name: 'Benegrip Multi' } },
  { id: '5', title: 'Drop Exclusivo', description: 'Desconto especial', type: 'discount', quantity: 50, active: false, pharmacies: { name: 'Drogaria SP' }, products: { name: 'Neosaldina' } },
];

export const mockQRCodes = [
  { id: '1', code: 'CIMED-VIT-C-001', type: 'checkin', points_value: 50, active: true, product: 'Vitamina C 1000mg', pharmacy: 'Drogasil Centro' },
  { id: '2', code: 'CIMED-PROT-002', type: 'purchase', points_value: 100, active: true, product: 'Protetor Solar FPS50', pharmacy: 'Droga Raia Paulista' },
  { id: '3', code: 'CIMED-LAV-003', type: 'checkin', points_value: 75, active: true, product: 'Lavitan A-Z', pharmacy: 'Pague Menos' },
  { id: '4', code: 'CIMED-BEN-004', type: 'purchase', points_value: 120, active: false, product: 'Benegrip Multi', pharmacy: 'Ultrafarma' },
  { id: '5', code: 'CIMED-NEO-005', type: 'checkin', points_value: 60, active: true, product: 'Neosaldina', pharmacy: 'Drogaria SP' },
];

export const mockMissions = [
  { id: '1', title: 'Explorador Semanal', description: 'Visite 3 farmácias diferentes', mission_type: 'weekly', reward_value: 200, icon: '🗺️', active: true, progress: 67 },
  { id: '2', title: 'Colecionador de Scans', description: 'Escaneie 10 QR codes', mission_type: 'weekly', reward_value: 350, icon: '📱', active: true, progress: 40 },
  { id: '3', title: 'Mestre dos Drops', description: 'Resgate 5 drops diferentes', mission_type: 'monthly', reward_value: 500, icon: '🎁', active: true, progress: 80 },
  { id: '4', title: 'Social Star', description: 'Siga 10 usuários', mission_type: 'daily', reward_value: 100, icon: '⭐', active: true, progress: 20 },
  { id: '5', title: 'Maratonista Cimed', description: 'Complete 30 missões', mission_type: 'monthly', reward_value: 1000, icon: '🏆', active: true, progress: 55 },
];

export const mockInfluencers = [
  { id: '1', display_name: 'Marina Silva', username: 'marina.silva', commission_balance: 1250.50, drops_created: 12, claims: 340, avatar_url: 'https://i.pravatar.cc/150?img=5', status: 'pending' },
  { id: '2', display_name: 'Lucas Mendes', username: 'lucas.mendes', commission_balance: 890.00, drops_created: 8, claims: 215, avatar_url: 'https://i.pravatar.cc/150?img=12', status: 'pending' },
  { id: '3', display_name: 'Ana Costa', username: 'ana.costa', commission_balance: 2100.75, drops_created: 18, claims: 520, avatar_url: 'https://i.pravatar.cc/150?img=9', status: 'pending' },
  { id: '4', display_name: 'Pedro Oliveira', username: 'pedro.oliv', commission_balance: 450.30, drops_created: 5, claims: 128, avatar_url: 'https://i.pravatar.cc/150?img=15', status: 'pending' },
];

export const mockProfiles = [
  { id: '1', username: 'vitor_xz', level: 12, total_points: 4500, xp: 2800, created_at: '2024-01-15T10:00:00Z', avatar_url: null },
  { id: '2', username: 'marina_play', level: 8, total_points: 2100, xp: 1500, created_at: '2024-02-20T14:30:00Z', avatar_url: null },
  { id: '3', username: 'lucas_gamer', level: 15, total_points: 6200, xp: 4100, created_at: '2024-01-05T08:00:00Z', avatar_url: null },
  { id: '4', username: 'ana_saude', level: 6, total_points: 1350, xp: 900, created_at: '2024-03-10T16:45:00Z', avatar_url: null },
  { id: '5', username: 'pedro_fit', level: 10, total_points: 3200, xp: 2200, created_at: '2024-02-01T12:00:00Z', avatar_url: null },
  { id: '6', username: 'julia_bem', level: 4, total_points: 800, xp: 500, created_at: '2024-04-01T09:00:00Z', avatar_url: null },
  { id: '7', username: 'rafael_med', level: 18, total_points: 8400, xp: 5600, created_at: '2023-12-20T11:00:00Z', avatar_url: null },
  { id: '8', username: 'carla_vita', level: 7, total_points: 1800, xp: 1100, created_at: '2024-03-25T15:30:00Z', avatar_url: null },
];

export const mockAnalyticsData = {
  dailyActiveUsers: [
    { day: 'Seg', users: 320 },
    { day: 'Ter', users: 410 },
    { day: 'Qua', users: 380 },
    { day: 'Qui', users: 450 },
    { day: 'Sex', users: 520 },
    { day: 'Sáb', users: 280 },
    { day: 'Dom', users: 190 },
  ],
  topProducts: [
    { name: 'Vitamina C', scans: 890 },
    { name: 'Lavitan A-Z', scans: 720 },
    { name: 'Protetor Solar', scans: 650 },
    { name: 'Benegrip', scans: 480 },
    { name: 'Neosaldina', scans: 410 },
  ],
  conversionRate: 34.5,
  avgSessionTime: '4m 32s',
  retentionRate: 68.2,
};
