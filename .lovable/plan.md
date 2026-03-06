

## Correção do bug de zoom no mapa

O problema é que o `Circle` (pulse ring) ao redor do jogador tem raio de 25 metros, que fica enorme quando o zoom é alto. A solução é remover completamente esse círculo.

### Mudança

**`src/components/game/PlayerAvatar.tsx`**:
- Remover o componente `<Circle>` (pulse ring) por completo, deixando apenas o `<Marker>` do personagem
- Remover o import de `Circle` do react-leaflet

Isso elimina qualquer elemento que escale com o zoom do mapa, mantendo apenas o avatar do jogador com tamanho fixo.

