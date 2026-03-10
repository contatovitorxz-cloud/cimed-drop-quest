

## Plan: Criar BottomNav específica para Influenciador

O `InfluencerProfile` atualmente usa a `BottomNav` genérica (MAPA, MISSÕES, DROPS, RANKING, PERFIL). O influenciador precisa de uma navbar própria com tabs relevantes ao seu contexto.

### Alterações

**1. Criar `src/components/layout/InfluencerBottomNav.tsx`**
- Componente similar ao `BottomNav` mas com tabs de influenciador:
  - `/influencer-dashboard` — DASHBOARD (ícone LayoutDashboard)
  - `/drops` — DROPS (ícone Gift, botão central amarelo elevado)
  - `/influencer-profile` — PERFIL (ícone UserRound)
- Mesmo estilo NeoBrutalist (border-[3px], botão central elevado com shadow)

**2. Editar `src/pages/InfluencerProfile.tsx`**
- Substituir import de `BottomNav` por `InfluencerBottomNav`
- Trocar `<BottomNav />` por `<InfluencerBottomNav />`

**3. Editar `src/pages/InfluencerDashboard.tsx`**
- Adicionar `<InfluencerBottomNav />` no final da página (atualmente não tem bottom nav)

