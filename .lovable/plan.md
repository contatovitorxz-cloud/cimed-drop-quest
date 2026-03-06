

## Plano: Restaurar ícones amarelos com logo Cimed

Na referência, os marcadores de farmácia são círculos amarelos/dourados com o símbolo da Cimed dentro, em vez de fundo branco.

### Mudança em `src/index.css`

**`.marker-pharmacy`** (linha 138-148):
- Trocar `background: white` para `background: linear-gradient(135deg, #FFD400, #FFC000)` (amarelo dourado)
- Trocar `border: 2px solid hsl(var(--accent))` para `border: 2px solid rgba(255, 212, 0, 0.6)` (borda amarela sutil)
- Adicionar `box-shadow` com glow amarelo para combinar com o estilo dos outros markers

| Arquivo | Ação |
|---|---|
| `src/index.css` | Alterar estilo `.marker-pharmacy` para fundo amarelo |

