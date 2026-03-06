

## Plano: Ajustar cards de métricas para ficar idêntico à referência

Comparando com a imagem, as diferenças são:
- Ícones precisam ser maiores e mais destacados (amarelo, dentro de um círculo ou mais espaçados)
- Labels em uppercase com mais espaçamento
- Números maiores e mais bold
- Cards com mais padding vertical e fundo mais escuro/definido

### Mudanças em `src/pages/InfluencerDashboard.tsx` (linhas 73-83)

- Aumentar padding dos cards (`p-4` em vez de `p-3`)
- Aumentar tamanho dos ícones (`w-7 h-7`)
- Aumentar espaçamento vertical (`space-y-2`)
- Números maiores (`text-xl font-extrabold`)
- Labels com `text-[9px]` uppercase tracking wider

| Arquivo | Ação |
|---|---|
| `src/pages/InfluencerDashboard.tsx` | Ajustar styling dos cards de métricas |

