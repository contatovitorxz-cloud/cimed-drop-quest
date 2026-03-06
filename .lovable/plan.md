

# Mapa Gamificado Cimed GO — Estilo Pokemon GO Aprimorado

## Visao Geral

Transformar a tela Home num mapa gamificado imersivo inspirado em Pokemon GO, usando Leaflet como base mas com uma camada visual completamente nova: tile layer colorido estilo game, marcadores animados por tipo, HUD completo de jogo, avatar do jogador com circulo de interacao, e particulas flutuantes.

**Limitacao tecnica**: Leaflet e 2D. Nao e possivel renderizar mapa 3D isometrico real com buildings low-poly num app React/Vite. A abordagem sera criar uma experiencia visual tao rica que simule a sensacao de um jogo mobile moderno usando CSS avancado, animacoes e overlays bem desenhados.

---

## Arquivos a Criar

### 1. `src/components/game/GameHUD.tsx`
HUD flutuante completo sobre o mapa:
- **Topo esquerdo**: Avatar circular do usuario + nivel + mini barra XP
- **Topo direito**: indicador GPS (ponto verde pulsante) + icone sol/clima
- **Centro inferior**: botao grande arredondado "ESCANEAR QR CODE" com gradiente vermelho Cimed (#E30613)
- **Inferior direito**: 3 botoes circulares empilhados — Missoes (bandeira), Inventario (mochila), Mapa (bussola)
- Estilo glassmorphism com backdrop-blur

### 2. `src/components/game/PlayerAvatar.tsx`
- Marcador central no mapa representando o jogador
- Circulo azul translucido pulsante ao redor (raio de interacao ~200m)
- Icone central com simbolo Cimed ou avatar estilizado
- Animacao idle de bounce suave
- Usa `CircleMarker` + `Circle` do react-leaflet

### 3. `src/components/game/FloatingParticles.tsx`
- Overlay CSS com ~15 particulas (pequenos losangos/circulos brilhantes)
- Animacao float aleatoria com diferentes durações e delays
- Cores em amarelo/dourado/azul claro translucidos
- Posicionado absoluto sobre o mapa, pointer-events: none

---

## Arquivos a Modificar

### 4. `src/data/mockData.ts`
Adicionar:
- Interface `Mission` com campos: id, title, description, lat, lng, type, reward
- Array `mockMissions` (~5 missoes espalhadas pelo mapa)
- Interface `RareProduct` com campos: id, product, lat, lng
- Array `mockRareProducts` (~4 produtos raros flutuantes no mapa)

### 5. `src/pages/Home.tsx` — Reescrita significativa
- Trocar tile layer dark por **CartoDB Voyager** (colorido, claro, verde/azul)
- Remover `AppHeader` e `BottomNav` — usar `GameHUD` proprio
- 4 tipos de marcadores com DivIcon customizado e animacoes CSS:
  - **Farmacia**: circulo vermelho (#E30613) com cruz farmaceutica, sombra vermelha
  - **Drop**: caixa dourada com animacao pulse brilhante
  - **Produto raro**: capsula azul (#0066FF) flutuante com animacao rotate + float
  - **Missao**: estrela amarela com animacao pulse suave
- Adicionar componente `PlayerAvatar` no centro
- Adicionar `FloatingParticles` como overlay
- Adicionar `GameHUD` como overlay

### 6. `src/index.css` — Novas animacoes
Adicionar keyframes:
- `@keyframes float` — movimento vertical suave (translate Y)
- `@keyframes rotate-slow` — rotacao 360 lenta para produtos raros
- `@keyframes glow-pulse` — brilho pulsante para drops
- `@keyframes bounce-idle` — bounce suave para avatar
- `@keyframes particle-float` — movimento aleatorio para particulas
- Override do tile layer para tons mais vibrantes (filtro CSS saturate/brightness no `.leaflet-tile-pane`)

---

## Paleta Aplicada
- Vermelho Cimed: #E30613 (farmacias, botao QR)
- Azul destaque: #0066FF (raio interacao, produtos raros)
- Amarelo/Dourado: #FFD400 (drops, XP, missoes)
- Verde mapa: tiles claros naturais do Voyager
- Branco: elementos de UI
- Preto: textos e contrastes

## Resultado Esperado
Tela de mapa que parece um jogo mobile real — colorida, animada, com HUD gamificado, marcadores diferenciados por tipo com animacoes unicas, avatar do jogador com raio de acao, e particulas que dao vida ao cenario.

