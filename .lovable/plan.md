

# Centralizar links + Criar página de Influencer

## 1. Centralizar os dois links no Login (`src/pages/Login.tsx`)
- Adicionar `text-center` nos dois botões (linhas 99-107) para garantir centralização
- Adicionar `onClick` no botão de influencer para navegar para `/influencer`

## 2. Criar página `src/pages/InfluencerRegister.tsx`
Nova página com:

**Cabeçalho:**
- Barra no topo com fundo amarelo `#FFD400`
- Logo CIMED (ícone + texto "CIMEDGO") no canto esquerdo
- Botão "Contato" no canto direito

**Formulário (fundo branco, scroll):**
- Nome completo
- Idade
- CPF
- Instagram (@)
- Contato/Telefone
- Cidade
- Número de seguidores
- Plataforma (checkboxes: TikTok, Instagram, YouTube, Kwai)
- Nicho de trabalho
- Por que quer entrar no programa (textarea)
- Botão "Enviar inscrição"

Estilo consistente com o app (rounded-xl, h-14 inputs, fonte Nunito, cores amarelo/preto).

## 3. Adicionar rota no `src/App.tsx`
- Importar `InfluencerRegister` e adicionar `<Route path="/influencer" element={<InfluencerRegister />} />`

