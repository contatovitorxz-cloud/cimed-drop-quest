
-- Create influencer_settings table
create table public.influencer_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  display_name text,
  pix_key_type text default 'cpf',
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

-- Create avatars storage bucket
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Storage RLS policies
create policy "Users can upload own avatar" on storage.objects
  for insert to authenticated with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can update own avatar" on storage.objects
  for update to authenticated using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Anyone can view avatars" on storage.objects
  for select using (bucket_id = 'avatars');
