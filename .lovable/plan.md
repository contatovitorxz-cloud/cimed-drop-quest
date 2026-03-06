

## Plano: Refinar Admin Dashboard para ficar idêntico à referência

Analisei a imagem de referência em detalhe e comparei com o código atual. Aqui estão todas as diferenças que precisam ser corrigidas:

### Diferenças identificadas

**Header:**
1. Na referência, o header mostra "Cimed GO" (logo) à esquerda + texto "Dashboard" ao lado do logo no header (não só dentro do conteúdo)
2. Avatar do admin é uma foto real (círculo com imagem), não iniciais "JP"
3. Dropdown chevron ao lado do nome do admin
4. Ícones de calendário e sino maiores/mais visíveis

**Sidebar:**
1. O item ativo "Dashboard" tem fundo amarelo/dourado sólido com texto escuro, não apenas um accent sutil
2. "Analytics" tem um chevron indicando submenu expansível
3. Sem label "Menu" acima dos itens -- os itens ficam diretos
4. Logo "Cimed GO" no topo da sidebar com estilo bold amarelo (fonte Nunito weight 900)

**Métricas:**
1. Os cards de métricas têm ícone circular (não rounded-xl quadrado) com fundo amarelo
2. Os ícones são maiores e mais detalhados
3. Os valores mostram "72.5k", "185.2k", "75.9k +32%", "39.1k +25%" -- os dados de Scans QR e Drops estão diferentes
4. Labels: "Usuários Ativos", "Missões Completas", "Escaneamentos QR", "Drops Resgatados"

**Gráfico:**
1. Legenda no topo do gráfico (não embaixo): "Usuários Ativos", "Missões Completas", "Escaneamentos QR", "Drops Resgatados" (4 linhas com cores distintas)
2. XAxis mostra datas "1 abr, 16 abr, 7 abr, 9 jun, 16 ubr, 21 abr, 20 abr" -- formato de datas, não meses
3. Filtro "Últimos 30 dias" com dropdown + ícones de expandir/fullscreen ao lado
4. Linha amarela mais dominante, cinzas mais suaves

**Tabela "Últimos Drops Liberados":**
1. Cada row tem ícone Gift amarelo circular (não quadrado)
2. Coluna de resgates mostra "2,00 m Resgates", "417 m Resgates", "361 m Resgates" -- formato diferente com "m" de milhares e label "Resgates" abaixo
3. Badges de status: "Encerrado" (cinza), "Expirada" (laranja/amber), "Encerra hoje" (verde)
4. Botão "Editar" como texto/outline, não ícone
5. Último row tem "Ver Todos >" como botão amarelo ao invés de badge de status
6. Nomes: "Carmed Grátis", "Produtos Cimed Grátis", "Cupom 20% OFF" com subtítulos como "Drogasil Paulista · 200m"

**Sidebar direita - Ranking dos Drops:**
1. Cada item tem ícone circular com imagem de produto (Gift dourado), não "#1, #2, #3"
2. Layout: Nome em bold + badge de status ao lado + número de resgates à direita
3. "Carmed Grátis 4.835" / "Lipogel Expirada 3.991" / "Cupom de 30% OFF 3.645 Encerra hoje"
4. Status labels como "Esgotado", "Expirada", "Encerra hoje" ao lado do número
5. Botões "Den >" e "Ver drop" no rodapé do card

**Sidebar direita - Novos Influenciadores:**
1. Foto circular real (não iniciais)
2. Layout: Nome + seguidores à direita ("Amanda Costa 515k", "Rafael Silva 382k", "Carla Menezes 275k")
3. Handle "@acosta", "@rafaetsilva"
4. Botão "Aprovar" amarelo outline

### Arquivos a alterar

| Arquivo | Mudanças |
|---|---|
| `src/pages/AdminDashboard.tsx` | Redesign completo do DashboardSection: header com "Dashboard" text, cards métrica com ícones circulares, gráfico com datas no eixo X e legenda no topo, tabela reformulada com formato "2,00 m Resgates", botões "Editar" texto, ranking com layout correto, influenciadores com layout correto |
| `src/components/admin/AdminSidebar.tsx` | Item ativo com fundo amarelo sólido, remover label "Menu", Analytics com chevron, estilo do logo |
| `src/data/mockData.ts` | Atualizar métricas (75.9k scans, 39.1k drops, +32%, +25%), dados do gráfico com datas ao invés de meses, campanhas com nomes corretos ("Carmed Grátis", "Produtos Cimed Grátis", "Cupom 20% OFF"), ranking com dados corretos (4.835, 3.991, 3.645), influenciadores com nomes corretos (Amanda Costa, Rafael Silva, Carla Menezes) |

### Detalhes de implementação

- Cards de métricas: `w-12 h-12 rounded-full` ao invés de `w-10 h-10 rounded-xl`
- Sidebar ativa: `bg-yellow-500 text-black font-semibold` para o item selecionado
- Tabela resgates: formato verticalizado com número grande em cima e "Resgates" em texto pequeno embaixo
- Botão "Editar": `variant="outline"` com texto, não ícone
- Ranking: layout horizontal com nome+badge à esquerda e número+status à direita
- Gráfico XAxis: trocar "month" por datas ("1 abr", "7 abr", etc.)
- Último item da tabela: botão "Ver Todos >" amarelo ao invés de status badge

