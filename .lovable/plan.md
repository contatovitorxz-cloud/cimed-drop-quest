

## Tornar a tabela de transações scrollável horizontalmente

A tabela já tem `overflow-x-auto` e `min-w-[900px]`, mas o container `Card` pode estar impedindo o scroll visual no mobile (390px). O usuário quer ver claramente que pode arrastar para os lados.

### Alteração em `src/pages/AdminDashboard.tsx`

Na `SalesGatewaySection`, no bloco da tabela (linhas ~1147-1233):

1. Mover a paginação para **fora** do container scrollável — atualmente está dentro do `CardContent` junto da tabela, o que pode causar scroll indesejado na paginação também
2. Separar o `overflow-x-auto` wrapper com uma indicação visual de scroll: adicionar um gradiente sutil na borda direita (pseudo-element via wrapper `relative` + `after:` gradient) para sinalizar conteúdo cortado
3. Garantir que o `Card` wrapper tenha `overflow-hidden` e o `div` interno tenha `overflow-x-auto` com `-webkit-overflow-scrolling: touch` para scroll suave no mobile
4. Manter a paginação fora do scroll (full-width, fixa na base do card)

Estrutura resultante:
```
<Card className="overflow-hidden">
  <div className="overflow-x-auto relative">
    <table min-w-[900px]>...</table>
  </div>
  <div className="pagination border-t">...</div>  ← fora do scroll
</Card>
```

Mudança simples, sem dados novos — apenas ajuste de containers CSS.

