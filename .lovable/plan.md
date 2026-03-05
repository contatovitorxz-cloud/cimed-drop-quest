

# Ajuste do Botão "Começar" no Onboarding

## Mudanças em `src/pages/Onboarding.tsx`

1. **Texto branco** - Trocar `text-accent` (preto) por `text-white` no botão
2. **Hover com zoom** - Remover `hover:opacity-90` e substituir por `hover:scale-105 transition-transform duration-200` para efeito de zoom ao passar o mouse/dedo
3. **Cor fixa** - Manter `bg-accent-foreground` (preto) sem mudança de cor no hover

