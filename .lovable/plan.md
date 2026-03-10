

## Plan: Substituir logo no Login

Trocar o logo atual (símbolo PNG + texto "CIMEDGO") pelo SVG enviado pelo usuário.

### Alterações

1. Copiar `user-uploads://Logotipo_da_Cimed-2.svg` para `src/assets/cimed-logo-go.svg`

2. Em `src/pages/Login.tsx`:
   - Trocar o import de `cimed-symbol.png` pelo novo SVG
   - Substituir o bloco do logo (linha 48-51) — remover o `<img>` do símbolo e o `<span>` do texto, colocar apenas o SVG importado como imagem com tamanho adequado
   - Manter o subtítulo abaixo

