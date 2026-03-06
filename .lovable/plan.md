

## Plano: Ajustar dados e detalhes visuais para ficar idêntico à referência

Comparando o screenshot atual com a imagem de referência, as diferenças são:

### 1. Dados mock com valores reais
Os métricas mostram "0" porque `mockInfluencerMetrics` tem `value: 0` e o operador `??` não trata zero como fallback. A referência mostra 12.500, 620 e 218.

O gráfico mostra "Dados disponíveis após primeiras atividades" porque `mockInfluencerPerformance` está vazio. A referência mostra linhas de Cliques e Conversões com dados.

### 2. Mudanças

#### `src/data/mockData.ts`
- Atualizar `mockInfluencerMetrics` com valores: 12500, 620, 218
- Preencher `mockInfluencerPerformance` com 7 dias de dados para cliques e conversões

#### `src/pages/InfluencerDashboard.tsx`
- Trocar `??` por `||` nos valores das métricas (para fallback funcionar com zero também, caso necessário no futuro)

| Arquivo | Ação |
|---|---|
| `src/data/mockData.ts` | Preencher métricas e performance com dados reais |
| `src/pages/InfluencerDashboard.tsx` | Ajuste menor no fallback de valores |

