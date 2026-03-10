

## Plan: Ajustar cores da tela de Login

O usuário quer manter o posicionamento atual mas ajustar as cores:
- **Fundo**: amarelo (já está `bg-accent` — OK)
- **Campos email/senha**: fundo **branco** 
- **Botão Entrar**: fundo **preto**, texto **branco** (atualmente texto amarelo, precisa mudar para branco)
- **Botão Google**: manter branco

### Alterações em `src/pages/Login.tsx`:

1. **Inputs** (linhas 58, 71, 83): já usam `bg-background` (branco) — OK. Remover `border-border` (que é preto grosso) e usar `border-gray-200` para borda mais suave nos campos.

2. **Botão Entrar** (linha 92): mudar `text-accent` para `text-white` — texto branco no fundo preto.

3. **Botão Google** (linha 113): já está branco — OK. Ajustar borda para `border-gray-200` para consistência.

Mudanças mínimas, apenas ajuste de cores conforme solicitado.

