

## Plano: Corrigir filtros do mapa — mais branco, ruas amarelas sutis

O problema: os filtros CSS atuais (`saturate(0.15) sepia(0.5)`) estão deixando o mapa com tom marrom/sépia demais em vez de branco limpo com ruas amarelas.

### Correção em `src/index.css`

**`.leaflet-tile-pane`** — ajustar filtros:
- Aumentar `brightness` para `1.35` (branquear mais)
- Aumentar `saturate` para `0.4` (manter um pouco mais de cor nas ruas)
- Reduzir `sepia` para `0.35` (menos marrom)
- Ajustar `hue-rotate` para `15deg` (puxar para amarelo dourado em vez de marrom)

**`.leaflet-container::after`** — aumentar overlay branco:
- Mudar de `rgba(255, 255, 255, 0.15)` para `rgba(255, 255, 255, 0.25)` para branquear mais o fundo

**`.leaflet-container`** — fundo base branco:
- Mudar `background` de `#f0f0f0` para `#ffffff`

| Arquivo | Ação |
|---|---|
| `src/index.css` | Ajustar 3 regras CSS de filtro do mapa |

