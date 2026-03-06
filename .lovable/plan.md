

## Plano: Alinhar UI/UX com a Imagem de Referência

Analisei a imagem 2 em detalhe e identifiquei as diferenças com a implementação atual.

---

### Diferenças Identificadas

1. **Header**: Referência mostra foto real do usuário (não iniciais), badge de notificação vermelho com contador "3", logo mais estilizado
2. **Level Card**: Referência usa ícone de presente amarelo (não número), texto "Nível 4 · Caçador de Carmed" e "1.250 pontos" com linha amarela de destaque, sem XP bar
3. **Mapa**: Referência usa mapa padrão (não escuro), mostra múltiplos tipos de marcadores — drops com badge de contagem, farmácias, drop raro com tooltip "Drop Raro 130m", missões, localização do usuário como ponto azul
4. **Action Cards**: Cards escuros com ícones amarelos maiores, "Drops perto de você" tem badge amarelo "2>" à direita
5. **Bottom Nav**: Ícones maiores, labels mais bold, botão Drops central mais proeminente com fundo amarelo sólido
6. **Marcadores no mapa**: Diversos tipos — presente com badge "2", farmácia, drop raro com fogo, missão target, estrela

---

### Mudanças

**`src/pages/Home.tsx`**
- Redesenhar Level Card: ícone Gift amarelo à esquerda, texto "Nível 4 · Caçador de Carmed" + "1.250 pontos", linha amarela fina embaixo (sem XP bar completa)
- Remover label "Explorar mapa" acima do mapa
- Adicionar marcadores diversos no mapa: drops (presente + badge count), drop raro (ícone fogo + tooltip), missões (target), farmácias (pin)
- Trocar tile layer para mapa padrão (não dark) — usar OpenStreetMap ou CartoDB Voyager
- Adicionar botão secundário no mapa (canto inferior direito, ícone de câmera/QR amarelo)
- Action card "Drops" com badge de contagem amarelo à direita
- Trocar ChevronRight por chevron amarelo mais bold

**`src/components/layout/AppHeader.tsx`**
- Avatar: trocar iniciais por avatar com foto placeholder (ou iniciais com estilo mais refinado — círculo amarelo)
- Notification bell: adicionar badge vermelho com número "3"
- Refinar espaçamento e tamanhos

**`src/components/layout/BottomNav.tsx`**
- Ícones maiores (w-6 h-6 nos tabs normais)
- Labels mais bold e maiores (text-xs em vez de text-[10px])
- Botão central Drops: fundo amarelo sólido sempre, ícone preto
- Remover dot indicator abaixo do tab ativo, usar apenas cor amarela

**`src/components/game/PlayerAvatar.tsx`**
- Substituir o avatar SVG complexo por um ponto azul simples com pulse (como na referência — blue dot estilo GPS)

**`src/index.css`**
- Adicionar estilos para novos marcadores do mapa (drop com badge, rare drop com tooltip)
- Ajustar marker styles

**`src/data/mockData.ts`**
- Adicionar dados de drops e missões no mapa (coordenadas próximas ao fallback position) para que o mapa mostre marcadores diversos

---

### Arquivos

| Arquivo | Ação |
|---|---|
| `src/pages/Home.tsx` | Redesenhar level card, marcadores, tile layer, action cards |
| `src/components/layout/AppHeader.tsx` | Badge notificação, avatar refinado |
| `src/components/layout/BottomNav.tsx` | Ícones maiores, labels bold, centro sólido |
| `src/components/game/PlayerAvatar.tsx` | Trocar por blue dot GPS |
| `src/data/mockData.ts` | Adicionar drops/missões com coordenadas para o mapa |
| `src/index.css` | Estilos de novos marcadores |

