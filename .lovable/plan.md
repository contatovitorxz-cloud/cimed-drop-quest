

## Plano: Redesign do InfluencerDashboard conforme referência

Baseado na imagem de referência, o layout precisa ser reestruturado para ficar mais limpo e direto.

### Mudanças em `src/pages/InfluencerDashboard.tsx`

#### Header
- Remover seta de voltar, manter apenas logo "Cimed GO / Creator Hub" à esquerda e avatar com botão X à direita (como na imagem)

#### Welcome
- Texto maior: "Bem-vindo, **{nome}**!" com nome em amarelo/accent
- Subtítulo: "Crie drops e campanhas para a Cimed."

#### CTA "Criar Drop"
- Manter botão amarelo grande, sem mudança significativa

#### Métricas
- 3 cards lado a lado com ícones distintos: Eye (Visualizações), MousePointerClick (Cliques), ShoppingBag/Package (Conversões)
- Labels acima dos valores, layout com bordas arredondadas

#### Ações rápidas (NOVO - substitui as Tabs)
- Remover o sistema de Tabs (Campanhas/QR Codes/Drops)
- Substituir por 2 cards de ação lado a lado:
  - **Campanhas** — ícone megafone, "Gerencie suas campanhas."
  - **Meus QR Codes** — ícone QR, "Ver e gerenciar QR Codes ativos."

#### Gráfico de Desempenho
- Manter o chart mas trocar o seletor de período de botões (7d/30d/90d) para um dropdown "Últimos 7 dias"
- Mostrar apenas 2 linhas: Cliques (amarelo) e Conversões (branco)
- Remover a linha de engajamento

| Arquivo | Ação |
|---|---|
| `src/pages/InfluencerDashboard.tsx` | Redesign completo do layout conforme referência |

