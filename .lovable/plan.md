

## Plan: Dark Mode Cinematográfico

O problema principal: no dark mode, `--border` é branco puro (`0 0% 100%`), criando contornos brancos grossos em todos os cards, botões e elementos — visual agressivo e "feio".

### Alterações

**`src/index.css`** — Ajustar variáveis do `.dark`:
- `--border`: de branco puro para cinza escuro sutil (`0 0% 20%`) — bordas discretas
- `--input`: idem, `0 0% 20%`
- `--card`: de `0 0% 8%` para `0 0% 7%` — cards mais profundos
- `--muted`: de `0 0% 14%` para `0 0% 12%`
- `--muted-foreground`: de `0 0% 55%` para `0 0% 50%`

**`src/index.css`** — Ajustar `.brutal-card-dark`:
- Box-shadow usar cor mais sutil no dark mode

**`src/pages/InfluencerDashboard.tsx`**:
- Cards de métricas: trocar ícone boxes de `bg-accent` para `bg-accent/20` com ícone `text-accent` (menos amarelo gritante)
- Remover bordas explícitas `border-[2px] border-border` dos itens de drops internos, usar `border-border/30` para sutileza
- Header: suavizar bordas dos botões para `border-border/50`

**`src/components/ui/card.tsx`**:
- No dark mode, usar shadow mais sutil: adicionar classe condicional ou ajustar o shadow via CSS variable para que no dark o offset shadow seja mais escuro/sutil em vez de branco

### Resultado
Visual escuro com profundidade em camadas, bordas sutis cinza ao invés de brancas, sensação cinematográfica sem perder a identidade neobrutalist.

