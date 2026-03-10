

## Plan: Corrigir navegação da página Drops para contexto do influenciador

### Problema
Quando o influenciador clica em "DROPS" na `InfluencerBottomNav`, ele vai para `/drops` que usa a `BottomNav` genérica (com tabs MAPA, MISSÕES, DROPS, RANKING, PERFIL). Isso tira o usuário do contexto de influenciador.

### Solução
Criar uma rota dedicada `/influencer-drops` para o influenciador e atualizar a `InfluencerBottomNav` para apontar para ela, mantendo o contexto do influenciador.

**Alternativamente** (mais simples): Alterar o `InfluencerBottomNav` para apontar o tab DROPS para `/influencer-drops`, criar essa página que reutiliza a lógica de Drops mas com a `InfluencerBottomNav`.

### Alterações

1. **`src/pages/InfluencerDrops.tsx`** — Nova página que replica a funcionalidade de Drops mas usa `InfluencerBottomNav` em vez de `BottomNav`, e o header do influenciador.

2. **`src/components/layout/InfluencerBottomNav.tsx`** — Mudar path do DROPS de `/drops` para `/influencer-drops`.

3. **`src/App.tsx`** — Adicionar rota `/influencer-drops` apontando para `InfluencerDrops`.

