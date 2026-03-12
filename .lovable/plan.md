

## Gateway de Vendas na aba Influenciadores

Adicionar uma sub-navegação com tabs dentro da seção Influenciadores: **Gestão** (lista atual) e **Relatório de Vendas** (novo). O relatório mostra um dashboard estilo gateway de pagamentos com métricas de vendas separadas por origem.

### Alterações

**`src/data/adminMockData.ts`** — Adicionar mock de vendas:
- `mockInfluencerSales`: array com vendas por influenciador (nome, vendas, receita, comissão, conversão)
- `mockSalesOverview`: totais gerais — vendas orgânicas vs influencer, receita total, ticket médio
- `mockSalesChart`: dados mensais com duas séries (orgânico vs influencer)

**`src/pages/AdminDashboard.tsx`** — Refatorar `InfluencersSection`:
- Adicionar tabs internas: `gestao` | `vendas` com botões estilo NeoBrutalist no topo
- Tab `gestao`: conteúdo atual (lista de influenciadores + aprovação)
- Tab `vendas` — novo componente `SalesGatewaySection`:
  - **4 cards métricas** no topo: Receita Total, Vendas via Influencer, Vendas Orgânicas, Taxa Conversão
  - **Gráfico de barras** comparando vendas orgânicas vs influencer por mês (BarChart do recharts, 2 barras lado a lado)
  - **Tabela ranking** dos influenciadores por vendas: avatar, nome, vendas, receita gerada, comissão, % conversão, com badge de posição
  - Cada linha mostra a contribuição relativa com uma barra de progresso visual
  - Cards usam estilo brutal existente com ícones `DollarSign`, `TrendingUp`, `ShoppingCart`, `Percent`

### Resultado
Admin vê claramente quanto cada influenciador está vendendo, compara com vendas orgânicas, e tem visão de gateway profissional com métricas financeiras.

