

# Fix: Mapa bugado — Adicionar céu e corrigir perspectiva 3D

## Problema
A perspectiva CSS 3D do mapa cria uma grande área preta no topo da tela. No Pokemon GO (foto 2), essa área é preenchida com um **gradiente de céu azul** que dá a ilusão de horizonte. Além disso, os valores de transform precisam de ajuste para o mapa ocupar melhor a tela.

## Mudanças

### 1. `src/pages/Home.tsx`
- Adicionar um **div de céu** como fundo atrás do mapa — gradiente de azul claro para branco, ocupando a metade superior da tela
- O mapa fica por cima com a perspectiva 3D, e o céu aparece onde o mapa não cobre

### 2. `src/index.css` — Ajustar perspectiva e adicionar céu
- Ajustar `.pokemon-go-map` para ter background com gradiente de céu (azul claro → branco → verde claro na base)
- Refinar os valores de `rotateX`, `scale` e `transform-origin` para que o mapa cubra melhor a tela sem deixar gaps pretos
- Reduzir `rotateX` de 40deg para ~30deg e aumentar scale para ~1.6 para cobrir mais área
- Ajustar `perspective-origin` para melhor enquadramento
- Adicionar classe `.sky-background` com gradiente estilo Pokemon GO: `#87CEEB` (céu) → `#B8E0F0` → branco

### 3. `src/components/game/FloatingParticles.tsx`
- Sem mudanças estruturais, apenas garantir que as partículas ficam sobre o céu também

## Resultado
O topo da tela mostra um céu azul gradiente como no Pokemon GO. O mapa inclinado preenche da metade da tela pra baixo sem gaps pretos. A sensação visual é idêntica à referência.

