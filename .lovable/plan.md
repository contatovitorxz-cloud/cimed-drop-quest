

## Plan: Influencer Dashboard — Dados Demo, Foto de Perfil e Remoção do X

### Problemas identificados

1. **Dados vazios**: O dashboard do influencer mostra tudo zerado porque não há dados reais no banco. Precisa de fallback com dados fake demonstrativos.
2. **Sem foto de perfil**: O header do influencer usa apenas iniciais, não carrega `avatar_url` do perfil (não usa `useProfile`).
3. **Botão X desnecessário**: Existe um botão X (linha 102-104) que navega para `/home`. Deve ser removido — a alternância de painéis já existe no dropdown do avatar.

### Alterações

**`src/pages/InfluencerDashboard.tsx`**:

1. **Remover o botão X** (linhas 102-104) do header.

2. **Usar `useProfile` e `useUserRole`** para carregar avatar e mostrar dropdown com alternância de painéis no avatar (igual ao `AppHeader`):
   - Importar `useProfile`, `useUserRole`, `DropdownMenu` components
   - Substituir o botão de iniciais por um `DropdownMenu` com foto do perfil e opções: Painel Usuário, Painel Influencer, Painel Admin (se admin), Sair

3. **Adicionar dados fake de fallback** quando o banco retorna vazio:
   - Métricas: 12 drops criados, 340 resgates, 158 restantes
   - Lista "Meus Drops": 5 drops fake (Vitamina C Drop, Kit Protetor Solar, etc.)
   - Gráfico de performance: 7 dias de dados fake
   - Saldo de comissão fake: R$ 1.250,50
   - Badge "DEMO" sutil quando usando dados fake

