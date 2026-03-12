

## Polish Profissional — Light & Dark Mode

Analisei todas as páginas (Home, Missions, Drops, Leaderboard, Profile, Social, Challenges) e identifiquei problemas de consistência e acabamento em ambos os modos.

### Problemas encontrados

1. **XPBar** usa `gradient-orange` e `rounded-xl` que não existem no design system — visual quebrado
2. **EmptyState** usa `rounded-2xl` e `gradient-orange` — inconsistente com neobrutalism
3. **BottomNav** active state é um bloco amarelo chapado, sem refinamento
4. **brutal-card-dark** no dark mode: preto sobre fundo escuro = invisível
5. **Header** bordas dos botões muito finas e sem presença visual
6. **Todas as páginas**: icon boxes são todos `bg-accent` amarelo idêntico — sem hierarquia
7. **Progress bars** (XPBar, Missions): estilos misturados entre rounded e brutalist

---

### Alterações

**`src/index.css`** — Refinamentos globais:
- `.brutal-card` no dark: adicionar regra `.dark .brutal-card` com `border-color: hsl(0 0% 22%)` e shadow `hsl(0 0% 0% / 0.4)` — bordas mais visíveis
- `.brutal-card-dark` no dark mode: usar `background: hsl(0 0% 14%)` em vez do preto puro para criar contraste com o fundo 6%
- `.brutal-header` no dark: `border-bottom-color: hsl(0 0% 15%)` com accent glow sutil via `box-shadow: 0 1px 0 hsl(var(--accent) / 0.1)`
- Light mode: manter como está (já funciona bem)

**`src/components/game/XPBar.tsx`** — Alinhar ao design system:
- Trocar `rounded-xl gradient-orange` por estilo brutalist: quadrado, `bg-accent border-[2px] border-border`
- Progress bar: quadrada, `bg-muted border-[2px] border-border`, fill `bg-accent`

**`src/components/ui/empty-state.tsx`** — Alinhar ao design system:
- Trocar `rounded-2xl bg-secondary` por quadrado `border-[3px] border-border bg-muted`
- Remover `gradient-orange rounded-xl` do botão

**`src/components/layout/BottomNav.tsx`** — Polir active state:
- Active tab: remover bg amarelo chapado, usar borda superior accent `border-t-2 border-accent` + texto accent
- Inactive: manter cinza sutil
- Dark mode: bg `hsl(var(--card))` em vez de background puro

**`src/components/layout/AppHeader.tsx`** — Mais presença:
- Botões: `bg-card` em vez de transparente para dar corpo
- Dark mode: borda header mais sutil com toque de accent

**`src/pages/Home.tsx`** — Polir detalhes:
- Action cards icon boxes: dark mode usar `dark:bg-accent/15 dark:border-border/50` com ícone `dark:text-accent`
- Map container: dark mode shadow mais profundo

**`src/pages/Profile.tsx`** — Polir stat grid:
- Dark mode: icon boxes usar `bg-accent/15` em vez de `bg-accent` sólido (menos agressivo)
- Quick links: dark mode com `bg-card` explícito e bordas mais suaves

**`src/pages/Missions.tsx`** — Polir mission cards:
- Dark mode: icon box `bg-accent/15` com ícone `text-accent`
- Progress bar border mais suave no dark

**`src/pages/Drops.tsx`** — Polir drop cards:
- Header do drop card: dark mode `bg-accent/10` em vez de `bg-accent` sólido
- Timer badges: dark mode com fundo card

**`src/pages/Leaderboard.tsx`** — Polir ranking:
- Top 3: dark mode com accent/15 em vez de accent sólido
- My rank card (brutal-card-dark): vai herdar o fix global

**`src/pages/Social.tsx`** e **`src/pages/Challenges.tsx`**:
- Herdam os fixes globais do brutal-card e brutal-card-dark

### Resultado
Visual coeso em ambos os modos com hierarquia clara, componentes alinhados ao design system brutalist, dark mode com camadas distintas e light mode limpo e profissional.

