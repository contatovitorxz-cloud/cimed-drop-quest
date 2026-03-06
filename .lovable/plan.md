

## Plano: Três Interfaces Completas — Consumidor, Influenciador, Administrador

A Tela 1 (Consumidor) já existe e está bem implementada (Home, Profile, Missions, Drops, Leaderboard, Social, Analytics). As melhorias serão incrementais. O foco principal é criar as Telas 2 e 3 do zero.

---

### Tela 1 — Consumidor (Refinamentos)

**`src/pages/Home.tsx`**: Já implementada com mapa, level card, action cards e BottomNav. Pequenos ajustes:
- Adicionar foto/nome/nível do usuário no topo (integrar com AppHeader ou level card)

**`src/pages/Profile.tsx`**: Já tem badges, stats, histórico. Nenhuma mudança necessária.

---

### Tela 2 — Painel do Influenciador (Creator Hub)

**Nova página `src/pages/InfluencerDashboard.tsx`**: Dashboard completo mobile-first com:
- Header com foto, nome, status "Influenciador Verificado", mensagem "Bem-vindo ao Creator Hub"
- Botão grande "Criar Drop" (amarelo, centralizado)
- Cards de métricas: Visualizações, Cliques, Conversões (3 cards em grid)
- Seção "Campanhas" com lista de campanhas criadas (cards com nome, status, métricas)
- Seção "QR Codes" com lista de QR codes gerados
- Seção "Drops Criados" com lista dos drops do influenciador (nome, farmácia, quantidade restante, status)
- Gráfico de desempenho (Recharts LineChart) com cliques, conversões, engajamento e filtro por período (7d, 30d, 90d)

**Mock data em `src/data/mockData.ts`**: Adicionar dados de campanhas, QR codes e métricas do influenciador.

**Rota em `src/App.tsx`**: `/influencer-dashboard`

---

### Tela 3 — Painel Administrador (Dashboard Desktop)

**Nova página `src/pages/AdminDashboard.tsx`**: Layout desktop com sidebar + conteúdo principal:
- Usa `SidebarProvider` + `Sidebar` do shadcn
- Menu lateral: Dashboard, Drops, QR Codes, Missões, Influenciadores, Analytics, Configurações
- Conteúdo por seção (tabs ou estado interno)

**Seções do Admin:**

1. **Dashboard** (default):
   - 4 metric cards: Usuários ativos, Missões completas, Scans QR, Drops resgatados
   - Gráfico de crescimento (Recharts AreaChart) com Usuários/Missões/Scans/Drops
   - Tabela de campanhas recentes

2. **Gestão de Campanhas/Drops**:
   - Tabela com Nome, Farmácia, Quantidade resgatada, Status
   - Botões: Editar, Encerrar, Visualizar
   - Botão "Criar Campanha" grande no topo

3. **Gestão de Influenciadores**:
   - Tabela com Foto, Nome, Seguidores, Status
   - Botões: Aprovar, Suspender, Ver Perfil

**Mock data**: Adicionar dados de campanhas admin e influenciadores cadastrados.

**Rota**: `/admin`

---

### Identidade Visual Consistente
Todas as telas usam as mesmas CSS variables já definidas:
- `--accent: 48 100% 50%` (amarelo #FFD400)
- `--background: 0 0% 6%` (#0F0F0F ≈ #0B0B0B)
- Cards em `bg-card` (#1A1A1A ≈ #1E1E1E)
- Foreground branco

---

### Arquivos a Criar/Modificar

| Arquivo | Ação |
|---|---|
| `src/pages/InfluencerDashboard.tsx` | Criar — painel completo do influenciador |
| `src/pages/AdminDashboard.tsx` | Criar — dashboard admin com sidebar |
| `src/components/admin/AdminSidebar.tsx` | Criar — sidebar do admin |
| `src/data/mockData.ts` | Adicionar mock data para influenciador e admin |
| `src/App.tsx` | Adicionar rotas `/influencer-dashboard` e `/admin` |

Total: 3 novos arquivos + 2 modificados.

