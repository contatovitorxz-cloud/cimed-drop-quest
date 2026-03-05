

# Adicionar login com Google na tela de Login

## Alterações

### `src/pages/Login.tsx`
- Adicionar botão "Continuar com Google" após o botão principal de submit
- Incluir ícone SVG do Google inline no botão
- Adicionar função `handleGoogleLogin` que chama `supabase.auth.signInWithOAuth({ provider: 'google' })`
- Importar `supabase` client
- Separador visual "ou" entre o botão principal e o botão do Google
- Estilo: botão branco com borda, ícone colorido do Google, texto preto

### `src/contexts/AuthContext.tsx`
- Adicionar método `signInWithGoogle` ao contexto de auth (opcional, pode chamar direto do supabase client)

### Configuração necessária (manual pelo usuário)
- O usuário precisará configurar o provider Google no dashboard do Supabase em Authentication > Providers
- Criar OAuth credentials no Google Cloud Console com redirect URL do Supabase

