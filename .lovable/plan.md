

## Plano: Redesign NeoBrutalista do Perfil do Influencer

### Problema
A página `InfluencerProfile.tsx` ainda usa classes antigas removidas no redesign (`glass-card`, `glass-header`, `glow-border`, `gradient-yellow`, `avatar-ring`, `shadow-depth`, `text-gradient-orange`, `shimmer-btn`). Resultado: visual quebrado e inconsistente.

### Mudanças em `src/pages/InfluencerProfile.tsx`

**Header** — Substituir header custom com `glass-header` pelo `AppHeader` compartilhado + botão voltar separado.

**Avatar** — Remover `avatar-ring` e `rounded-full`. Usar quadrado com `border-[3px] border-border`, fundo `bg-accent`. Botão câmera: quadrado com borda preta e fundo amarelo.

**Cards (Nome, PIX, Comissão)** — Trocar `glass-card glow-border-hover shadow-depth border-0` por `brutal-card`. Inputs com `border-[3px] border-border bg-background`. Ícones em quadrados com borda preta e fundo amarelo (`bg-accent`).

**Saldo de Comissão** — Remover `text-gradient-orange`, usar `text-accent font-black`. Card com `brutal-card`.

**Botão Salvar** — Remover `gradient-yellow rounded-xl shadow-lg shimmer-btn`. Usar button default do sistema (amarelo brutalista com sombra dura).

**Botão Solicitar Saque** — Estilo `variant="outline"` padrão brutalista.

### Resultado
Página 100% consistente com o design NeoBrutalista: bordas grossas, sombras duras, zero glass/blur/gradients, paleta `#FFD500`/`#0A0A0A`/`#FFFFFF`.

