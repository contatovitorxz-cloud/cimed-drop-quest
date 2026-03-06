

# Avatar 3D — Bonequinho com camisa amarela "CIMED"

## Problema
O avatar atual é um círculo azul simples. O usuário quer um bonequinho estilo 3D com camisa amarela escrita "CIMED".

## Solução

### `src/components/game/PlayerAvatar.tsx`
Substituir os `CircleMarker` do jogador por um `DivIcon` customizado com um bonequinho SVG inline:

- **Corpo**: SVG de um personagem estilizado visto de cima/frente (estilo chibi/cartoon simples)
  - Cabeça redonda com rosto simples
  - Corpo com camisa amarela (#FFD400) com texto "CIMED" no centro
  - Braços e pernas simples
  - Sombra circular abaixo para dar efeito 3D
- **Rotação**: O DivIcon inteiro gira conforme o `heading` (direção do jogador)
- **Manter**: O `Circle` de raio de interação (200m) e o círculo de pulse continuam
- **Remover**: Os dois `CircleMarker` (azul e branco) que representavam o avatar antigo
- **Seta direcional**: Integrar a seta no próprio bonequinho (apontando para frente)

O SVG será inline no `DivIcon.html` para máxima customização e performance.

