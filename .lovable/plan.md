

## Plan: Substituir ícone do mapa por pin amarelo

Trocar o marcador quadrado com logo Cimed por um ícone de pin (gota) amarelo usando SVG inline no `L.DivIcon`.

### Alterações

**`src/pages/Home.tsx`** (linhas 22-23)
- Remover `cimedImg` e o marcador quadrado
- Criar um SVG inline de pin/gota na cor amarela (`#FFD500`) com borda preta, usando `L.DivIcon`
- Ajustar `iconSize` e `iconAnchor` para o formato de pin (âncora na ponta inferior)

**`src/index.css`**
- Remover ou simplificar a classe `.marker-pharmacy` (não será mais usada)

