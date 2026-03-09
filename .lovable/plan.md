

## Plano: Refinar Metric Cards do Influencer Dashboard

### Mudanças

**`src/pages/InfluencerDashboard.tsx`**

1. **Ícones** — trocar `rounded-full` por `rounded-xl` (quadrado arredondado), com `bg-accent/10 border border-accent/20` para visual mais profissional e estruturado

2. **Indicadores de %** — remover o `Badge` com caixa/fundo. Substituir por texto inline simples:
   - Verde (`text-emerald-400`) para crescimento positivo com `TrendingUp`
   - Vermelho (`text-red-400`) para negativo com `TrendingDown`
   - Sem fundo, sem borda, apenas ícone + texto pequeno (`text-[10px] font-medium`)

3. **Cards de métrica** — aumentar profundidade:
   - Trocar `glass-card` por fundo sólido escuro (`bg-card/80`) com borda `border border-border/30`
   - Shadow mais agressivo: `shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.15),0_20px_40px_rgba(0,0,0,0.2)]`
   - `rounded-2xl` para cantos mais suaves

4. **Quick Action cards** — mesmo tratamento: ícones `rounded-xl`, sombra profunda, `rounded-2xl`

5. **Chart card** — `rounded-2xl` + sombra profunda reforçada

### Arquivos

| Arquivo | Mudança |
|---|---|
| `src/pages/InfluencerDashboard.tsx` | Refazer metric cards (ícone quadrado, % sem caixa com cor verde/vermelho), quick actions com ícone quadrado, shadow mais profundo em todos os cards |
| `src/index.css` | Adicionar `.shadow-depth-xl` com camadas de sombra mais profundas |

