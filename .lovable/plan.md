
# Atualizar cores do Header e BottomNav para amarelo com ícones profissionais

## Alterações

### `src/components/layout/AppHeader.tsx`
- Fundo do header: gradiente amarelo/dourado (`gradient-yellow`) com backdrop-blur
- Texto "CIMED GO": preto em vez de gradiente laranja (contraste no fundo amarelo)
- Ícone do sino: preto, com `strokeWidth={2}` para mais profissionalismo
- Badge de notificação: laranja (`bg-orange-500`)
- Borda inferior: `border-yellow-600/30`

### `src/components/layout/BottomNav.tsx`
- Fundo da nav: gradiente amarelo/dourado
- Ícones ativos: preto com fundo preto/10 (em vez de laranja)
- Ícones inativos: preto/50
- Texto dos labels: preto
- Trocar ícones por versões mais profissionais/modernas:
  - `Map` → `MapPin` (mais reconhecível)
  - `Package` → `ShoppingBag` (mais elegante para produtos)
  - `Swords` → `Target` (mais profissional para desafios)
  - `Zap` → `Gift` (melhor para drops)
  - `UserCircle` → `User` (mais limpo)
- Borda superior: `border-yellow-600/30`
- `strokeWidth` consistente: 2 para ativos, 1.5 para inativos
