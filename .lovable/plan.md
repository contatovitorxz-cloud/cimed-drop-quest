

## Plan: Fake Data no Admin + Role Admin + Menu de Alternância de Painéis

### 1. Criar tabela `user_roles` no Supabase
- Criar enum `app_role` (admin, moderator, user)
- Criar tabela `user_roles` com RLS
- Criar função `has_role()` security definer
- Inserir role `admin` para o email `contatovitorxz@gmail.com` (buscar user_id via profiles/auth)

### 2. Dados fake no Admin Dashboard
Quando o banco estiver vazio, mostrar dados fake em **todas as seções**:

- **Dashboard**: métricas fake (1.247 usuários, 856 missões, 3.421 scans, 612 drops) + gráfico de engajamento com dados fake mensais
- **Drops**: lista de 5 drops fake (Vitamina C Drop, Kit Protetor Solar, Desconto Lavitan, etc.)
- **QR Codes**: seção com lista fake de QR codes cadastrados
- **Missões**: lista fake de missões ativas com progresso
- **Influenciadores**: lista fake de 4 influenciadores com comissões
- **Perfis**: lista fake de ~8 perfis com níveis e pontos variados
- **Analytics**: gráficos fake de engajamento
- **Configurações**: placeholder

Implementação: criar `src/data/adminMockData.ts` com todos os dados fake. Cada seção mostra dados fake quando o banco retorna vazio, com um badge "DADOS DEMO" sutil.

### 3. Menu de alternância no avatar do Admin Header
- No canto superior direito do admin, ao clicar no avatar/nome, abrir dropdown com:
  - **Painel Admin** (atual)
  - **Painel Influencer** → navega para `/influencer-dashboard`
  - **Painel Usuário** → navega para `/home`
  - Separador + **Sair**
- Mostrar foto de perfil real do usuário logado (usar `useProfile`)

### 4. Proteger rota `/admin`
- No `AdminDashboard`, verificar se o usuário tem role `admin` via query à tabela `user_roles`
- Se não for admin, redirecionar para `/home`

### Arquivos a criar/editar:
- **Nova migration SQL**: criar enum, tabela `user_roles`, função `has_role`, inserir admin
- **Novo**: `src/data/adminMockData.ts` — dados fake para todas as seções
- **Editar**: `src/pages/AdminDashboard.tsx` — fallback para mock data, dropdown no avatar, seções QR/Missões/Analytics/Config, proteção de rota
- **Editar**: `src/hooks/useSupabaseData.ts` — adicionar hook `useUserRole`

