

# Reformulação do Mapa e Avatar

## Problemas Identificados

1. **Avatar feio**: O SVG inline é muito detalhado e fica distorcido na perspectiva 3D. Na referência, o avatar é um personagem fofo e simples sobre um disco brilhante dourado.

2. **Ícone de presente sobrepondo o avatar**: O primeiro drop (`mockDrops[0]`) usa `mockPharmacies[0]` que tem as mesmas coordenadas do `FALLBACK_POSITION` (-23.5629, -46.6544). Por isso o 🎁 aparece em cima do boneco.

3. **Perspectiva do mapa exagerada**: Os valores de `rotateX`, `scale` e `perspective` precisam de refinamento para um visual mais limpo.

---

## Mudanças

### 1. `src/components/game/PlayerAvatar.tsx` — Avatar completamente novo

Substituir o SVG complexo por um design inspirado na referência:
- **Disco dourado brilhante** como base (círculo com glow amarelo)
- **Personagem simplificado** estilo emoji/chibi — cabeça grande redonda, corpo pequeno com camisa amarela CIMED, bracinhos curtos
- Tamanho menor (~48x48px) para não ficar desproporcional no mapa 3D
- Remover a seta direcional (fica estranho na perspectiva)
- Manter os `Circle` de raio de interação mas com opacidade mais sutil
- Adicionar animação CSS de idle (leve flutuação)

### 2. `src/pages/Home.tsx` — Corrigir sobreposição de markers

- Filtrar markers de drops/farmácias/missões que estejam muito próximos da posição do jogador (< 50m) para não sobrepor o avatar
- Ou alternativamente, ajustar o `zIndexOffset` do avatar marker para ficar sempre acima

### 3. `src/index.css` — Refinar perspectiva e adicionar estilo do avatar

- Ajustar `.pokemon-go-map` para perspectiva mais suave (reduzir `rotateX` para ~25deg, ajustar scale)
- Adicionar `.player-character-icon` com animação de flutuação e garantir que fica acima dos outros markers via z-index
- Remover `rotate-slow` dos markers raros que ficam estranhos na perspectiva 3D

### 4. `src/data/mockData.ts` — Afastar drops do ponto do jogador

- Mover as coordenadas do primeiro drop para não coincidir com a posição fallback do jogador

