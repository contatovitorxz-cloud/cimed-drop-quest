

## Plano: Mapa branco com ruas amarelas

O mapa atual usa tiles padrão do OpenStreetMap. Para deixar o fundo mais branco e as ruas amarelas, vou aplicar filtros CSS no tile layer do Leaflet.

### Abordagem

Usar CSS filters no `.leaflet-tile-pane` para:
1. Aumentar brilho e saturação para branquear o fundo
2. Aplicar `hue-rotate` para puxar as cores das ruas para amarelo
3. Complementar com um overlay CSS semi-transparente branco sobre o mapa para clarear ainda mais o fundo

**`src/index.css`**
- Adicionar filtros CSS no `.leaflet-tile-pane` dentro de `.pokemon-go-map` ou globalmente:
  - `brightness(1.15)` para clarear
  - `saturate(0.3)` para dessaturar cores de fundo
  - `sepia(0.4)` + `hue-rotate(-10deg)` para puxar tons para amarelo nas ruas
- Adicionar pseudo-elemento ou overlay branco semi-transparente sobre os tiles para branquear o fundo geral

**`src/pages/Home.tsx`**
- Trocar o tile provider para CartoDB Positron (mapa muito branco/limpo) — `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`
- Aplicar CSS filter amarelo apenas nas linhas de rua via classe customizada no container

### Arquivos

| Arquivo | Ação |
|---|---|
| `src/pages/Home.tsx` | Trocar tile URL para CartoDB Positron (fundo branco) |
| `src/index.css` | Adicionar filtros CSS para amarelecer ruas e branquear fundo |

