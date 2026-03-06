

## Correção do mapa ficando preto ao dar zoom

### Diagnóstico

O problema está na função `animate` em `Home.tsx` que roda via `requestAnimationFrame` a cada frame (~60fps), atualizando `displayPosition` constantemente. Isso faz o `MapFollower` chamar `map.setView()` repetidamente durante o zoom, conflitando com a animação de zoom do Leaflet e causando a tela preta.

### Mudanças

**`src/pages/Home.tsx`**:

1. No `MapFollower`, adicionar listener para `zoomstart`/`zoomend` e ignorar `setView` durante zoom:
   - Criar ref `isZooming` que bloqueia o `setView` enquanto o zoom está em andamento
   - Escutar eventos `zoomstart` e `zoomend` via `useMapEvents`

2. Na animação de interpolação, só atualizar `displayPosition` quando a diferença for significativa (> 0.000001), evitando micro-updates desnecessários que causam re-renders infinitos.

Estas duas mudanças eliminam a interferência entre o loop de animação e a operação de zoom do Leaflet.

