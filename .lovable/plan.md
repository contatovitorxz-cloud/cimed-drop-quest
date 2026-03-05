

# Adicionar campos de Email e Senha ao formulário de Influencer

O objetivo é adicionar campos de email e senha no formulário de inscrição do influencer, para que ao enviar a inscrição, uma conta seja criada automaticamente via Supabase Auth, permitindo login posterior.

## Alterações

### `src/pages/InfluencerRegister.tsx`

1. Adicionar campos `email` e `password` ao estado do formulário
2. Adicionar dois novos inputs (Email e Senha) logo após o campo "Nome completo", com ícones de Mail e Lock
3. Adicionar toggle de visibilidade da senha (olho aberto/fechado)
4. No `handleSubmit`, chamar `supabase.auth.signUp()` com o email e senha fornecidos, passando os demais dados do formulário como metadata do usuário
5. Após sucesso, exibir toast e redirecionar para `/login`
6. Importar `supabase` client e ícones necessários (`Lock`, `Eye`, `EyeOff`)

### Posicionamento dos campos

Os campos de email e senha ficarão logo após "Nome completo" e antes de "Idade / CPF", seguindo o mesmo estilo visual (h-14, bg-gray-50, rounded-xl).

