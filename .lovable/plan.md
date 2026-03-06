

## Plano: Profissionalizar toda a UI — Remover cara de IA, dados fictícios e polir estrutura

O app tem vários problemas que o fazem parecer um protótipo gerado por IA: dados hardcoded com emojis como avatares, números fictícios visíveis, textos genéricos, e falta de estados vazios reais. Vou resolver tudo isso.

---

### 1. Remover dados fictícios e usar estados vazios reais

**`src/pages/Home.tsx`**
- Remover valores hardcoded ("Nível 4", "1.250 pontos", "750 XP para o nível 5")
- Mostrar estado de "novo usuário" com dados zerados ou vindos do contexto de auth (nome real do usuário logado)
- Remover badge "2" e distância "130m" hardcoded dos action cards
- Usar o nome do usuário autenticado do `useAuth()` no level card

**`src/pages/Profile.tsx`**
- Remover stats hardcoded ("2.450", "#142", "89", "8") — mostrar traços ("—") ou "0" como estado inicial
- Remover emojis de avatares ("⭐", "🏆") dos stats e usar ícones Lucide

**`src/pages/Leaderboard.tsx`**
- Remover lista hardcoded com nomes fictícios ("MariaCarmed", "LucasExplorer") e emojis como avatares
- Mostrar estado vazio com mensagem "Sem dados de ranking disponíveis" e ilustração

**`src/pages/Drops.tsx`**
- Remover contagem hardcoded de drops no banner
- Mostrar estado vazio quando não houver drops

**`src/pages/Missions.tsx`**
- Mostrar estado vazio quando não houver missões

**`src/pages/Social.tsx`**
- Remover feed com dados fictícios e emojis de avatares
- Mostrar estado vazio elegante

**`src/pages/Analytics.tsx`**
- Remover métricas fictícias hardcoded
- Mostrar estado vazio com mensagem "Dados disponíveis após primeiras atividades"

**`src/pages/InfluencerDashboard.tsx`**
- Remover "Virginia Fonseca" hardcoded — usar dados do auth
- Remover métricas fictícias — mostrar "0" como estado inicial
- Remover campanhas, QR codes e performance data fictícia — mostrar estados vazios

**`src/pages/AdminDashboard.tsx`**
- Remover métricas fictícias — mostrar "0"
- Remover tabelas com dados fictícios — mostrar estados vazios nas tabelas

---

### 2. Substituir emojis por ícones profissionais (Lucide)

Em todo o app, substituir emojis usados como avatares/ícones por ícones Lucide ou iniciais em círculos coloridos:

- **Badges**: Trocar "🏆", "🗺️", "⭐" por ícones Lucide (`Trophy`, `Map`, `Star`, `Smartphone`, `Gift`, `Footprints`)
- **Social feed avatares**: Trocar "👸", "🧑‍🚀" por iniciais com cores
- **Leaderboard avatares**: Trocar emojis por iniciais em círculos
- **Admin influencers avatares**: Trocar emojis por iniciais
- **Products**: Trocar emojis ("🍬", "💄") por placeholder mais profissional ou simplesmente remover

**`src/data/mockData.ts`**
- Trocar todos os campos `icon`/`avatar`/`image_url` que usam emojis por strings de ícone Lucide (ex: `'trophy'`, `'map'`, `'star'`)
- Componentes interpretam essas strings e renderizam o ícone Lucide correspondente

---

### 3. Melhorar estrutura visual e eliminar padrões de "gerado por IA"

**`src/components/layout/AppHeader.tsx`**
- Usar nome real do usuário autenticado em vez de "JA" hardcoded

**`src/components/game/BadgeCard.tsx`**
- Renderizar ícones Lucide em vez de emojis

**`src/pages/Home.tsx`**
- Integrar `useAuth()` para exibir nome real do usuário

**Todas as páginas**
- Criar um componente `EmptyState` reutilizável com ícone, título e descrição para usar em todas as páginas quando não houver dados

---

### 4. Criar componente EmptyState

**Novo arquivo `src/components/ui/empty-state.tsx`**
- Props: `icon` (Lucide component), `title`, `description`, `action?` (botão opcional)
- Design minimalista com ícone centralizado, texto claro, e CTA opcional

---

### Resumo de arquivos

| Arquivo | Ação |
|---|---|
| `src/components/ui/empty-state.tsx` | Criar — componente reutilizável |
| `src/data/mockData.ts` | Trocar emojis por strings de ícone Lucide, manter estruturas mas limpar |
| `src/pages/Home.tsx` | Usar auth, remover dados hardcoded |
| `src/pages/Profile.tsx` | Usar auth, remover stats fictícios, ícones Lucide |
| `src/pages/Leaderboard.tsx` | Estado vazio, remover dados fictícios |
| `src/pages/Drops.tsx` | Estado vazio |
| `src/pages/Missions.tsx` | Estado vazio |
| `src/pages/Social.tsx` | Estado vazio, remover emojis |
| `src/pages/Analytics.tsx` | Estado vazio |
| `src/pages/InfluencerDashboard.tsx` | Usar auth, estados vazios, remover "Virginia" |
| `src/pages/AdminDashboard.tsx` | Estados vazios nas tabelas |
| `src/components/layout/AppHeader.tsx` | Usar auth para iniciais do avatar |
| `src/components/game/BadgeCard.tsx` | Renderizar ícones Lucide |

Total: 1 novo arquivo + 12 modificados.

