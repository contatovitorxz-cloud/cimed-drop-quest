

## Plan: Adicionar "saBOR energético" + Ficha de Influenciador

### Alterações

**1. Copiar foto do usuário para o projeto**
- Copiar `user-uploads://2F6FA947-CEA0-4D2F-AD7F-9541CE433FD3.png` para `src/assets/sabor-energetico.png`

**2. `src/data/adminMockData.ts`**
- Adicionar novo influenciador ao `mockInfluencers`:
  - `display_name: 'saBOR energético'`, `username: 'sabor.energetico'`
  - `commission_balance: 8750.00`, `drops_created: 45`, `claims: 2100`
  - `avatar_url`: importado do asset local
  - `status: 'pending'`
  - Campos extras para ficha: `followers_total: 15000000`, `instagram: '@saborenergetico'`, `tiktok: '@saborenergetico'`, `youtube: 'saBOR energético'`, `instagram_followers: 6200000`, `tiktok_followers: 5800000`, `youtube_followers: 3000000`, `niche: 'Lifestyle & Energia'`
- Adicionar mesmos campos de redes sociais (com valores menores) aos outros influenciadores mock para consistência

**3. `src/pages/AdminDashboard.tsx` — InfluencersSection**
- Tornar cada card de influenciador clicável (exceto o botão Aprovar)
- Adicionar estado `selectedInfluencer` e um `Dialog` de ficha do influenciador
- A ficha mostra:
  - Foto grande, nome, username
  - Total de seguidores (ex: "15M+")
  - Breakdown por rede (Instagram, TikTok, YouTube) com ícones
  - Nicho, drops criados, resgates, comissão
  - Botão Aprovar/Aprovado dentro da ficha também

