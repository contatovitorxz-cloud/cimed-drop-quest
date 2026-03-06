

# Mapa dark mode com recentralização ao clicar no ícone

## Mudanças

### 1. `src/index.css` — Tema escuro no mapa
- Trocar o TileLayer filter de `saturate(1.4) brightness(1.08)` para `brightness(0.15) invert(1) contrast(1.5) hue-rotate(200deg) saturate(0.3)` — isso transforma os tiles claros em um visual dark elegante
- Mudar `.leaflet-container` background de `#f0f0f0` para `#0a0a0a` (preto)

### 2. `src/pages/Home.tsx` — TileLayer dark + arrastar desativa follow
- Trocar o TileLayer URL para `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png` (tiles nativamente escuros do CartoDB — mais bonito que filtro CSS)
- Remover o filtro CSS dos tiles já que o tile já é dark
- Adicionar evento `dragstart` no mapa para setar `setFollowPlayer(false)` — assim o usuário pode arrastar livremente
- O botão de recentralizar (Navigation, já existente no GameHUD) já chama `handleRecenter` que seta `followPlayer = true`, fazendo o mapa voltar ao jogador

### 3. `src/index.css` — Ajustar filtro dos tiles
- Remover ou simplificar o filtro em `.leaflet-tile-pane` já que os tiles dark não precisam de saturação extra

## Resultado
Mapa escuro/dark elegante. Usuário pode arrastar para explorar. Ao clicar no ícone de navegação (canto inferior esquerdo), volta a seguir o personagem.

