

## Plano: Remover filtros do mapa

Remover todos os filtros CSS e overlay que alteram a aparência do mapa, deixando-o com visual padrão do CartoDB Positron (branco limpo, ruas cinzas).

### Mudança em `src/index.css`

- `.leaflet-tile-pane`: remover a regra `filter` completamente (ou setar `filter: none`)
- `.leaflet-container::after`: remover o overlay branco semi-transparente (setar `display: none` ou remover o bloco)

| Arquivo | Ação |
|---|---|
| `src/index.css` | Remover filtros e overlay do mapa |

