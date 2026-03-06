

# Substituir emojis dos marcadores pela logo Cimed

## Mudança

### `src/pages/Home.tsx`
- Alterar os 4 ícones de marcador (`pharmacyIcon`, `dropIcon`, `rareIcon`, `missionIcon`) para usar a imagem da logo Cimed (`/images/cimed-symbol.png`) dentro da bolinha amarela, em vez dos emojis/símbolos atuais (`+`, `🎁`, `💊`, `⭐`)
- O HTML de cada `DivIcon` passará a ter uma `<img src="/images/cimed-symbol.png">` estilizada com tamanho adequado (~20px) dentro do `div` do marcador

Todas as bolinhas manterão o estilo amarelo com glow, apenas o conteúdo interno muda para a logo Cimed.

