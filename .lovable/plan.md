

# Geolocalização Real + Mapa Estilo Pokemon GO

## O que muda

### 1. `src/pages/Home.tsx` — Geolocalização real + mapa segue o jogador
- Usar `navigator.geolocation.watchPosition()` para obter posição real do usuário em tempo real
- O estado `playerPosition` atualiza conforme o usuário se move
- Criar componente interno `MapFollower` que usa `useMap()` do react-leaflet para centralizar o mapa na posição do jogador com `flyTo()` suave
- Zoom mais alto (17-18) para visão próxima estilo Pokemon GO
- Fallback para coordenadas de São Paulo se GPS não disponível
- CSS transform `perspective` + `rotateX` no container do mapa para dar inclinação 3D leve (visão isométrica simulada)

### 2. `src/components/game/PlayerAvatar.tsx` — Recebe posição dinâmica
- Já recebe `position` como prop, não precisa mudar a lógica interna
- O componente vai se mover automaticamente porque a prop muda

### 3. `src/components/game/GameHUD.tsx` — Botão de recentrar
- O botão Navigation (canto inferior esquerdo) vai chamar uma função para recentrar o mapa na posição do jogador

### 4. `src/index.css` — Perspectiva 3D no mapa
- Adicionar CSS para inclinação do mapa: `perspective(1000px) rotateX(25deg)` no container do Leaflet
- Ajuste de escala para compensar a inclinação
- O efeito visual simula a câmera atrás do avatar como no Pokemon GO

## Resultado
O mapa usa GPS real do dispositivo, segue o jogador conforme ele anda, tem visão inclinada estilo 3D, e mantém todos os marcadores, HUD e animações existentes.

