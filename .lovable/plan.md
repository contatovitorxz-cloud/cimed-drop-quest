

# Usar logo da Cimed nos marcadores do mapa

## Alteração em `src/pages/Home.tsx`

### Marcadores de farmácia e drops
- Substituir os emojis (`💊` e `⚡`) pela imagem `cimed-symbol.png` dentro dos marcadores do mapa
- Usar uma tag `<img>` inline no HTML do `L.DivIcon` apontando para `/src/assets/cimed-symbol.png` importado
- Como Leaflet `DivIcon` usa HTML raw, precisamos copiar `cimed-symbol.png` para `public/images/cimed-symbol.png` para referenciá-lo diretamente via URL
- Manter o estilo dos círculos laranja/amarelo com glow, mas com a logo Cimed centralizada (tamanho ~18-20px dentro do círculo)
- Ambos os ícones (farmácia e drop) terão a logo Cimed, com o drop mantendo o glow mais forte e animação pulse

