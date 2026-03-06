

# Animação de caminhada do bonequinho ao se mover

## Objetivo
Quando o GPS detectar movimento real, o bonequinho deve ter uma animação de caminhada (pernas alternando). Quando parado, fica estático.

## Mudanças

### 1. `src/components/game/PlayerAvatar.tsx`
- Adicionar prop `isMoving` ao componente
- Quando `isMoving=true`, aplicar classe CSS `player-walking` ao ícone
- Recriar o `DivIcon` quando `isMoving` muda (adicionar ao `useMemo` deps)

### 2. `src/index.css`
- Adicionar animação `@keyframes walk` que alterna as pernas (translate Y alternado nas pernas esquerda/direita) e faz um leve balanço no corpo
- Aplicar via `.player-character-icon.walking` 

### 3. `src/pages/Home.tsx`
- Criar estado `isMoving` baseado na distância entre posições GPS consecutivas
- Se `dist > 0.00002` (threshold já existente no código), setar `isMoving = true`
- Usar um timeout de ~2s para voltar a `false` quando parar
- Passar `isMoving` como prop para `PlayerAvatar`

## Detalhes da animação
- Pernas: balanço alternado via CSS transform nos elementos SVG das pernas (usando classes nos `rect` das pernas)
- Corpo: leve bounce vertical de 1-2px
- Ciclo de ~0.5s para parecer caminhada natural

