

## Plano: Upgrade Cinematográfico — Painéis User, Influencer e Admin

Vou transformar todos os três painéis em uma experiência visual surreal, profissional e cinematográfica, com glassmorphism, micro-animações, gradientes refinados, e um design system coeso.

### 1. Design System Global (`src/index.css`)
- Adicionar classes utilitárias de glassmorphism: `glass-card`, `glass-header`
- Gradientes cinematográficos: `gradient-hero`, `gradient-card-glow`
- Animações suaves: `animate-slide-in`, `animate-glow`, shimmer em cards premium
- Sombras coloridas: `shadow-accent/20`, `shadow-glow`

### 2. Painel do Usuário (Home + Profile + BottomNav + AppHeader)

**`src/components/layout/AppHeader.tsx`**
- Glassmorphism header: `bg-background/60 backdrop-blur-xl` com borda sutil
- Ícone de notificação com animação pulse no badge
- Avatar com borda gradiente animada (anel dourado)
- Logo com glow sutil

**`src/components/layout/BottomNav.tsx`**
- Glassmorphism: `bg-background/70 backdrop-blur-xl`
- Indicador ativo com dot/linha dourada animada abaixo do ícone
- Botão central (Drops) com anel de glow pulsante mais cinematográfico
- Transição suave nos ícones com scale e color shift

**`src/pages/Home.tsx`**
- Level card com gradiente sutil e borda glow
- Mapa com bordas arredondadas e sombra profunda
- Action cards com hover glow, ícones com fundo gradiente circular, shimmer sutil na borda
- Efeito de profundidade nos cards (sombra layered)

**`src/pages/Profile.tsx`**
- Avatar com anel gradiente animado (dourado → laranja)
- Stats grid com glassmorphism e números animados
- Cards de quick links com hover glow suave e transição cinematográfica
- Badges com efeito de brilho/shimmer nos desbloqueados
- Botão de sair com estilo refinado

### 3. Painel do Influencer

**`src/pages/InfluencerDashboard.tsx`**
- Header com glassmorphism e logo com glow
- Welcome section com gradiente de texto mais forte
- CTA "Criar Drop" com animação de shimmer no botão
- Metric cards com glassmorphism, ícone com fundo gradiente circular, bordas com glow suave
- Quick action cards com hover effect cinematográfico (scale + glow + borda iluminada)
- Gráfico com fundo gradiente sutil e tooltip estilizado

**`src/pages/InfluencerProfile.tsx`**
- Avatar com anel gradiente animado
- Cards de configuração com glassmorphism
- Botão salvar com shimmer animado

### 4. Painel Admin

**`src/components/admin/AdminSidebar.tsx`**
- Fundo com gradiente escuro sutil (não flat)
- Item ativo com glow lateral (barra dourada à esquerda) + fundo glass
- Hover com animação suave de highlight
- Logo com glow pulse sutil
- Separadores com gradiente fade

**`src/pages/AdminDashboard.tsx`**
- Header com glassmorphism premium, avatar com ring glow
- Metric cards com glassmorphism + borda com glow sutil + ícone com gradiente + hover scale
- Gráfico com background com gradiente sutil, grid lines mais elegantes, dots com glow
- Tabela com rows com hover glow sutil, badges com bordas luminosas
- Sidebar direita: cards com glassmorphism, ranking com barras de progresso gradiente, influenciadores com fotos com ring glow
- Botão "Criar Campanha" com shimmer animado

### 5. Dados Mock Melhorados (`src/data/mockData.ts`)
- Adicionar mais campanhas ao admin (5-6 total)
- Adicionar mais influenciadores (5 total com status variados)
- Popular `mockMissionCards` com 3 missões para o user não ver tela vazia
- Popular `mockDrops` com 2-3 drops para o user
- Popular `mockInfluencerCampaigns` com 2 campanhas ativas

### Arquivos a alterar

| Arquivo | Ação |
|---|---|
| `src/index.css` | Adicionar classes glass, glow, shimmer, gradientes cinematográficos |
| `src/components/layout/AppHeader.tsx` | Glassmorphism, avatar ring glow, logo glow |
| `src/components/layout/BottomNav.tsx` | Glassmorphism, indicador ativo animado, center button glow |
| `src/pages/Home.tsx` | Cards com glow, depth shadows, level card premium |
| `src/pages/Profile.tsx` | Avatar ring, glass cards, animated stats |
| `src/pages/InfluencerDashboard.tsx` | Glass header, shimmer CTA, glass metric cards, glow actions |
| `src/pages/InfluencerProfile.tsx` | Avatar ring, glass cards |
| `src/components/admin/AdminSidebar.tsx` | Gradiente bg, active glow bar, hover animations |
| `src/pages/AdminDashboard.tsx` | Glass cards, glow borders, shimmer button, refined chart |
| `src/data/mockData.ts` | Popular drops, missões, campanhas do influencer com dados reais |

### Estilo visual alvo
- **Glassmorphism**: `bg-white/5 backdrop-blur-xl border border-white/10`
- **Glow borders**: `shadow-[0_0_15px_rgba(255,212,0,0.15)]`
- **Shimmer buttons**: Background gradient animado via CSS
- **Avatar rings**: `ring-2 ring-accent/50` com animação pulse
- **Card hover**: `hover:shadow-[0_0_20px_rgba(255,212,0,0.1)] hover:border-accent/30 transition-all duration-300`
- **Depth shadows**: Múltiplas camadas de box-shadow para profundidade 3D

