

# Ajustes na Logo da Tela de Login

## Mudanças em `src/pages/Login.tsx`

1. **Logo maior** - Aumentar o símbolo para `w-14 h-14` e o texto "CIMEDGO" para `text-4xl`
2. **Centralização** - Garantir que o bloco da logo use `flex items-center justify-center` com `w-full` para alinhar perfeitamente ao centro da tela, na mesma largura do formulário (`max-w-sm`)
3. **Alinhamento com inputs** - Envolver logo + subtítulo + form numa mesma coluna com `items-center` e largura consistente, para que tudo fique visualmente alinhado no mesmo eixo central
4. **Fonte bold/black** - Importar fonte **Nunito Black** no `src/index.css` e aplicar `font-['Nunito']` no texto "CIMEDGO" para replicar o estilo arredondado da logo oficial

### Arquivos alterados
- `src/index.css` - Adicionar import Google Fonts Nunito (weight 900)
- `src/pages/Login.tsx` - Aumentar tamanhos, aplicar fonte Nunito, alinhar logo com form

