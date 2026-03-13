

## Refazer Relatório de Vendas — Estilo Gateway Payt

Inspirado nas screenshots do Payt, vou recriar a `SalesGatewaySection` com layout fiel: cards de status agrupados por categoria, tabela detalhada de transações com colunas, paginação, filtro de período, e botões de exportar/personalizar.

### Alterações

**`src/data/adminMockData.ts`** — Adicionar mock de transações individuais:
- `mockSalesTransactions`: array de ~15 transações com campos: código (alfanumérico), cliente, tipo_venda ("Venda Direta", "Influencer"), produto, quantidade, codigo_checkout, nome_checkout, source (nome do influencer ou "Orgânico"), valor, data
- `mockSalesStatus`: objeto com { aprovados: { valor, vendas, percent }, aguardando: { valor, vendas, percent }, reembolsados: { valor, vendas, percent } }
- `mockPaymentMethods`: array com [{ tipo: 'Cartão Crédito', valor, vendas, percent }, { tipo: 'Pix', valor, vendas, percent }, { tipo: 'Boleto', valor, vendas, percent }]
- `mockTopOffers`: array com [{ posicao, nome, vendas, total }] — top 4 produtos

**`src/pages/AdminDashboard.tsx`** — Reescrever `SalesGatewaySection` completamente:

**Bloco 1 — 4 cards informativos (grid 1x4 em desktop, 2x2 em mobile):**
- **Card "Status das vendas"**: Lista vertical — Aprovados (valor verde + vendas + %), Aguardando pagamento (valor laranja), Reembolsados (valor vermelho)
- **Card "Tipos de vendas"**: Venda Direta, Via Influencer, Orgânica — cada com valor e contagem
- **Card "Formas de pagamento"**: ícone + nome + valor em cada linha (Crédito, Pix, Boleto)
- **Card "Top ofertas"**: dropdown fake "Top ofertas", lista 1º-4º lugar com nome produto, vendas, total R$

**Bloco 2 — Linha de resumo (3 cards pequenos):**
- Quantidade de vendas (número grande)
- Comissões (R$ total)
- Total de vendas (R$ total)

**Bloco 3 — Filtros e controles:**
- Badge de período: "Período de Compra: 12/12/2025 - 12/03/2026" com X para remover (apenas visual)
- Botão "Filtros" com ícone e badge de contagem
- Paginação: "Anterior" / "Próxima →" com "Resultados encontrados: 93 Página 1 de 10"
- Botões: "Exportar relatório de vendas" e "Personalizar colunas" (apenas visuais)

**Bloco 4 — Tabela de transações:**
- Header com colunas: Código, Tags, Cliente, Tipo Venda, SKU, Produto, Qtd, Cód. Checkout, Nome Checkout, Source
- Linhas com dados mock, scrollable horizontalmente
- Códigos e clientes em cor accent (links visuais)
- Estilo NeoBrutalist: border-[2px], font-black nos headers, sem rounded

Todo o design segue NeoBrutalist (bordas sólidas, sem rounded, font-black uppercase nos headers) mas adaptado ao layout informativo do Payt.

