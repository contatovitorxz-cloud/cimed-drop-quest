

# Camera Pokemon GO — Offset + Rotação por Bússola + Interpolação Suave

## Situação Atual
O mapa já tem GPS real, perspectiva CSS 3D e `flyTo` para seguir o jogador. Porém o avatar fica no centro da tela e não há rotação por bússola — não parece Pokemon GO onde o avatar fica na parte inferior e o mapa gira com a direção do jogador.

## Limitação Técnica
Leaflet não suporta rotação nativa do mapa. Para girar o mapa conforme a bússola, aplicaremos `CSS transform rotate()` no container do Leaflet, combinado com o `perspective/rotateX` existente. Isso simula perfeitamente a câmera Pokemon GO.

---

## Mudanças

### 1. `src/pages/Home.tsx` — Sistema de câmera completo
- **Offset do avatar**: Usar `map.panBy()` ou ajustar o centro do mapa para ~30% acima da posição real, fazendo o avatar aparecer no terço inferior da tela
- **Bússola (heading)**: Capturar `DeviceOrientationEvent` (mobile) para obter a direção que o dispositivo aponta. Em desktop, calcular heading pela diferença entre posições GPS consecutivas
- **Estado `heading`**: Ângulo em graus que será aplicado como `rotate()` CSS no container do mapa
- **Interpolação suave**: Ao receber nova posição GPS, interpolar entre posição atual e nova com `requestAnimationFrame` para evitar saltos
- **MapFollower atualizado**: Além de `flyTo`, aplicar o offset vertical para manter avatar na parte inferior
- **Zoom limits**: `minZoom={15}` e `maxZoom={19}`, padrão 17

### 2. `src/index.css` — Rotação dinâmica do mapa
- Atualizar `.pokemon-go-map .leaflet-container` para aceitar uma CSS variable `--map-heading` que controla o `rotateZ`
- Transform completo: `rotateX(35deg) rotateZ(var(--map-heading, 0deg)) scale(1.35)`
- Transição suave na rotação: `transition: transform 0.3s ease-out`
- Ajustar `perspective-origin` para 50% 85% (avatar mais baixo na tela)

### 3. `src/components/game/PlayerAvatar.tsx` — Indicador de direção
- Adicionar um DivIcon com seta direcional que aponta para onde o jogador está olhando
- Receber prop `heading` para rotacionar a seta
- Manter os circles de raio de interação

### 4. `src/components/game/GameHUD.tsx` — Sem mudanças estruturais
- O botão de recentrar já existe e funciona

## Resultado
Avatar fixo na parte inferior da tela, mapa gira suavemente conforme o jogador vira o celular, movimento interpolado sem saltos, zoom por pinça mantido.

