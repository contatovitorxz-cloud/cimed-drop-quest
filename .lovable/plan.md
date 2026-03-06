

# Limpar HUD e remover partículas

## Mudanças

### 1. `src/pages/Home.tsx` — Remover FloatingParticles
- Remover import e uso do `<FloatingParticles />`
- Remover prop `gpsActive` do `<GameHUD />`

### 2. `src/components/game/GameHUD.tsx` — Remover barra de perfil, temperatura e GPS
- Remover todo o bloco "Top Left - Profile" (nível, username, XP bar)
- Remover todo o bloco "Top Right - GPS + Weather" (28°C e GPS)
- Remover props `level`, `xp`, `maxXp`, `username`, `gpsActive` da interface
- Manter apenas: botão QR Code (centro inferior), botões de ação (direita inferior), botão de recentralizar (esquerda inferior)
- Remover imports não usados (`Sun`)

### 3. `src/index.css` — Remover CSS de partículas
- Remover `@keyframes particle-float` e estilos relacionados (se existirem)

## Resultado
Interface limpa: apenas o mapa, os marcadores, o botão de escanear QR, os botões de ação lateral e o botão de recentralizar. Sem partículas flutuantes, sem barra de jogador, sem temperatura, sem indicador GPS.

