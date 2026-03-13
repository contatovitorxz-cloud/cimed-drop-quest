

## Campanha Nacional — Aba de Destaque no Painel Admin

Criar uma nova seção "Campanha Nacional" no painel administrativo, em destaque, como uma funcionalidade premium para lançar campanhas massivas para todo o Brasil — todos os usuários do app + tráfego externo.

### O que vai ter

**1. Destaque na Sidebar e BottomNav**
- Novo item no menu: "🇧🇷 Campanha Nacional" com ícone `Megaphone` — posicionado ACIMA de Drops na sidebar para ficar em destaque
- Estilo diferenciado: fundo com gradiente amarelo/laranja ou badge "NOVO" para chamar atenção do João Adib
- Adicionar também no AdminBottomNav (substituir um tab ou adicionar)

**2. Tela da Campanha Nacional — Funcional**

Ao clicar, abre uma tela completa com:

- **Hero Banner** — Card grande de destaque no topo: "LANÇAR CAMPANHA NACIONAL" com ícone de megafone, subtítulo "Alcance todos os usuários do Brasil de uma vez" — botão CTA "CRIAR CAMPANHA NACIONAL"
- **Campanha Ativa** (se houver) — Card destacado mostrando a campanha em andamento com:
  - Nome, período, status (ATIVA/AGENDADA/ENCERRADA)
  - Termômetro de meta (ex: "R$ 2.4M / R$ 5M faturados")
  - Métricas em tempo real: Alcance total, Resgates, Conversão, Tráfego externo
  - Mapa simplificado (lista) de regiões atingidas (Sul, Sudeste, Nordeste, etc.)

- **Canais de Distribuição** — Cards mostrando:
  - Push Notification (todos os usuários)
  - WhatsApp Business
  - Instagram/TikTok Ads (tráfego externo)
  - E-mail Marketing
  - Cada canal com toggle ativo/inativo e métricas de alcance estimado

- **Drops da Campanha** — Grid de drops vinculados à campanha com status, estoque, e countdown
- **Histórico** — Lista de campanhas nacionais anteriores com resultados

**3. Modal "Criar Campanha Nacional"** — Formulário funcional com:
- Nome da campanha
- Período (data início/fim com Calendar)
- Produtos participantes (multi-select)
- Desconto/benefício
- Meta de faturamento
- Canais de distribuição (checkboxes)
- Regiões alvo (checkboxes: Brasil todo, ou selecionar regiões)
- Mensagem push notification
- Botão "LANÇAR CAMPANHA" com confirmação

### Arquivos alterados

| Arquivo | Ação |
|---|---|
| `src/components/admin/AdminSidebar.tsx` | Adicionar item "Campanha Nacional" com ícone Megaphone, em destaque (badge ou cor especial) |
| `src/components/admin/AdminBottomNav.tsx` | Adicionar tab "Nacional" com ícone Megaphone |
| `src/pages/AdminDashboard.tsx` | Nova `NationalCampaignSection` com hero, métricas, canais, drops, modal de criação funcional |
| `src/data/adminMockData.ts` | Mock data para campanhas nacionais (1 ativa, 2 encerradas) |

### Estilo
NeoBrutalist consistente — borders 3px, shadows sólidas, sem rounded. O hero banner usa bg-accent com border grossa para impacto visual máximo.

