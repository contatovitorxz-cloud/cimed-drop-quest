

# Ícones brancos com profundidade no BottomNav

## Alterações

### `src/components/layout/BottomNav.tsx`
- Ícones inativos: branco (`text-white/70`) em vez de `text-black/50`
- Ícones ativos: branco com fundo branco/20 e sombra sutil para efeito de profundidade
- Labels: branco
- Adicionar `drop-shadow` nos ícones ativos para efeito de profundidade/glow
- `strokeWidth`: 1.5 para inativos, 2 para ativos
- Ícone ativo envolto em círculo/pill com `bg-white/15 shadow-inner` para criar sensação de profundidade
- Borda superior mais sutil: `border-white/10`

### Ícones (manter os atuais, já são profissionais)
- `MapPin`, `ShoppingBag`, `Target`, `Gift`, `User` — sem alteração

