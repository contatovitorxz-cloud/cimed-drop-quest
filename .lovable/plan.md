

## Plano: Refinar Metric Cards e Badge de % no Admin Dashboard

### O que mudar

**Metric Cards** — layout mais organizado e profissional:
- Ícone à esquerda dentro de um quadrado arredondado (não círculo) com fundo `bg-accent/10` e borda `border border-accent/20`
- Label em cima (uppercase, tracking-wider, muted)
- Valor grande abaixo
- Badge de % posicionado no canto superior direito do card (não inline com o valor)
- Card com borda `border-border/20` sutil + `rounded-xl`

**Badge de %** — estilo refinado:
- Fundo `bg-accent/10`, texto `text-accent`, sem border visível
- Ícone `TrendingUp` menor (w-3 h-3) + texto `+15%`
- `rounded-md` em vez de pill, `text-[10px] font-semibold`
- Posicionado absolute no top-right do card

**Mock data** — adicionar valores de change reais:
- Scans QR Code: `+15%`
- Drops Resgatados: `+22%`
- Os dois primeiros sem change (0)

### Arquivos

| Arquivo | Mudança |
|---|---|
| `src/pages/AdminDashboard.tsx` | Refazer layout dos metric cards: ícone quadrado, label/valor empilhados, badge absolute top-right. Trocar `rounded-full` do ícone por `rounded-xl`. Remover `metricGradients`, usar `bg-accent/10 border border-accent/20` uniforme. |
| `src/data/mockData.ts` | Atualizar `mockAdminMetrics` change: `[0, 0, 15, 22]` |

