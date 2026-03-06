

## Redesign da Home para Corresponder à Imagem de Referência

A imagem mostra um layout completamente diferente do atual. O mapa deixa de ser fullscreen e passa a ser um card embutido numa página scrollável com fundo escuro. Segue o plano:

### Estrutura da Nova Home

```text
┌──────────────────────────────┐
│ Header: "Cimed GO" + Avatar │
│         Creator Hub   + 🔔3  │
├──────────────────────────────┤
│ 🎁 Nível 4 · Caçador de     │
│    Carmed · 1.250 pontos     │
├──────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │      MAP (rounded)       │ │
│ │   markers + player dot   │ │
│ │              📍 recenter │ │
│ └──────────────────────────┘ │
├──────────────────────────────┤
│ 🎁 Drops perto de você    2>│
│    Resgate prêmios           │
├──────────────────────────────┤
│ 🎯 Missões da semana       >│
│    Complete desafios         │
├──────────────────────────────┤
│ 🏆 Ranking da cidade       >│
│    Veja quem está no topo    │
├──────────────────────────────┤
│ Mapa │Missões│Drops│Rank│Perf│
└──────────────────────────────┘
```

### Mudanças por Arquivo

**1. `src/pages/Home.tsx`** — Reescrever completamente o layout:
- Remover layout fullscreen `fixed inset-0`. Usar scroll vertical `min-h-screen bg-background`
- Manter toda lógica de GPS, heading, interpolação (hooks existentes)
- Layout: AppHeader no topo, depois card de nível/pontos, depois mapa em div com altura fixa (~280px) e `rounded-2xl overflow-hidden`, depois 3 action cards escuros
- Mapa com botão de recenter (círculo amarelo) no canto superior direito do card do mapa
- Remover `GameHUD` (não existe mais nesse layout — ações estão nos cards abaixo)
- Os 3 cards de ação: "Drops perto de você" → `/drops`, "Missões da semana" → `/missions`, "Ranking da cidade" → `/leaderboard`
- Cards escuros (`bg-card rounded-2xl`) com ícone amarelo à esquerda, texto branco, chevron à direita

**2. `src/components/layout/AppHeader.tsx`** — Redesenhar para corresponder à imagem:
- Fundo escuro/preto (não mais gradient-yellow)
- Lado esquerdo: "Cimed GO" em texto (fonte Nunito bold) + "Creator Hub" subtítulo
- Lado direito: avatar circular do usuário + botão de notificação com badge de contagem (número "3")
- Linha amarela fina na borda inferior como detalhe

**3. `src/components/layout/BottomNav.tsx`** — Alterar tabs para corresponder à imagem:
- 5 tabs: Mapa (MapPin), Missões (ListChecks/Target), Drops (Gift - centro destacado), Ranking (Trophy), Perfil (User)
- Fundo escuro/preto (não mais gradient-yellow)
- Tab ativa em amarelo, inativas em cinza
- O "Drops" no centro é destacado (ícone maior, estilo diferenciado como na imagem - sem ser QR scanner)
- Remover QR Scanner do BottomNav (fica acessível de outra forma)

**4. `src/components/game/GameHUD.tsx`** — Remover ou simplificar. O HUD não existe mais nesse layout. A Home não importará mais este componente.

**5. `src/index.css`** — Ajustar estilos do mapa para funcionar em container com rounded corners (não mais fullscreen). Garantir que `.leaflet-container` dentro do card tenha `border-radius` correto.

### Detalhes Visuais (da imagem)
- Card de nível: fundo escuro, ícone de presente amarelo à esquerda, "Nível 4 · Caçador de Carmed" em branco bold, "1.250 pontos" em amarelo abaixo
- Cards de ação: fundo `#1a1a1a`, ícones amarelos, texto branco, borda sutil, chevron `>` amarelo à direita
- Card "Drops perto de você" tem badge circular amarelo com "2 >" à direita
- Mapa usa tiles claros (estilo padrão/light, não dark) com marcadores variados
- Botão recenter: círculo preto com ícone de navegação amarelo, posicionado no canto superior direito do mapa

