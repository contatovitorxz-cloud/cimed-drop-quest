

## Correção definitiva do mapa ficando preto ao dar zoom

### Diagnóstico

O problema persiste porque:

1. **`setView` com `animate: true`** interfere com a animação interna de zoom do Leaflet, causando conflito na renderização dos tiles
2. **`isZoomingRef` reseta imediatamente no `zoomend`**, mas o Leaflet ainda está processando tiles internamente — qualquer `setView` nesse momento causa tela preta
3. O loop `requestAnimationFrame` roda continuamente, gerando atualizações de estado que podem disparar o `useEffect` do `MapFollower` durante/logo após o zoom

### Mudanças

**`src/pages/Home.tsx`**:

1. **MapFollower** — trocar `animate: true` por `animate: false` no `setView`, eliminando conflito com animação de zoom do Leaflet

2. **MapFollower** — adicionar delay de 300ms após `zoomend` antes de liberar o `setView` novamente, dando tempo para os tiles carregarem:
   ```
   zoomend: () => { setTimeout(() => { isZoomingRef.current = false; }, 300); }
   ```

3. **Animation loop** — parar o loop `requestAnimationFrame` quando a posição e heading já convergiram (evitar atualizações desnecessárias contínuas). Adicionar ref `isAnimatingRef` que só reinicia quando `playerPosition` ou `heading` mudam.

Estas três mudanças eliminam completamente a interferência entre zoom e renderização de tiles.

