

# Salto de Nivel: 5 Modulos Estrategicos do Cimed GO

Este plano transforma o Cimed GO de um prototiopo em uma plataforma completa com gamificacao viral, dados estrategicos e potencial de escala.

---

## Visao Geral da Arquitetura

```text
┌─────────────────────────────────────────────────┐
│                  CIMED GO APP                    │
├──────────┬──────────┬──────────┬────────┬────────┤
│ Missoes  │ QR Code  │ Drops    │ Social │ Dados  │
│ Semanais │ Farmacia │ Influenc.│ Profile│ Consumo│
├──────────┴──────────┴──────────┴────────┴────────┤
│              Supabase Backend                     │
│  Auth │ DB │ Edge Functions │ Realtime │ Storage  │
└─────────────────────────────────────────────────┘
```

---

## Modulo 1: Missoes Cimed (Gamificacao Viral)

### Database (migrations)

**Tabela `missions`**: id, title, description, mission_type (weekly/daily/special), steps (jsonb array de objetivos), reward_type, reward_value, icon, starts_at, ends_at, active

**Tabela `user_missions`**: id, user_id, mission_id, status (active/completed/expired), progress (jsonb), started_at, completed_at

**Tabela `mission_steps`**: id, mission_id, step_order, description, type (visit_pharmacy/collect_product/scan_qr/share), target_count, metadata (jsonb)

RLS: usuarios veem suas proprias missoes; missoes ativas sao publicas.

### Frontend

**Nova pagina `src/pages/Missions.tsx`**: Tela dedicada com 3 secoes:
- Missoes Semanais (destaque no topo com countdown)
- Missoes Diarias (rotativas)
- Missoes Especiais (eventos)

Cada missao mostra: icone, titulo, descricao, barra de progresso multi-step, recompensa, timer de expiracao.

**Componente `src/components/game/MissionCard.tsx`**: Card expandivel que mostra steps individuais com checkmarks, progress bar segmentada, e botao "Ver no Mapa" que leva para Home com a missao highlighted.

**Componente `src/components/game/MissionDetailSheet.tsx`**: Bottom sheet (vaul) com detalhes completos da missao, mapa com waypoints, e historico de progresso.

**Atualizar `BottomNav.tsx`**: Trocar "Desafios" por "Missoes" com icone Target/Flag.

**Atualizar `GameHUD.tsx`**: Botao "Missoes" no HUD agora navega para `/missions` e mostra badge counter de missoes ativas.

**Atualizar `Home.tsx`**: Marcadores de missao no mapa com icones diferenciados por tipo, pulse animation para missoes urgentes.

### Missoes Exemplo (seed data)
- "Circuito Cimed SP": Visite 3 farmacias Cimed (semanal, 500pts)
- "Cacador de Carmed": Encontre 3 Carmeds diferentes (semanal, badge)
- "Check-in Diario": Escaneie QR em qualquer farmacia (diaria, 50pts)
- "Compartilhador": Compartilhe 2 conquistas (diaria, 100pts)

---

## Modulo 2: Sistema de QR Code nas Farmacias

### Database (migrations)

**Tabela `qr_codes`**: id, pharmacy_id (FK), campaign_id, code (unique string), type (purchase/checkin/promo), points_value, product_id (nullable), active, created_at, expires_at

**Tabela `qr_scans`**: id, user_id, qr_code_id, pharmacy_id, product_id (nullable), points_earned, scanned_at, location_lat, location_lng

RLS: usuarios veem seus proprios scans; qr_codes ativos sao publicos para leitura.

### Edge Function `scan-qr`
- Valida QR code, verifica se nao expirou, se usuario ja nao escaneou (anti-fraude)
- Registra scan com localizacao
- Credita pontos ao usuario (update profiles.total_points e insert user_points)
- Retorna recompensa e animacao a mostrar

### Frontend

**Atualizar `GameHUD.tsx`**: Botao central "ESCANEAR" agora abre modal de camera.

**Componente `src/components/qr/QRScanner.tsx`**: Modal fullscreen com camera do dispositivo usando `navigator.mediaDevices.getUserMedia` + biblioteca `html5-qrcode` (ou jsQR). UI com overlay de scan animado, instrucoes, e feedback visual (sucesso/erro).

**Componente `src/components/qr/ScanSuccessSheet.tsx`**: Bottom sheet pos-scan com animacao de confetti/particulas, pontos ganhos, produto associado, e botao "Ver Minhas Missoes" se o scan avanca alguma missao.

**Nova pagina `src/pages/ScanHistory.tsx`**: Historico de scans do usuario com filtros por periodo, farmacia, produto. Cards com data, local, pontos ganhos.

### Dados Estrategicos Gerados
Cada scan registra: user_id, produto, farmacia, localizacao GPS, horario. Isso alimenta o Modulo 5 (Dados de Consumo).

---

## Modulo 3: Drop Secreto de Influenciador

### Database (migrations)

**Tabela `influencer_drops`**: id, influencer_id (user_id), title, description, product_id, lat, lng, radius_meters, total_quantity, remaining_quantity, type (free/discount/exclusive), discount_percent, active, created_at, expires_at, teaser_message

**Tabela `drop_claims`**: id, user_id, drop_id, claimed_at, redeemed, redeemed_at

RLS: drops ativos sao publicos; claims sao do proprio usuario; influencers podem ver seus proprios drops.

### Edge Function `create-influencer-drop`
- Verifica se usuario e influencer (metadata)
- Cria drop com validacoes (quantidade, expiracao, raio)
- Notifica via Realtime para usuarios na area

### Edge Function `claim-drop`
- Verifica proximidade GPS do usuario com o drop (anti-fraude)
- Verifica quantidade restante
- Cria claim, decrementa remaining_quantity
- Credita pontos/recompensa

### Frontend

**Componente `src/components/influencer/CreateDropSheet.tsx`**: Bottom sheet para influencers criarem drops. Selecao de produto, quantidade, duracao, mensagem teaser, e posicao no mapa (drag marker).

**Atualizar `Home.tsx`**: Novos marcadores especiais para drops de influenciadores com animacao diferenciada (glow dourado pulsante), icone do influencer no marker. Popup mostra: teaser do influencer, produto, restantes, countdown, botao "Resgatar".

**Atualizar `Drops.tsx`**: Nova secao "Drops de Influenciadores" com filtro separado, cards com foto/nome do influencer, countdown timer, e indicador de distancia.

**Componente `src/components/game/InfluencerDropCard.tsx`**: Card especial com gradiente dourado, avatar do influencer, mensagem teaser, e urgencia visual.

**Componente `src/components/influencer/InfluencerDashboard.tsx`**: Para influencers verem seus drops ativos, claims, e metricas basicas.

---

## Modulo 4: Perfil Social do Usuario

### Database (migrations)

**Tabela `user_follows`**: id, follower_id, following_id, created_at (unique constraint em follower+following)

**Tabela `user_achievements`**: id, user_id, type (drop_claimed/mission_completed/badge_earned/level_up), title, description, metadata (jsonb), created_at, is_public

**Tabela `activity_feed`**: id, user_id, type, title, description, metadata (jsonb), created_at

RLS: follows sao visiveis entre as partes; achievements publicos sao visiveis por todos; feed e do proprio usuario + quem ele segue.

### Frontend

**Refatorar `src/pages/Profile.tsx`**: Adicionar:
- Contadores de Seguidores/Seguindo clicaveis
- Secao "Atividade Recente" com feed de conquistas
- Botao "Compartilhar Perfil" (Web Share API)
- Tabs: Badges | Historico | Conquistas

**Nova pagina `src/pages/UserProfile.tsx`**: Perfil publico de outro usuario com botao Seguir/Deixar de Seguir, badges, nivel, conquistas publicas.

**Nova pagina `src/pages/Social.tsx`**: Feed social com atividades dos amigos (quem encontrou drops, completou missoes, subiu de nivel). Cards com avatar, nome, acao, timestamp.

**Componente `src/components/social/FollowButton.tsx`**: Botao seguir/seguindo com estado otimista.

**Componente `src/components/social/ActivityCard.tsx`**: Card de atividade com icone, texto, e link para o item (drop, missao, badge).

**Componente `src/components/social/ShareAchievement.tsx`**: Modal para compartilhar conquista com imagem gerada (canvas) para stories/redes sociais.

**Atualizar Leaderboard.tsx**: Adicionar tabs "Global" e "Amigos", highlight de amigos no ranking.

---

## Modulo 5: Dados de Consumo (Dashboard Executivo)

### Frontend

**Nova pagina `src/pages/Analytics.tsx`**: Dashboard com graficos Recharts mostrando:
- Scans por dia/semana (line chart)
- Top produtos escaneados (bar chart)
- Mapa de calor de farmacias mais ativas (lista rankeada)
- Metricas: total usuarios, scans, drops resgatados, missoes completadas
- Filtros por periodo, cidade, categoria de produto

**Componente `src/components/analytics/MetricCard.tsx`**: Card com icone, valor, label, e variacao percentual.

**Componente `src/components/analytics/TopProductsChart.tsx`**: Bar chart horizontal dos produtos mais populares.

**Componente `src/components/analytics/ScanTrendChart.tsx`**: Line chart de scans ao longo do tempo.

**Componente `src/components/analytics/PharmacyRanking.tsx`**: Lista rankeada de farmacias por atividade.

Nota: este dashboard usa dados mock inicialmente, mas esta pronto para consumir dados reais das tabelas qr_scans, drop_claims, user_missions.

---

## Mudancas Transversais

### Navegacao
- **BottomNav**: 5 tabs: Mapa | Missoes | Escanear (central, destaque) | Social | Perfil
- O botao central "Escanear" tera design diferenciado (maior, com glow)

### Mock Data
- Expandir `mockData.ts` com dados para missoes semanais, drops de influenciadores, feed social, e metricas de analytics

### Rotas (App.tsx)
- `/missions` - Missoes
- `/scan` - QR Scanner (ou modal)
- `/scan-history` - Historico de scans
- `/social` - Feed social
- `/user/:id` - Perfil publico
- `/analytics` - Dashboard dados

### Pacotes Necessarios
- `html5-qrcode` para leitura de QR code via camera

---

## Ordem de Implementacao

1. Database migrations (todas as tabelas de uma vez)
2. Modulo 1 - Missoes (UI + mock data)
3. Modulo 2 - QR Code (scanner + edge functions)
4. Modulo 3 - Drops de Influenciador (UI + edge functions)
5. Modulo 4 - Perfil Social (UI + follows + feed)
6. Modulo 5 - Dashboard Analytics (graficos + metricas)
7. Navegacao final e polish

Total estimado: ~25 arquivos novos/modificados, 6 migrations, 3 edge functions.

