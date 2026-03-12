

## Polish Profissional v2 — Todas as Telas, Light & Dark

Analisei todas as 15+ páginas e componentes. Há inconsistências visuais espalhadas que fazem a plataforma parecer amadora. Vou padronizar tudo.

### Problemas identificados

1. **Analytics.tsx**: Botão voltar usa `rounded-xl bg-secondary` — fora do design system brutalist
2. **Social.tsx**: Icon boxes dos activities usam `bg-accent` sólido sem tratamento dark — agressivo demais no dark mode
3. **Challenges.tsx**: Icon boxes `bg-accent` sólido sem dark mode treatment
4. **ScanHistory.tsx**: Icon boxes `bg-accent` sólido sem dark treatment; textos `opacity-70` em vez de `text-muted-foreground`
5. **InfluencerDrops.tsx**: Drop card header `bg-accent` sólido sem dark treatment (já corrigido em Drops.tsx mas não aqui)
6. **Login.tsx**: Inputs usam `rounded-xl` — inconsistente com o sistema brutalist (0 radius); botão submit usa `rounded-xl`
7. **BottomNav.tsx**: dark mode `bg-background` sem borda top para dark adequada
8. **Leaderboard.tsx**: Sem BottomNav — inconsistente com outras páginas
9. **Page headers inconsistentes**: Algumas usam `font-anton`, outras `font-black` normal, sem padrão

### Alterações por arquivo

**`src/pages/Analytics.tsx`** — Alinhar botão voltar ao brutalist:
- Trocar `rounded-xl bg-secondary` por `border-[2px] border-border bg-card shadow-[2px_2px_0_hsl(var(--border))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all`

**`src/pages/Social.tsx`** — Dark mode nos icon boxes:
- Activity icon boxes: `bg-accent dark:bg-accent/15` + `text-accent-foreground dark:text-accent` + `dark:border-border/50`

**`src/pages/Challenges.tsx`** — Dark mode nos icon boxes:
- Challenge icon: `bg-accent dark:bg-accent/15` + `dark:text-accent` + `dark:border-border/50`

**`src/pages/ScanHistory.tsx`** — Padronizar:
- Icon boxes: `bg-accent dark:bg-accent/15` + `dark:text-accent`
- Trocar `opacity-70` por `text-muted-foreground` nos textos do brutal-card-dark
- Adicionar `font-black uppercase` nos labels

**`src/pages/InfluencerDrops.tsx`** — Alinhar com Drops.tsx:
- DropCardDB header: `bg-accent dark:bg-accent/10` + title: `dark:text-accent`
- Timer badge: `bg-card` em vez de `bg-background`

**`src/pages/Login.tsx`** — Alinhar ao brutalist:
- Inputs: trocar `rounded-xl` por `rounded-none` (brutalist square)
- Submit button: `rounded-none` 
- Google button: `rounded-none`
- Adicionar `border-[2px] border-black/20` nos inputs para mais presença

**`src/pages/Leaderboard.tsx`** — Adicionar BottomNav:
- Import e render BottomNav
- Adicionar `pb-20` e `pt-14` + AppHeader

**`src/components/layout/BottomNav.tsx`** — Dark mode refinement:
- Adicionar `dark:bg-card dark:border-t-accent/15` para brilho sutil no dark

**`src/pages/InfluencerProfile.tsx`** — Padronizar icon boxes dark:
- PIX e Comissão icon boxes: `dark:bg-accent/15 dark:border-border/50` + `dark:text-accent`

### Resultado
Todas as telas terão visual coeso em ambos os modos, sem exceções. Botões, inputs, icon boxes e headers seguem o mesmo padrão brutalist com tratamento dark mode adequado.

