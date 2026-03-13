

## Tornar Filtros, Exportar, Colunas e Paginação Funcionais

Vou adicionar estado e lógica real aos controles que hoje são apenas visuais.

### Funcionalidades

**1. Filtro de Período** — DateRange picker com Popover + Calendar (date-fns)
- Estado `dateRange: { from: Date, to: Date }` — default últimos 90 dias
- Botão de período mostra datas selecionadas, X limpa o filtro (volta ao default)
- Filtra `mockSalesTransactions` por `data`

**2. Botão "Filtros"** — Popover com checkboxes
- Filtro por tipo de venda: checkboxes "Via Influencer", "Orgânica", "Venda Direta"
- Filtro por source: checkboxes com sources únicos dos dados
- Badge de contagem mostra quantidade de filtros ativos

**3. Botão "Exportar"** — Download CSV
- Gera CSV com todas as colunas das transações filtradas
- Dispara download via `Blob` + `URL.createObjectURL`

**4. Botão "Colunas"** — Toggle de visibilidade
- Popover com checkboxes para cada coluna (Data, Código, Tags, Cliente, Tipo, Produto, Qtd, Source, Valor)
- Todas ativas por default; toggle mostra/esconde colunas na tabela

**5. Paginação real**
- Estado `page` + `pageSize = 5`
- Slice do array filtrado por página
- "Anterior" / "Próxima" com disable quando não há mais páginas
- Contagem de resultados e páginas atualiza dinamicamente

### Alterações

**`src/pages/AdminDashboard.tsx`** — `SalesGatewaySection`:
- Adicionar `useState` para: `dateRange`, `tipoFilter`, `visibleColumns`, `page`
- `useMemo` para filtrar e paginar transações
- Substituir botões estáticos por Popovers interativos
- Recalcular totais da visão geral com base nos dados filtrados
- Paginação com lógica real

### Estrutura dos Popovers (NeoBrutalist)
```
Filtros Popover:
┌─────────────────────────┐
│ TIPO DE VENDA           │
│ ☑ Via Influencer        │
│ ☑ Orgânica              │
│ ☑ Venda Direta          │
│─────────────────────────│
│ [Limpar]     [Aplicar]  │
└─────────────────────────┘

Colunas Popover:
┌─────────────────────────┐
│ ☑ Data    ☑ Código      │
│ ☑ Tags    ☑ Cliente     │
│ ☑ Tipo    ☑ Produto     │
│ ☑ Qtd     ☑ Source      │
│ ☑ Valor                 │
└─────────────────────────┘
```

