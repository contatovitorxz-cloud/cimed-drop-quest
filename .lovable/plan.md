

# Adicionar Termos de Uso ao formulário de Influencer

## Alteração em `src/pages/InfluencerRegister.tsx`

Adicionar um checkbox de "Termos de Uso" antes do botão "Enviar inscrição":

- Novo estado `acceptedTerms` (boolean, default `false`)
- Checkbox com label: "Li e aceito os Termos de Uso e Política de Privacidade"
- Botão "Enviar inscrição" fica `disabled` enquanto `acceptedTerms` for `false`
- Estilo consistente com o resto do formulário (Nunito, cores preto/amarelo)

