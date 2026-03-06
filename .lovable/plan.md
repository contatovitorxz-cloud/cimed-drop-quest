

## Melhorias de UI/UX na Home — Polish Final

A Home atual já tem a estrutura correta (header, level card, mapa embutido, action cards, bottom nav), mas falta polish visual para ficar mais profissional e fiel à referência. Vou refinar cada componente.

### Mudanças

**1. `src/pages/Home.tsx`**
- Adicionar XP progress bar no Level Card (barra fina amarela abaixo dos pontos mostrando progresso para o próximo nível)
- Aumentar a altura do mapa de 280px para 300px
- Adicionar label "Explorar mapa" acima do card do mapa com ícone
- Melhorar o espaçamento entre cards (de `space-y-4` para `space-y-3` com `pt-3` ajustado)
- Adicionar sombra sutil nos action cards para profundidade
- Adicionar indicador de distância nos cards relevantes (ex: "130m" no card de Drops)
- Melhorar o badge do card de Drops: mostrar o número de forma mais proeminente

**2. `src/components/layout/AppHeader.tsx`**
- Adicionar glow sutil amarelo no logo Cimed
- Tornar o badge de notificação mais compacto e com cor de destaque (vermelho/laranja em vez de amarelo)
- Adicionar separador visual sutil entre logo e área de ações
- Melhorar padding e tamanho do avatar (borda mais grossa, glow)

**3. `src/components/layout/BottomNav.tsx`**
- Adicionar indicador de tab ativa como dot/linha abaixo do ícone ativo
- Melhorar o botão central "Drops" com glow mais pronunciado e animação de pulse sutil
- Ajustar espaçamento e alinhamento para ficar mais limpo

**4. `src/index.css`**
- Adicionar animação `@keyframes subtle-pulse` para o botão central do BottomNav
- Adicionar estilos para progress bar do XP
- Melhorar transições e hover states dos cards

**5. `src/components/game/PlayerAvatar.tsx`**
- Adicionar um círculo de pulse/radar ao redor do avatar no mapa (efeito de "localização ativa")

