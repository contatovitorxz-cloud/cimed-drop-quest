

## Ocultar scrollbar lateral

Adicionar CSS para esconder a barra de rolagem lateral mantendo a funcionalidade de scroll.

### Alteração

**`src/index.css`** — Adicionar regras para ocultar scrollbar em todos os browsers:
- `::-webkit-scrollbar { width: 0; display: none; }` (Chrome/Safari/Edge)
- `html, body { scrollbar-width: none; }` (Firefox)

