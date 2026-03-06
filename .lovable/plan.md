

# Ícones pretos e mais profissionais no BottomNav

Baseado na imagem de referência, os ícones devem ser **pretos** sobre o fundo amarelo, com um visual limpo e profissional. Vou também trocar alguns ícones por versões mais refinadas que combinam melhor com a referência.

## Alterações em `src/components/layout/BottomNav.tsx`

### Cores
- Ícones ativos: `text-black` com `drop-shadow` sutil para profundidade
- Ícones inativos: `text-black/50`
- Labels: preto (ativo) / preto/50 (inativo)

### Ícones mais refinados (matching referência)
- `MapPin` → `Navigation` (mais limpo, tipo compass/location)
- `ShoppingBag` → `Store` (mais profissional para loja)
- `Target` → `Crosshair` (mais moderno para desafios)
- `Gift` → `Gift` (manter, já é bom)
- `User` → `UserRound` (mais polido)

### Container ativo
- Fundo `bg-black/10 rounded-xl` no ícone ativo para destacar a seleção
- Remover `shadow-inner` e `bg-white/15`

### Stroke
- Ativo: `strokeWidth={2}`, inativo: `strokeWidth={1.5}`

