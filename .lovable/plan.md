

## Polish Profissional v3 — Dark Mode Premium

O dark mode está "achatado" — cards se misturam com o fundo, bordas são quase invisíveis, e não há hierarquia visual. Vou refinar globalmente.

### Alterações

**`src/index.css`** — Refinar dark mode variables e classes:
- Dark `--border`: subir de `0 0% 18%` para `0 0% 22%` — bordas mais visíveis
- Dark `--muted`: subir de `0 0% 14%` para `0 0% 16%` — skeletons e fundos mais distintos
- Dark `--card`: subir de `0 0% 10%` para `0 0% 11%` — cards ligeiramente mais claros
- `.brutal-card` dark: border `hsl(0 0% 25%)` para melhor contraste
- `.brutal-card-dark` dark: fundo `hsl(0 0% 8%)` com borda `hsl(0 0% 25%)` 
- `.brutal-header` dark: borda `hsl(0 0% 22%)` + `box-shadow: 0 1px 8px hsl(0 0% 0% / 0.3)` para profundidade
- Nova classe `.brutal-card-elevated` para cards destaque no dark (borda accent/20)

**`src/components/layout/BottomNav.tsx`** — Dark mode premium:
- Background: `dark:bg-[hsl(0,0%,8%)]` (mais escuro que card, cria separação)
- Borda top: `dark:border-t-[hsl(0,0%,25%)]` para visibilidade real
- Center button: adicionar `dark:border-[hsl(0,0%,25%)]` + `dark:shadow-[3px_3px_0_hsl(0,0%,0%/0.5)]`

**`src/components/layout/AppHeader.tsx`** — Profundidade no dark:
- Fundo: adicionar `dark:bg-[hsl(0,0%,7%)]` para separar do conteúdo
- Botões: `dark:border-[hsl(0,0%,25%)]` + `dark:shadow-[2px_2px_0_hsl(0,0%,0%/0.4)]`

**`src/components/game/XPBar.tsx`** — Dark treatment:
- Level box: `dark:bg-accent/20 dark:text-accent dark:border-[hsl(0,0%,25%)]`
- Progress bar: `dark:border-accent/40` para visibilidade

**`src/pages/Home.tsx`** — Refinamento dark:
- Map container: `dark:border-[hsl(0,0%,25%)]` + `dark:shadow-[4px_4px_0_hsl(0,0%,0%/0.5)]`
- Action cards icon box: já tem dark treatment — manter
- Badge counter: `dark:border-[hsl(0,0%,25%)]`

**`src/pages/Profile.tsx`** — Badges dark mode:
- Badge grid items no dark: trocar `bg-accent` sólido por `dark:bg-accent/15 dark:text-accent dark:border-[hsl(0,0%,25%)]`
- Share button: `dark:border-[hsl(0,0%,25%)]`

**`src/pages/Leaderboard.tsx`** — Contraste:
- My rank card brutal-card-dark: já usa a classe — melhorado pelo CSS global
- Rank boxes: `dark:border-[hsl(0,0%,25%)]` para todos

**`src/pages/Missions.tsx`** — Dark refinement:
- Progress bar: `dark:border-[hsl(0,0%,25%)]`
- Step boxes expanded: `dark:border-[hsl(0,0%,25%)]`
- Type badges: `dark:border-[hsl(0,0%,25%)]`

**`src/pages/Drops.tsx`** — Dark refinement:
- Drop card header: `dark:border-b-[hsl(0,0%,25%)]`
- Timer badges: `dark:border-[hsl(0,0%,25%)]`
- Influencer drop header: `dark:border-b-[hsl(0,0%,25%)]`

**`src/pages/Social.tsx`** — Stats cards:
- Stats grid: usa brutal-card — melhorado globalmente

**`src/pages/ScanHistory.tsx`** — Scan items:
- Já usa brutal-card — melhorado globalmente

**`src/pages/InfluencerDashboard.tsx`** — Cards e lista dark:
- Metric icon boxes: `dark:border-[hsl(0,0%,25%)]`
- Drop list items: `dark:border-[hsl(0,0%,25%)] dark:bg-[hsl(0,0%,9%)]`
- Quick action cards: `dark:border-[hsl(0,0%,25%)]`
- Chart tooltip: melhorar contraste dark

**`src/pages/InfluencerProfile.tsx`** — Cards dark:
- Cards usam shadcn Card — adicionar `dark:border-[hsl(0,0%,25%)]` nos Cards via className

### Resultado
Dark mode com bordas visíveis, cards com profundidade clara, hierarquia entre header/conteúdo/footer, e contraste profissional em todas as telas.

