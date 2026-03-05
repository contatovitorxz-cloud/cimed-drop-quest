

# Cimed GO - Plano de Construção

Este é um projeto grande. Vamos construir em fases, começando pelo **App do Consumidor** (mobile-first) com dados mockados, que é o core da experiência.

---

## Fase 1 - Fundação (esta implementação)

### 1. Database Schema (Supabase migrations)
- **profiles** - avatar, nível, pontos, ranking
- **pharmacies** - nome, endereço, lat/lng, logo
- **products** - nome, foto, descrição, categoria, raridade
- **drops** - produto, farmácia, tipo (raro/cupom/grátis), ativo, expira_em
- **challenges** - título, descrição, recompensa, tipo
- **user_badges** - badges conquistadas
- **user_points** - histórico de pontos

### 2. Identidade Visual
- Paleta: Laranja (#FF6A00), Preto (#0F0F0F), Amarelo Neon (#FFD400), Branco, Cinza (#2B2B2B)
- Font: Inter
- Dark theme como padrão (estilo gaming)
- Logo Cimed no canto superior esquerdo

### 3. Telas do App do Consumidor

**Splash Screen**
- Fundo amarelo (#FFD400), logo Cimed centralizada em preto
- Animação: logo aparece e expande, transição para o app

**Onboarding (3 slides)**
- Slide 1: "Descubra produtos Cimed perto de você"
- Slide 2: "Participe de desafios e ganhe recompensas"
- Slide 3: "Influenciadores liberam drops exclusivos"
- Botão "Começar"

**Login/Cadastro**
- Email + senha via Supabase Auth
- Tela estilizada com a marca

**Home - Mapa Interativo**
- Mapa estilizado com Leaflet (open-source, sem API key)
- Pins de farmácias, drops, produtos, eventos
- Cards ao clicar nos pins mostrando produto, distância, preço
- Dados mockados de farmácias e produtos

**Perfil do Usuário**
- Avatar, nível, pontos, ranking
- Badges conquistadas
- Histórico de atividades

**Produtos**
- Lista/grid de produtos Cimed
- Página de detalhe com farmácias próximas

**Desafios**
- Lista de desafios ativos
- Progresso e recompensas

**Drops**
- Drops especiais no mapa com indicador visual diferenciado
- Timer de expiração

### 4. Navegação
- Bottom tab bar mobile-first: Mapa, Produtos, Desafios, Drops, Perfil
- Logo Cimed fixa no header superior esquerdo

### 5. Gamificação (visual)
- Barra de XP/nível no perfil
- Leaderboard nacional
- Animações de confete ao ganhar recompensa
- Sistema de badges visual

---

## Estrutura de Arquivos

```text
src/
├── pages/
│   ├── Splash.tsx
│   ├── Onboarding.tsx
│   ├── Login.tsx
│   ├── Home.tsx (mapa)
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Challenges.tsx
│   ├── Drops.tsx
│   ├── Profile.tsx
│   └── Leaderboard.tsx
├── components/
│   ├── layout/
│   │   ├── BottomNav.tsx
│   │   └── AppHeader.tsx
│   ├── map/
│   │   ├── GameMap.tsx
│   │   └── MapPin.tsx
│   ├── game/
│   │   ├── BadgeCard.tsx
│   │   ├── ChallengeCard.tsx
│   │   ├── DropCard.tsx
│   │   └── XPBar.tsx
│   └── product/
│       └── ProductCard.tsx
├── contexts/
│   └── AuthContext.tsx
├── data/
│   └── mockData.ts
└── hooks/
    └── useAuth.ts
```

---

## Detalhes Técnicos

- **Mapa**: Leaflet + React-Leaflet (gratuito, sem API key)
- **Auth**: Supabase Auth com email/senha
- **Animações**: CSS animations + keyframes para splash e transições
- **Mobile-first**: Design 100% responsivo, viewport mobile como referência
- **Mock data**: Farmácias e produtos mockados para demonstração

---

Vou construir tudo isso agora, começando pela splash screen, onboarding, auth, e o mapa principal com toda a interface gamificada.

