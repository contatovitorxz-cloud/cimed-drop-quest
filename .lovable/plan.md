

## Plano: Restaurar todos os marcadores do mapa conforme referência

O design de referência mostra todos os tipos de marcadores no mapa: farmácias, drops com badge, drop raro e missões. Preciso reverter a remoção feita anteriormente.

### Mudança em `src/pages/Home.tsx`

Restaurar os 3 blocos de marcadores que foram removidos no último diff:
- `mockMapDrops` com `createDropIcon`
- `mockMapRareDrops` com `rareDropIcon`
- `mockMapMissions` com `missionIcon`

| Arquivo | Ação |
|---|---|
| `src/pages/Home.tsx` | Restaurar marcadores de drops, drops raros e missões |

