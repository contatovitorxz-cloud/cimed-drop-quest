

## Plano: Redesign completo do Admin Dashboard

O dashboard atual está muito simplificado comparado à referência. Precisa de uma reestruturação significativa do layout e conteúdo.

### Diferenças identificadas

1. **Header**: Falta avatar do admin com nome/cargo, ícones de calendário e notificação
2. **Layout**: Precisa de layout de 2 colunas (conteúdo principal + sidebar direita)
3. **Cards de métricas**: Label em cima, valor embaixo, porcentagem ao lado do valor (não abaixo)
4. **Gráfico**: Título "Visão Geral", gráfico de linhas (não área), filtro de período "Últimos 30 dias"
5. **Sidebar direita**: "Ranking dos Drops" com cards de produtos + "Novos Influenciadores" com botão Aprovar
6. **Tabela de drops**: "Últimos Drops Liberados" com badges de status coloridos (Encerrado, Expirada, Encerra hoje), botões Editar, coluna de resgates
7. **Título da página**: "Dashboard" grande + botão "+ Criar Campanha" no topo
8. **Mock data**: Popular com dados realistas (72.5k usuários, 185.2k missões, etc.)

### Arquivos a alterar

| Arquivo | Ação |
|---|---|
| `src/data/mockData.ts` | Popular mock data do admin com valores realistas e adicionar dados para ranking de drops e novos influenciadores |
| `src/pages/AdminDashboard.tsx` | Redesign completo: header com perfil, layout 2 colunas, sidebar direita com ranking e influenciadores, tabela de drops reformulada |
| `src/components/admin/AdminSidebar.tsx` | Pequenos ajustes de estilo para match visual |

### Estrutura do novo layout

```text
┌─────────┬──────────────────────────────────────────────┐
│         │  Header: Logo | Dashboard | 📅 🔔 👤 João   │
│ Sidebar ├────────────────────────┬───────────────────── │
│         │  Dashboard  [+ Criar]  │                     │
│ Dashboard│ [Métricas x4]        │                     │
│ Drops   ├────────────────────────┤ Ranking dos Drops   │
│ QR Codes│ Visão Geral           │ [3 items]           │
│ Missões │ [Gráfico de linhas]   │                     │
│ Influen.├────────────────────────┤ Novos Influenciad.  │
│ Analyt. │ Últimos Drops Liber.  │ [lista com Aprovar] │
│ Config. │ [Tabela com badges]   │                     │
└─────────┴────────────────────────┴─────────────────────┘
```

### Detalhes visuais importantes
- Cards de métricas: ícone circular amarelo à esquerda, label em texto pequeno acima, valor grande, e badge verde de % à direita
- Gráfico: linhas (não áreas preenchidas), legenda embaixo, filtro dropdown no canto superior direito
- Ranking dos Drops: cada item com imagem/ícone, nome com badge de status, cidade, contagem, e badge "Esgotado"/"Encerra hoje"
- Novos Influenciadores: foto circular, nome, @handle, contagem de seguidores, botão "Aprovar" amarelo outline
- Tabela de drops: ícone + nome + farmácia/distância, resgates, badge de status colorido, botão Editar, menu de 3 pontos

