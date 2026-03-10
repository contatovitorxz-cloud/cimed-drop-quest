

## Dark Mode Cinematográfico - Refinamento

### Problemas atuais
O dark mode tem contraste confuso: bordas cinzas sobre fundo quase preto se perdem, cards não se diferenciam do fundo, e os elementos não têm hierarquia visual clara. O `--border` em 20% e `--card` em 7% sobre `--background` 4% cria camadas quase indistinguíveis.

### Alterações

**`src/index.css`** — Variáveis `.dark` com mais contraste e camadas:
- `--background`: `0 0% 6%` (subir levemente para dar margem)
- `--card`: `0 0% 10%` (mais claro que o fundo, criando camadas visíveis)
- `--popover`: `0 0% 10%`
- `--secondary`: `0 0% 16%`
- `--muted`: `0 0% 14%`
- `--muted-foreground`: `0 0% 55%` (mais legível)
- `--foreground`: `0 0% 95%` (off-white, menos agressivo que branco puro)
- `--card-foreground`: `0 0% 95%`
- `--border`: `0 0% 18%` (sutil mas presente)
- `--input`: `0 0% 18%`

**`src/components/ui/card.tsx`**:
- Dark shadow mais sutil: `dark:shadow-[4px_4px_0_hsl(0_0%_0%/0.5)]` e `dark:border-[hsl(0_0%_16%)]` via classe para separar cards do fundo

**`src/pages/InfluencerDashboard.tsx`**:
- Header: usar `dark:border-b-accent/20` para um toque de cor no separador
- Metric icon boxes: remover borda, usar apenas `bg-accent/10` no dark
- Drop list items: usar `dark:bg-muted/50` como fundo sutil para cada item em vez de só borda
- Status badges: no dark, `border-border/20` em vez de `border-border` cheio
- Gráfico tooltip: ajustar border para `2px` no dark

**`src/components/ui/button.tsx`**:
- Variante default no dark: `dark:shadow-[3px_3px_0_hsl(0_0%_0%/0.5)]` para shadow mais profundo e cinematográfico

**`src/components/layout/InfluencerBottomNav.tsx`**:
- Usar `dark:bg-background` e `dark:border-t-accent/15` para um brilho sutil amarelo na borda superior

### Resultado
Hierarquia visual clara com camadas distinguíveis (fundo < card < elementos), texto off-white confortável, toques de accent amarelo como guia visual, sombras profundas que criam dimensão.

