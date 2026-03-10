

## Plan: Redesign Premium Cinematográfico da Tela de Login

Reescrever `src/pages/Login.tsx` com visual premium Apple/Nike.

### Estrutura

```text
┌──────────────────────────────────┐
│  FUNDO PRETO + gradiente radial  │
│                                  │
│    ┌────────────────────────┐    │
│    │  CARD AMARELO #FFD500  │    │
│    │  rounded-2xl           │    │
│    │  shadow profunda       │    │
│    │                        │    │
│    │  [logo] CIMEDGO 5xl    │    │
│    │  subtítulo tracking    │    │
│    │                        │    │
│    │  ┌──────────────────┐  │    │
│    │  │ input preto      │  │    │
│    │  │ texto branco     │  │    │
│    │  │ rounded-xl       │  │    │
│    │  └──────────────────┘  │    │
│    │  ┌──────────────────┐  │    │
│    │  │ input preto      │  │    │
│    │  └──────────────────┘  │    │
│    │                        │    │
│    │  [ENTRAR] preto+branco │    │
│    │  ── ou ──              │    │
│    │  [Google] preto/10     │    │
│    │                        │    │
│    │  links                 │    │
│    └────────────────────────┘    │
│                                  │
└──────────────────────────────────┘
```

### Alterações em `src/pages/Login.tsx`

1. **Container externo**: `bg-accent` → fundo preto com gradiente via style `background: radial-gradient(ellipse at top, #1a1a1a 0%, #000 100%)`

2. **Card central**: Novo wrapper `div` com `bg-[#FFD500] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-8 w-full max-w-sm`

3. **Logo**: Aumentar para `text-5xl`, manter `font-anton`

4. **Subtítulo**: `text-black/50 text-xs tracking-[0.25em] uppercase`

5. **Inputs** (username, email, senha): `bg-black text-white placeholder:text-white/40 rounded-xl border border-transparent focus:border-white/60` — ícones `text-white/50`

6. **Botão Entrar**: `bg-black text-white rounded-xl hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all`

7. **Separador**: `bg-black/15` linha, texto `text-black/40`

8. **Botão Google**: `bg-black/10 text-black rounded-xl border-none hover:bg-black/15`

9. **Links toggle/influencer**: `text-black/50` com spans `text-black font-black`

Sem animações pulsantes — apenas sombras estáticas e hover com elevação sutil.

