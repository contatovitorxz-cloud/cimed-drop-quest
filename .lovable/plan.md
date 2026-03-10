

## Plan: Adicionar BottomNav ao Perfil de Influenciador

Adicionar o componente `BottomNav` na página `InfluencerProfile` e ajustar o padding inferior para não sobrepor o conteúdo.

### Alteração em `src/pages/InfluencerProfile.tsx`
- Importar `BottomNav` de `@/components/layout/BottomNav`
- Adicionar `<BottomNav />` antes do fechamento da div principal
- Ajustar o padding-bottom do container de conteúdo (de `pb-8` para `pb-24`) para evitar sobreposição com a navbar fixa

