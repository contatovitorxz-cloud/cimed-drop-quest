

# Adicionar cabeçalho (AppHeader) na página Home

## Mudança

### `src/pages/Home.tsx`
- Importar o componente `AppHeader` de `@/components/layout/AppHeader`
- Adicionar `<AppHeader />` no topo do JSX, antes do mapa
- Ajustar o container do mapa para começar abaixo do header (adicionar `pt-14` ou `top-14` no container do mapa para não ficar escondido atrás do header fixo)

Apenas uma mudança simples — o componente `AppHeader` já existe com o logo Cimed, título "CIMED GO" e ícone de notificação no estilo amarelo.

