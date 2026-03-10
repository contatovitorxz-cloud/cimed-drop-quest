

## Plano: Refinar Admin Dashboard para fidelidade pixel-perfect com referência

### Análise das diferenças (comparando imagens com código atual)

**Imagem 1 (8DEC6932)** - Layout mais simples, sem sidebar direita:
- Header: Logo "CIMED" grande centralizado (não "Cimed GO"), avatar "JP" em círculo amarelo com iniciais
- Sidebar: Tem label "Menu" acima dos itens, item ativo "Dashboard" com fundo amarelo e texto preto
- Métricas: Labels em UPPERCASE ("USUÁRIOS ATIVOS", "MISSÕES COMPLETAS", "SCANS QR CODE", "DROPS RESGATADOS"), valores 72.5k, 185.2k, 342.1k +15%, 28.8k +22%
- Gráfico: Eixo X com meses (Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago), Y até 360000, legenda EMBAIXO do gráfico (não em cima), 4 linhas coloridas (amarela/laranja dominantes subindo forte)
- Tabela: Colunas "Drop | Resgates | Status | Ações", formato "450/500" para resgates, badge "Encerrado" cinza, ícones de editar (lápis) e menu (3 pontos)

**Imagem 2 (image-5)** - Layout com sidebar direita:
- Header: "Cimed GO" logo estilizado (com o O como engrenagem), "Dashboard" no header, avatar real com foto
- Sidebar: SEM label "Menu", item ativo com fundo azul/amarelo arredondado
- Métricas: Labels em case normal, valores com badges +18%, +32%, +25%
- Gráfico: Datas no X-axis, legenda no topo, escala menor (até 12,000)
- Sidebar direita: Ranking dos Drops + Novos Influenciadores

**Decisão**: Usar a **Imagem 1** como base principal (é a que o usuário enviou agora) e incorporar sidebar direita da Imagem 2.

### Mudanças necessárias

**1. `src/data/mockData.ts`**
- Métricas: 72.5k, 185.2k, **342.1k** (+15%), **28.8k** (+22%) — valores diferentes dos atuais
- Gráfico: Mudar para meses (Jan-Ago) com escala até 360000, curvas ascendentes realistas
- Tabela: Adicionar campo `total` visível, formato "450/500", nome "Carmed Fini Drop"
- Campanhas: "Carmed Fini Drop / Drogasil Paulista" com 450/500

**2. `src/pages/AdminDashboard.tsx`**
- **Header**: Logo "CIMED" grande centralizado (texto bold, não SVG pequeno), avatar com iniciais "JP" em círculo amarelo (não foto)
- **Métricas**: Labels UPPERCASE, valores atualizados (342.1k, 28.8k), badges com cores corretas
- **Gráfico**:
  - Eixo X: Meses (Jan, Fev, Mar... Ago)
  - Eixo Y: Escala grande (0 a 360000), formato "90000", "180000", "270000", "360000"
  - Legenda EMBAIXO do gráfico (não em cima): "Usuários · Scans · Drops · Missões"
  - Linhas: Amarela dominante (mais grossa), Laranja forte, Azul e Verde menores
  - Botão "Últimos 30 dias" com ícone calendário no canto superior direito
- **Tabela "Últimos Drops Liberados"**:
  - Header de coluna: "Drop | Resgates | Status | Ações"
  - Formato resgates: "450/500" (não "2,00 m")
  - Badge "Encerrado" cinza escuro
  - Ações: ícone de editar (Pencil) + ícone menu (MoreVertical)
- **Sidebar direita**: Manter Ranking + Influenciadores mas ajustar layout para combinar

**3. `src/components/admin/AdminSidebar.tsx`**
- Adicionar label "Menu" acima dos itens do menu
- Item ativo: fundo amarelo sólido (`bg-yellow-500 text-black`) com ícone e texto escuro
- Logo "CIMED" no topo em bold grande (não "Cimed GO" estilizado), "ADMIN PANEL" abaixo em cinza uppercase
- Ícones brancos para itens inativos

### Arquivos

| Arquivo | Ação |
|---|---|
| `src/data/mockData.ts` | Atualizar métricas (342.1k, 28.8k), gráfico com meses e escala grande, tabela com formato 450/500 |
| `src/pages/AdminDashboard.tsx` | Header com CIMED centralizado e avatar JP, métricas UPPERCASE, gráfico com meses/legenda embaixo, tabela com colunas header e formato X/Y |
| `src/components/admin/AdminSidebar.tsx` | Label "Menu", item ativo amarelo, logo "CIMED" + "ADMIN PANEL" |

