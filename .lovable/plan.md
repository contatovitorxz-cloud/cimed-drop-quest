

# Adicionar badge "Patrocinador Oficial CBF" ao lado da logo no header

## Alteração

1. **Copiar a imagem** do badge CBF (`D9D001E6-...png`) para `src/assets/cbf-badge.png`
2. **`src/components/layout/AppHeader.tsx`**: Importar o badge e posicioná-lo ao lado do logo/título CIMED GO, dentro de um flex container centralizado. O badge terá altura proporcional (~24px) para não desbalancear o header.

Layout resultante do header:
```text
[Cimed icon + CIMED GO + CBF badge]          [Bell]
```

O grupo central ficará com `flex items-center gap-2` contendo o ícone Cimed, o texto "CIMED GO" e o badge CBF lado a lado.

