

# Criar página de Termos de Uso do Programa Influencer Cimed

## Novo arquivo: `src/pages/TermsOfUse.tsx`

Página dedicada com texto explicativo cobrindo:

1. **Objeto do Programa** — descrição do programa de influenciadores Cimed GO
2. **Requisitos do Influenciador** — conhecimento da marca Cimed, alinhamento com valores
3. **Cessão de Direitos de Imagem** — autorização de uso de imagem, voz, nome e likeness pela Cimed em materiais promocionais, redes sociais, etc.
4. **Propriedade Intelectual** — conteúdo criado para a Cimed, uso da marca e logotipos
5. **Conduta e Responsabilidades** — representação adequada da marca, proibição de conteúdo ofensivo
6. **Confidencialidade** — informações sobre lançamentos e estratégias
7. **Rescisão** — condições de desligamento do programa
8. **Política de Privacidade (resumo)** — coleta e uso de dados pessoais (LGPD)

Layout: header amarelo igual ao formulário, conteúdo com scroll, botão de voltar.

## Alteração: `src/pages/InfluencerRegister.tsx`

- Links "Termos de Uso" e "Política de Privacidade" passam a navegar para `/termos-de-uso` (abrindo em nova aba ou navegando).

## Alteração: `src/App.tsx`

- Adicionar rota `/termos-de-uso` apontando para `TermsOfUse`.

