

## Plano: Paleta Preta/Amarela/Branca + Profundidade sem Brilho

### Problema

Cores fora da paleta (azul, ciano, verde, roxo, rosa) nos gradientes de ícones e badges. Efeitos de glow (`glow-border`, `glow-border-hover`, `glow-orange`, `glow-yellow`) criam brilho em vez de profundidade. `shimmer-btn` ainda presente em alguns botões.

### Solução

Substituir todos os gradientes coloridos por variações de amarelo/laranja escuro. Trocar glow por sombras pretas profundas (depth). Remover shimmer restante.

### Mudanças

**`src/index.css`**
- `.glow-border`: trocar box-shadow de cor accent para sombra preta profunda (inset border sutil + shadow preto)
- `.glow-border-hover:hover`: remover glow colorido, usar apenas `translateY(-2px)` + sombra preta mais forte
- Remover `.glow-orange` e `.glow-yellow`
- `.shimmer-btn`: remover completamente (hover já funciona com opacity)

**`src/pages/Home.tsx`**
- Action cards: trocar gradientes `from-blue-500/20`, `from-purple-500/20` por variações de amarelo escuro (`from-accent/15 to-accent/5`)
- Remover `shimmer-btn` do botão de câmera
- Remover `glow-border` do level card, usar apenas `shadow-depth`

**`src/pages/Profile.tsx`**
- Quick links: todos os gradientes coloridos → `from-accent/15 to-accent/5` (amarelo escuro uniforme)
- Stats: manter `gradient-yellow` nos ícones (já está na paleta)

**`src/pages/AdminDashboard.tsx`**
- `metricGradients`: todos → variações de amarelo/laranja escuro em vez de azul/verde/roxo
- Badges de change: trocar `bg-green-500/15 text-green-400` por `bg-accent/15 text-accent`

**`src/pages/InfluencerDashboard.tsx`**
- Metric gradientes: todos → amarelo escuro
- Badge de change: `bg-accent/15 text-accent` em vez de green
- Remover `shimmer-btn` do botão CTA
- Remover blur glow do logo (`bg-accent/20 blur-md`)

**`src/components/layout/AppHeader.tsx`**
- Remover `blur-lg` glow atrás do logo (div com `bg-accent/20 rounded-full blur-lg`)
- Avatar: remover `shadow-lg shadow-accent/30`, usar `shadow-depth`

**`src/components/layout/BottomNav.tsx`**
- Botão central: remover `blur-xl opacity-20` glow div, manter apenas sombra preta profunda
- Indicador ativo: remover `shadow-[0_0_8px_hsl(var(--accent)/0.6)]` (glow), usar barra sólida sem glow

### Resultado
- Zero brilhos/glows coloridos
- Profundidade via sombras pretas em camadas
- Paleta restrita: preto, amarelo (#FFD400), laranja (#FF6A00), branco
- Cards destacam pela elevação (shadow), não pelo brilho

