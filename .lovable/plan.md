

## Plan: Substituir texto "CIMED GO" pela logo SVG nos cabeçalhos

Substituir o texto "CIMED GO" nos headers do `AppHeader` e `InfluencerDashboard` pela logo SVG da Cimed (já existente em `src/assets/cimed-logo.svg`) seguida do texto "GO" em amarelo, replicando o visual da imagem enviada.

### Alterações

**1. `src/components/layout/AppHeader.tsx`**
- Remover o texto "CIMED GO" e o subtítulo "Creator Hub"
- Colocar a logo SVG (`cimed-logo.svg`) com altura adequada + texto "GO" em amarelo/accent ao lado
- Manter o símbolo (ícone quadrado) à esquerda

**2. `src/pages/InfluencerDashboard.tsx`**
- Mesma alteração no header: substituir `<span>CIMED GO</span>` pela logo SVG + "GO" em amarelo

### Arquivos editados
- `src/components/layout/AppHeader.tsx`
- `src/pages/InfluencerDashboard.tsx`

