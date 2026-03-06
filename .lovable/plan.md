

## Plano: Criar página de Perfil do Influenciador

### Visão Geral
Criar uma nova página `/influencer-profile` acessível pelo avatar no header do InfluencerDashboard, com seções para foto de perfil, nome, configuração de PIX e saque de comissão.

### 1. Migração de Banco de Dados
Criar tabela `influencer_settings` para armazenar dados de pagamento:

```sql
create table public.influencer_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  display_name text,
  pix_key_type text default 'cpf', -- cpf, email, phone, random
  pix_key text,
  commission_balance numeric default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.influencer_settings enable row level security;

create policy "Users can view own settings" on public.influencer_settings
  for select to authenticated using (auth.uid() = user_id);

create policy "Users can insert own settings" on public.influencer_settings
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can update own settings" on public.influencer_settings
  for update to authenticated using (auth.uid() = user_id);
```

Criar bucket de storage `avatars` para upload de fotos de perfil.

### 2. Nova página `src/pages/InfluencerProfile.tsx`
Layout dark seguindo o mesmo estilo do InfluencerDashboard:

- **Header**: Logo Cimed GO + botão voltar para dashboard
- **Seção Avatar**: Foto circular grande com botão de upload (usa storage bucket `avatars`), salva URL no `profiles.avatar_url`
- **Seção Dados**: Campo editável para nome de exibição
- **Seção PIX**: Select para tipo de chave (CPF, E-mail, Telefone, Aleatória) + input para a chave
- **Seção Comissão**: Card mostrando saldo disponível (mock R$ 1.250,00) + botão "Solicitar Saque"
- **Botão Salvar**: Gradient yellow, salva dados no Supabase

### 3. Rota e navegação
- Adicionar rota `/influencer-profile` em `App.tsx`
- No `InfluencerDashboard.tsx`, tornar o avatar clicável para navegar para `/influencer-profile`

### 4. Arquivos

| Arquivo | Ação |
|---|---|
| Migration SQL | Criar tabela `influencer_settings` + bucket `avatars` |
| `src/pages/InfluencerProfile.tsx` | Nova página de perfil do influenciador |
| `src/App.tsx` | Adicionar rota `/influencer-profile` |
| `src/pages/InfluencerDashboard.tsx` | Avatar clicável -> navegar para perfil |

