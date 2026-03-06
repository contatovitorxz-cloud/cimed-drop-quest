

# Remover logo do AppHeader

## Mudança

### `src/components/layout/AppHeader.tsx`
- Remover o import do `cimedSymbol`
- Remover o `<img>` da logo
- Substituir por um espaçador invisível (`<div className="w-8" />`) para manter o "CIMED GO" centralizado entre o espaçador e o sino

