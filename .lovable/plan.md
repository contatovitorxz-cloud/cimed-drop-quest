

## Plano: Trocar fonte do "CIMED GO" para Nunito Black

### Mudanças

| Arquivo | Mudança |
|---|---|
| `index.html` | Adicionar `Nunito:wght@900` ao link do Google Fonts (já existe na URL) |
| `src/components/layout/AppHeader.tsx` | Trocar `font-anton` por `font-nunito` no título "CIMED GO" |
| `tailwind.config.ts` | Adicionar `nunito: ["Nunito", "sans-serif"]` em `fontFamily` |

A fonte Nunito weight 900 (Black) já está sendo importada no `index.html`. Basta registrar no Tailwind e aplicar no header.

