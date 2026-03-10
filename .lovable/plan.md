

## Plano: Redesign NeoBrutalista — UI/UX Completo

### Visão Geral

Migrar de glassmorphism/depth shadows para **NeoBrutalismo editorial**: bordas pretas grossas, sombras duras (offset sólido), tipografia condensada impactante, cards brancos com hover de deslocamento. Paleta restrita: `#FFD500`, `#0A0A0A`, `#FFFFFF`.

### Sistema de Design

```text
┌─────────────────────────────────────────┐
│  ANTES (Glassmorphism)                  │
│  - glass-card, backdrop-blur            │
│  - shadow-depth (layered soft shadows)  │
│  - rounded-2xl, border-border/20        │
│  - gradient-orange, gradient-yellow     │
│                                         │
│  DEPOIS (NeoBrutalismo)                 │
│  - bg-white, border-[3px] border-black  │
│  - shadow-[4px_4px_0_#0A0A0A]          │
│  - rounded-none ou rounded-sm           │
│  - hover:translate-x-[2px]             │
│    hover:translate-y-[2px]              │
│    hover:shadow-none                    │
└─────────────────────────────────────────┘
```

### Tipografia

Adicionar **Anton** (Google Fonts) para títulos condensados. Inter permanece para corpo de texto.

### Mudanças por Arquivo

**`src/index.css`**
- Importar Anton do Google Fonts
- Remover classes: `glass-card`, `glass-header`, `glass-sidebar`, `glow-border`, `glow-border-hover`, `shadow-depth`, `shadow-depth-lg`, `shadow-depth-xl`, `gradient-orange`, `gradient-yellow`, `text-gradient-orange`, `avatar-ring`, `avatar-ring-square`
- Adicionar novas utilidades brutalistas:
  - `.brutal-card`: `bg-white text-black border-[3px] border-[#0A0A0A] shadow-[4px_4px_0_#0A0A0A]`
  - `.brutal-card-hover`: hover com `translate-x-[2px] translate-y-[2px] shadow-none`
  - `.brutal-card-dark`: `bg-[#0A0A0A] text-white border-[3px] border-[#FFD500] shadow-[4px_4px_0_#FFD500]`
  - `.brutal-btn`: `border-[3px] border-black font-black uppercase tracking-wider`
  - `.brutal-shadow`: `shadow-[4px_4px_0_#0A0A0A]`
  - `.brutal-shadow-yellow`: `shadow-[4px_4px_0_#FFD500]`
- CSS variables: `--background` para `#FFFFFF` no light, `#0A0A0A` no dark
- Remover scrollbar customizado (ou manter preto)

**`src/components/ui/card.tsx`**
- Default card: `border-[3px] border-[#0A0A0A] bg-white text-black shadow-[4px_4px_0_#0A0A0A] rounded-none`

**`src/components/ui/button.tsx`**
- Variant `default`: `bg-[#FFD500] text-black border-[3px] border-black font-black uppercase shadow-[3px_3px_0_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none rounded-none`
- Variant `outline`: `bg-white text-black border-[3px] border-black`
- Variant `destructive`: `bg-black text-white border-[3px] border-black`

**`src/components/layout/AppHeader.tsx`**
- Fundo sólido branco com borda inferior preta grossa (`border-b-[3px] border-black`)
- Remover `glass-header`, backdrop-blur
- Logo "CIMED GO" em Anton, uppercase, grande
- Avatar: quadrado com borda preta, sem avatar-ring

**`src/components/layout/BottomNav.tsx`**
- Fundo branco, `border-t-[3px] border-black`
- Remover glass-header
- Tab ativa: fundo `#FFD500` com borda preta
- Botão central: quadrado com borda preta grossa, fundo amarelo, sem rounded-full

**`src/pages/Home.tsx`**
- Level card: `brutal-card` branco, borda preta, sombra dura
- Map container: borda preta grossa `border-[3px]`, sem rounded
- Action cards: brancos com borda preta, sombra dura, hover com deslocamento
- Ícones em quadrados com borda preta, fundo amarelo
- Progress bar: borda preta, fundo amarelo sólido

**`src/pages/Profile.tsx`**
- Profile card: brutal-card branco
- Stats grid: cada stat com borda preta, sombra dura
- Quick links: borda preta, hover com deslocamento
- Badges: borda preta, fundo branco, earned com fundo amarelo
- Remover glass-card, glow-border

**`src/pages/Login.tsx`**
- Manter fundo amarelo `#FFD500`
- Inputs: borda preta grossa `border-[3px]`, sem rounded, sombra dura
- Botão entrar: preto com sombra amarela `shadow-[4px_4px_0_#FFD500]`
- Google button: borda preta grossa, sombra dura

**`src/pages/AdminDashboard.tsx`**
- Header: fundo preto, borda inferior amarela
- Metric cards: brutal-card branco, borda preta, sombra dura
- Ícones: quadrados com borda preta, fundo amarelo sólido
- Chart card: borda preta, sem glass
- Tabela: bordas pretas, rows com hover amarelo
- Indicadores %: verde/vermelho inline sem caixa (manter)

**`src/pages/InfluencerDashboard.tsx`**
- Mesmo tratamento brutal: cards brancos com borda preta
- CTA button: fundo amarelo, borda preta grossa, sombra dura
- Remover backdrop-blur, glass

**`src/pages/Challenges.tsx`**
- Summary card: fundo preto, borda amarela, sombra amarela

**`src/pages/Drops.tsx` / `src/components/game/DropCard.tsx`**
- Drop cards: borda preta, sombra dura, hover com deslocamento
- Botão resgatar: brutal-btn amarelo

**`src/components/game/ChallengeCard.tsx`**
- Borda preta grossa, sombra dura, ícone em quadrado amarelo

**`src/components/game/BadgeCard.tsx`**
- Borda preta, earned = fundo amarelo, unearned = fundo cinza claro
- Remover glow-orange

**`src/pages/Onboarding.tsx` e `Splash.tsx`**
- Tipografia Anton para título
- Botão brutalista preto com sombra amarela

**`src/pages/Leaderboard.tsx`**
- Back button: quadrado, borda preta, sombra dura

### Arquivos Afetados (14)

| Arquivo | Escopo |
|---|---|
| `index.html` | Importar Anton font |
| `src/index.css` | Novo sistema brutal, remover glass/glow/depth |
| `src/components/ui/card.tsx` | Defaults brutalistas |
| `src/components/ui/button.tsx` | Variants brutalistas |
| `src/components/layout/AppHeader.tsx` | Header sólido com borda |
| `src/components/layout/BottomNav.tsx` | Nav sólida com borda |
| `src/pages/Home.tsx` | Cards e mapa brutalistas |
| `src/pages/Profile.tsx` | Cards e stats brutalistas |
| `src/pages/Login.tsx` | Inputs e botões brutalistas |
| `src/pages/AdminDashboard.tsx` | Dashboard brutalista |
| `src/pages/InfluencerDashboard.tsx` | Dashboard brutalista |
| `src/pages/Challenges.tsx` | Summary brutalista |
| `src/components/game/ChallengeCard.tsx` | Card brutalista |
| `src/components/game/DropCard.tsx` | Card brutalista |
| `src/components/game/BadgeCard.tsx` | Card brutalista |
| `src/pages/Onboarding.tsx` | Tipografia e botão |
| `src/pages/Leaderboard.tsx` | Botão e layout |

### Resultado
- Visual NeoBrutalista editorial com impacto forte
- Tipografia condensada (Anton) para títulos, Inter para texto
- Cards brancos com bordas pretas de 3px e sombras duras (offset sólido)
- Hover com deslocamento físico (translate + shadow-none)
- Zero glassmorphism, zero gradientes suaves, zero blur
- Paleta exclusiva: `#FFD500`, `#0A0A0A`, `#FFFFFF`

