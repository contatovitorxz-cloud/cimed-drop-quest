

## Reorganizar Relatório de Vendas — Mais Limpo e Organizado

O layout atual funciona mas precisa de melhor hierarquia visual, separadores entre blocos, e melhor adaptação mobile. Vou reorganizar sem mudar os dados, apenas a estrutura e espaçamento.

### Alterações em `src/pages/AdminDashboard.tsx` — `SalesGatewaySection`

**1. Adicionar headers de seção entre blocos:**
- Cada bloco ganha um label tipo `VISÃO GERAL`, `TRANSAÇÕES` com linha separadora — dá contexto visual

**2. Resumo (3 cards) — melhorar responsividade:**
- `grid-cols-1 sm:grid-cols-3` em vez de `grid-cols-3` fixo — no mobile 390px empilha vertical
- Adicionar ícones nos cards de resumo (ShoppingCart, DollarSign, TrendingUp) para identidade visual

**3. Cards informativos (4 cards) — reorganizar grid:**
- Mobile: `grid-cols-1` empilhando todos (melhor legibilidade)
- Tablet: `grid-cols-2`
- Desktop: `grid-cols-4`
- Mover o bloco de resumo ACIMA dos 4 cards detalhados (primeiro o overview, depois o detalhe)

**4. Filtros — mais compactos:**
- Agrupar tudo numa única `Card` com padding interno
- Mover paginação para baixo da tabela apenas (não junto dos filtros)

**5. Tabela — adicionar coluna Data:**
- Incluir coluna "Data" formatada (dd/mm)
- Remover colunas menos úteis no mobile (Checkout, SKU)  via `hidden sm:table-cell`
- Adicionar valor total no footer da tabela

**6. Espaçamento geral:**
- `space-y-6` entre seções principais
- Separadores visuais (border-b ou gap maior) entre blocos lógicos

Resultado: mesmo conteúdo, mas com hierarquia clara: Resumo → Detalhes por categoria → Filtros → Tabela de transações.

