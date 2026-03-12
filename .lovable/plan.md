

## Plano: Campo de valor para saque

Adicionar um campo de input para o influencer digitar o valor que deseja sacar, com validação (não pode ser maior que o saldo disponível nem menor/igual a zero).

### Alterações

**`src/pages/InfluencerProfile.tsx`**:
- Adicionar estado `withdrawAmount` (string)
- Inserir um `Input` com placeholder "R$ 0,00" entre o saldo exibido e o botão "Solicitar Saque"
- Label "Valor do saque" acima do input
- Botão desabilitado se `withdrawAmount` for vazio, zero, ou maior que `commissionBalance`
- Feedback via toast se valor inválido ao clicar no botão

