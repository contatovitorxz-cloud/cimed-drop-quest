

# Centralizar a Logo

O bloco da logo já tem `flex items-center justify-center w-full`, mas o `-ml-1` no texto está puxando o conjunto levemente para a esquerda. Vou remover o `-ml-1` e usar `gap-0` ou ajustar para que fique visualmente centralizado.

## Mudança em `src/pages/Login.tsx`
- Remover `-ml-1` do span do texto "CIMEDGO" para que o flex `justify-center` centralize corretamente o conjunto ícone + texto

