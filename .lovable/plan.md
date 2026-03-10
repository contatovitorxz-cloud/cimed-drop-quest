

## Plan: Centralizar InfluencerBottomNav

Ajustar o layout da `InfluencerBottomNav` para que os 3 itens fiquem mais centralizados e equilibrados, com o botão DROPS no centro exato e os itens laterais com espaçamento igual.

### Alteração

**`src/components/layout/InfluencerBottomNav.tsx`**
- Trocar `justify-around` por `justify-center` com `gap` adequado
- Dar largura fixa igual aos itens laterais para garantir simetria
- Ajustar padding para melhor centralização

