// Dados fake para o Admin Dashboard quando o banco está vazio

import saborEnergeticoAvatar from '@/assets/sabor-energetico.png';

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
  {
    id: '5', display_name: 'saBOR energético', username: 'sabor.energetico', commission_balance: 8750.00, drops_created: 45, claims: 2100,
    avatar_url: saborEnergeticoAvatar, status: 'pending',
    followers_total: 24530000, instagram: '@saborenergetico', tiktok: '@saborenergetico', youtube: 'saBOR energético',
    instagram_followers: 10700000, tiktok_followers: 5600000, youtube_followers: 8230000, niche: 'Lifestyle & Energia',
  },
  {
    id: '1', display_name: 'Marina Silva', username: 'marina.silva', commission_balance: 1250.50, drops_created: 12, claims: 340,
    avatar_url: 'https://i.pravatar.cc/150?img=5', status: 'pending',
    followers_total: 820000, instagram: '@marina.silva', tiktok: '@marinasilva', youtube: 'Marina Silva',
    instagram_followers: 380000, tiktok_followers: 310000, youtube_followers: 130000, niche: 'Saúde & Bem-estar',
  },
  {
    id: '2', display_name: 'Lucas Mendes', username: 'lucas.mendes', commission_balance: 890.00, drops_created: 8, claims: 215,
    avatar_url: 'https://i.pravatar.cc/150?img=12', status: 'pending',
    followers_total: 450000, instagram: '@lucas.mendes', tiktok: '@lucasmendes', youtube: 'Lucas Mendes',
    instagram_followers: 210000, tiktok_followers: 170000, youtube_followers: 70000, niche: 'Fitness & Nutrição',
  },
  {
    id: '3', display_name: 'Ana Costa', username: 'ana.costa', commission_balance: 2100.75, drops_created: 18, claims: 520,
    avatar_url: 'https://i.pravatar.cc/150?img=9', status: 'pending',
    followers_total: 1200000, instagram: '@ana.costa', tiktok: '@anacosta', youtube: 'Ana Costa',
    instagram_followers: 560000, tiktok_followers: 420000, youtube_followers: 220000, niche: 'Beleza & Skincare',
  },
  {
    id: '4', display_name: 'Pedro Oliveira', username: 'pedro.oliv', commission_balance: 450.30, drops_created: 5, claims: 128,
    avatar_url: 'https://i.pravatar.cc/150?img=15', status: 'pending',
    followers_total: 290000, instagram: '@pedro.oliv', tiktok: '@pedrooliv', youtube: 'Pedro Oliveira',
    instagram_followers: 140000, tiktok_followers: 100000, youtube_followers: 50000, niche: 'Farmácia & Saúde',
  },
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

export const mockInfluencerSales = [
  { id: '1', name: 'saBOR energético', avatar_url: saborEnergeticoAvatar, vendas: 1240, receita: 62000, comissao: 8750, conversao: 18.5 },
  { id: '2', name: 'Ana Costa', avatar_url: 'https://i.pravatar.cc/150?img=9', vendas: 890, receita: 44500, comissao: 2100.75, conversao: 15.2 },
  { id: '3', name: 'Marina Silva', avatar_url: 'https://i.pravatar.cc/150?img=5', vendas: 620, receita: 31000, comissao: 1250.50, conversao: 12.8 },
  { id: '4', name: 'Lucas Mendes', avatar_url: 'https://i.pravatar.cc/150?img=12', vendas: 430, receita: 21500, comissao: 890, conversao: 10.1 },
  { id: '5', name: 'Pedro Oliveira', avatar_url: 'https://i.pravatar.cc/150?img=15', vendas: 256, receita: 12800, comissao: 450.30, conversao: 8.7 },
];

export const mockSalesOverview = {
  receitaTotal: 284300,
  vendasInfluencer: 3436,
  vendasOrganicas: 5120,
  taxaConversao: 13.4,
  ticketMedio: 33.20,
};

export const mockSalesChart = [
  { month: 'Jan', organico: 380, influencer: 180 },
  { month: 'Fev', organico: 420, influencer: 260 },
  { month: 'Mar', organico: 510, influencer: 340 },
  { month: 'Abr', organico: 480, influencer: 390 },
  { month: 'Mai', organico: 620, influencer: 480 },
  { month: 'Jun', organico: 700, influencer: 560 },
  { month: 'Jul', organico: 680, influencer: 620 },
  { month: 'Ago', organico: 830, influencer: 710 },
];

export const mockSalesStatus = {
  aprovados: { valor: 198500, vendas: 312, percent: 78.2 },
  aguardando: { valor: 42300, vendas: 58, percent: 14.5 },
  reembolsados: { valor: 18200, vendas: 29, percent: 7.3 },
};

export const mockPaymentMethods = [
  { tipo: 'Cartão Crédito', valor: 142800, vendas: 198, percent: 55.1 },
  { tipo: 'Pix', valor: 89400, vendas: 156, percent: 34.5 },
  { tipo: 'Boleto', valor: 26800, vendas: 45, percent: 10.4 },
];

export const mockSalesTypes = [
  { tipo: 'Venda Direta', valor: 118200, vendas: 186, percent: 45.6 },
  { tipo: 'Via Influencer', valor: 98700, vendas: 142, percent: 35.6 },
  { tipo: 'Orgânica', valor: 42100, vendas: 71, percent: 17.8 },
];

export const mockTopOffers = [
  { posicao: 1, nome: 'Vitamina C 1000mg', vendas: 89, total: 4450 },
  { posicao: 2, nome: 'Lavitan A-Z', vendas: 72, total: 3600 },
  { posicao: 3, nome: 'Protetor Solar FPS50', vendas: 58, total: 4060 },
  { posicao: 4, nome: 'Benegrip Multi', vendas: 43, total: 2580 },
];

export const mockSalesTransactions = [
  { id: '1', codigo: 'VND-0847A3', tags: ['influencer'], cliente: 'João da Silva', tipo_venda: 'Via Influencer', sku: 'CIM-VIT-001', produto: 'Vitamina C 1000mg', qtd: 2, cod_checkout: 'CHK-9182', nome_checkout: 'Checkout Cimed GO', source: 'saBOR energético', valor: 99.80, data: '2026-03-12T14:30:00Z' },
  { id: '2', codigo: 'VND-0848B1', tags: ['organico'], cliente: 'Maria Oliveira', tipo_venda: 'Orgânica', sku: 'CIM-LAV-002', produto: 'Lavitan A-Z', qtd: 1, cod_checkout: 'CHK-9183', nome_checkout: 'Checkout Cimed GO', source: 'Orgânico', valor: 49.90, data: '2026-03-12T13:15:00Z' },
  { id: '3', codigo: 'VND-0849C7', tags: ['influencer'], cliente: 'Pedro Santos', tipo_venda: 'Via Influencer', sku: 'CIM-PROT-003', produto: 'Protetor Solar FPS50', qtd: 1, cod_checkout: 'CHK-9184', nome_checkout: 'Checkout Cimed GO', source: 'Ana Costa', valor: 69.90, data: '2026-03-12T11:45:00Z' },
  { id: '4', codigo: 'VND-0850D2', tags: ['direto'], cliente: 'Ana Ferreira', tipo_venda: 'Venda Direta', sku: 'CIM-BEN-004', produto: 'Benegrip Multi', qtd: 3, cod_checkout: 'CHK-9185', nome_checkout: 'Checkout Cimed GO', source: 'Orgânico', valor: 89.70, data: '2026-03-11T16:20:00Z' },
  { id: '5', codigo: 'VND-0851E9', tags: ['influencer'], cliente: 'Lucas Mendes', tipo_venda: 'Via Influencer', sku: 'CIM-NEO-005', produto: 'Neosaldina', qtd: 2, cod_checkout: 'CHK-9186', nome_checkout: 'Checkout Cimed GO', source: 'Marina Silva', valor: 39.80, data: '2026-03-11T10:00:00Z' },
  { id: '6', codigo: 'VND-0852F4', tags: ['organico'], cliente: 'Carla Ribeiro', tipo_venda: 'Orgânica', sku: 'CIM-VIT-001', produto: 'Vitamina C 1000mg', qtd: 1, cod_checkout: 'CHK-9187', nome_checkout: 'Checkout Cimed GO', source: 'Orgânico', valor: 49.90, data: '2026-03-10T09:30:00Z' },
  { id: '7', codigo: 'VND-0853G8', tags: ['influencer'], cliente: 'Roberto Lima', tipo_venda: 'Via Influencer', sku: 'CIM-LAV-002', produto: 'Lavitan A-Z', qtd: 4, cod_checkout: 'CHK-9188', nome_checkout: 'Checkout Cimed GO', source: 'saBOR energético', valor: 199.60, data: '2026-03-10T15:45:00Z' },
  { id: '8', codigo: 'VND-0854H1', tags: ['direto'], cliente: 'Fernanda Costa', tipo_venda: 'Venda Direta', sku: 'CIM-PROT-003', produto: 'Protetor Solar FPS50', qtd: 1, cod_checkout: 'CHK-9189', nome_checkout: 'Checkout Cimed GO', source: 'Orgânico', valor: 69.90, data: '2026-03-09T12:00:00Z' },
  { id: '9', codigo: 'VND-0855I5', tags: ['influencer'], cliente: 'Thiago Alves', tipo_venda: 'Via Influencer', sku: 'CIM-BEN-004', produto: 'Benegrip Multi', qtd: 1, cod_checkout: 'CHK-9190', nome_checkout: 'Checkout Cimed GO', source: 'Pedro Oliveira', valor: 29.90, data: '2026-03-09T08:20:00Z' },
  { id: '10', codigo: 'VND-0856J3', tags: ['organico'], cliente: 'Juliana Martins', tipo_venda: 'Orgânica', sku: 'CIM-VIT-001', produto: 'Vitamina C 1000mg', qtd: 2, cod_checkout: 'CHK-9191', nome_checkout: 'Checkout Cimed GO', source: 'Orgânico', valor: 99.80, data: '2026-03-08T14:10:00Z' },
  { id: '11', codigo: 'VND-0857K7', tags: ['influencer'], cliente: 'Marcos Souza', tipo_venda: 'Via Influencer', sku: 'CIM-NEO-005', produto: 'Neosaldina', qtd: 1, cod_checkout: 'CHK-9192', nome_checkout: 'Checkout Cimed GO', source: 'Lucas Mendes', valor: 19.90, data: '2026-03-08T11:30:00Z' },
  { id: '12', codigo: 'VND-0858L2', tags: ['direto'], cliente: 'Patricia Gomes', tipo_venda: 'Venda Direta', sku: 'CIM-LAV-002', produto: 'Lavitan A-Z', qtd: 1, cod_checkout: 'CHK-9193', nome_checkout: 'Checkout Cimed GO', source: 'Orgânico', valor: 49.90, data: '2026-03-07T17:00:00Z' },
];

export const mockNationalCampaigns = [
  {
    id: '1',
    nome: 'Operação Verão Cimed',
    descricao: 'Campanha nacional de proteção solar e vitaminas para o verão brasileiro',
    status: 'ativa' as const,
    inicio: '2026-02-01T00:00:00Z',
    fim: '2026-04-30T23:59:59Z',
    metaFaturamento: 5000000,
    faturamentoAtual: 2430000,
    alcanceTotal: 847000,
    resgates: 12400,
    conversao: 14.6,
    trafegoExterno: 312000,
    canais: { push: true, whatsapp: true, instagram: true, tiktok: true, email: true },
    regioes: ['Brasil Todo'],
    produtos: ['Protetor Solar FPS50', 'Vitamina C 1000mg', 'Lavitan A-Z'],
    desconto: '30% OFF em Protetor + Vitamina C',
    msgPush: '☀️ OPERAÇÃO VERÃO CIMED! 30% OFF em Protetor Solar + Vitamina C. Corra pra farmácia mais perto!',
    drops: [
      { id: 'd1', nome: 'Drop Protetor Solar', estoque: 5000, resgatados: 3200, status: 'ativo' },
      { id: 'd2', nome: 'Drop Vitamina C Verão', estoque: 8000, resgatados: 5100, status: 'ativo' },
      { id: 'd3', nome: 'Drop Kit Verão Completo', estoque: 2000, resgatados: 2000, status: 'esgotado' },
    ],
    metricas: {
      pushEnviados: 534000,
      pushAbertos: 178000,
      whatsappEnviados: 89000,
      emailEnviados: 210000,
      cliquesAds: 312000,
    },
    regiaoBreakdown: [
      { regiao: 'Sudeste', alcance: 380000, vendas: 5200 },
      { regiao: 'Sul', alcance: 145000, vendas: 2100 },
      { regiao: 'Nordeste', alcance: 198000, vendas: 2800 },
      { regiao: 'Centro-Oeste', alcance: 74000, vendas: 1200 },
      { regiao: 'Norte', alcance: 50000, vendas: 1100 },
    ],
  },
  {
    id: '2',
    nome: 'Black Friday Cimed 2025',
    descricao: 'Maior campanha de descontos do ano em toda a linha Cimed',
    status: 'encerrada' as const,
    inicio: '2025-11-20T00:00:00Z',
    fim: '2025-11-30T23:59:59Z',
    metaFaturamento: 8000000,
    faturamentoAtual: 7200000,
    alcanceTotal: 1230000,
    resgates: 28500,
    conversao: 23.1,
    trafegoExterno: 560000,
    canais: { push: true, whatsapp: true, instagram: true, tiktok: true, email: true },
    regioes: ['Brasil Todo'],
    produtos: ['Todos os produtos'],
    desconto: 'Até 50% OFF em toda linha',
    msgPush: '🖤 BLACK FRIDAY CIMED! Até 50% OFF em TUDO. Só até domingo!',
    drops: [],
    metricas: { pushEnviados: 890000, pushAbertos: 356000, whatsappEnviados: 210000, emailEnviados: 450000, cliquesAds: 560000 },
    regiaoBreakdown: [],
  },
  {
    id: '3',
    nome: 'Volta às Aulas Saudável',
    descricao: 'Campanha de vitaminas e suplementos para o início do ano letivo',
    status: 'encerrada' as const,
    inicio: '2026-01-15T00:00:00Z',
    fim: '2026-02-15T23:59:59Z',
    metaFaturamento: 3000000,
    faturamentoAtual: 2100000,
    alcanceTotal: 520000,
    resgates: 8900,
    conversao: 17.1,
    trafegoExterno: 180000,
    canais: { push: true, whatsapp: false, instagram: true, tiktok: false, email: true },
    regioes: ['Sudeste', 'Sul', 'Centro-Oeste'],
    produtos: ['Lavitan A-Z', 'Vitamina C 1000mg'],
    desconto: '25% OFF em Lavitan + Vitamina C',
    msgPush: '📚 Volta às aulas com saúde! 25% OFF em Lavitan e Vitamina C.',
    drops: [],
    metricas: { pushEnviados: 340000, pushAbertos: 119000, whatsappEnviados: 0, emailEnviados: 150000, cliquesAds: 180000 },
    regiaoBreakdown: [],
  },
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
