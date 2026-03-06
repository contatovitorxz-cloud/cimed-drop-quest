

# Simplificar mapa — remover perspectiva 3D e corrigir zoom

## Problema
O mapa tem perspectiva 3D estilo Pokémon GO (`rotateX(25deg) scale(1.4)`) que causa bugs visuais no zoom e interação. O usuário quer um mapa plano e funcional onde veja sua rua e possa dar zoom out para ver farmácias próximas.

## Mudanças

### 1. `src/index.css` — Remover perspectiva 3D
- Remover `perspective`, `perspective-origin` e o background de "céu" da classe `.pokemon-go-map`
- Remover `transform: rotateX(25deg) scale(1.4)` do `.pokemon-go-map .leaflet-container`
- Manter o filtro de saturação nos tiles para o mapa ficar bonito
- Manter o `.pokemon-go-map` apenas como container simples com overflow hidden

### 2. `src/pages/Home.tsx` — Ajustar zoom e remover offset
- Mudar zoom inicial de `17` para `16` (nível de rua, mostra ~500m ao redor)
- Mudar `minZoom` de `15` para `13` (permite ver bairro/região com farmácias)
- Manter `maxZoom: 19`
- Remover a função `getOffsetCenter` e o `OFFSET_FACTOR` — centrar o mapa direto na posição do jogador
- Remover o `mapContainerRef` e o efeito de CSS rotation (heading) já que não há mais perspectiva 3D
- Simplificar o `MapFollower` para usar posição direta sem offset

### 3. `src/index.css` — Remover rotação do mapa
- Remover referências a `--map-heading` que já não será usado

## Resultado
Mapa plano, limpo, zoom funcional. Usuário vê sua rua no zoom padrão e pode dar zoom out para localizar farmácias próximas. Sem bugs de perspectiva 3D.

