

## Plano: Remover animações piscantes e refinar para estética profissional sóbria

### Problema identificado

As "cores piscando" vêm de animações excessivas no CSS:

1. **`ring-rotate`** — faz `hue-rotate(0deg → 360deg)` nos avatar rings, literalmente ciclando pelo arco-íris. Principal ofensor.
2. **`animate-glow-breathe`** — glow pulsante no logo e no botão central do BottomNav
3. **`shimmer`** — luz deslizando nos botões CTA infinitamente
4. **`animate-pulse`** — badge de notificação piscando
5. **`glow-pulse`** — box-shadow pulsante nos markers
6. **`float`/`bounce-idle`** — markers flutuando no mapa

### Solução

Manter o design glass/depth mas **eliminar toda animação repetitiva infinita**. Substituir por transições suaves de hover/interação (profissional, não circo).

### Arquivos a alterar

| Arquivo | Mudança |
|---|---|
| `src/index.css` | Remover `ring-rotate` hue-rotate, tornar `avatar-ring` um gradiente estático. Remover `shimmer` infinito (manter só no hover). Remover `glow-breathe` infinito. Remover `center-tab-glow`. Manter `slide-up` e `stagger-children` (entradas). |
| `src/components/layout/AppHeader.tsx` | Remover `animate-glow-breathe` do logo. Avatar ring estático (sem animação). Badge sem `animate-pulse`. |
| `src/components/layout/BottomNav.tsx` | Remover `animate-glow-breathe` do botão central. Remover classe `shimmer-btn`. Simplificar glow para sombra estática. |
| `src/pages/AdminDashboard.tsx` | Remover `shimmer-btn` do botão "Criar Campanha". Avatar ring estático. |
| `src/pages/InfluencerDashboard.tsx` | Remover `shimmer-btn`, `animate-glow-breathe`. |
| `src/pages/Profile.tsx` | Avatar ring estático. |

### Resultado esperado

- Cores sólidas e estáticas — nenhum elemento piscando ou ciclando cores
- Glassmorphism e depth shadows mantidos (visual premium)
- Hover effects suaves (scale, border-color, shadow) mantidos
- Stagger de entrada mantido (só roda 1x)
- Estética limpa, escura, profissional — nível dashboard corporativo

