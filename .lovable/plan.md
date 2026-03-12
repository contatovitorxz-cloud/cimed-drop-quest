

## Criar Bottom Nav para Admin (Mobile)

No viewport mobile (390px), o sidebar fica escondido e a navegação depende do trigger. Vou criar uma bottom nav fixa no estilo NeoBrutalist, similar ao `BottomNav` do usuário, com as 4 seções pedidas.

### Alterações

**Novo `src/components/admin/AdminBottomNav.tsx`**:
- Bottom nav fixa com 4 tabs: Dashboard (`LayoutDashboard`), Analytics (`BarChart3`), Influenciadores (`Users`), Drops (`Gift`)
- Estilo NeoBrutalist: borda top 3px, fundo `dark:bg-[hsl(0,0%,8%)]`, ícones + labels uppercase 10px font-black
- Tab ativa com `border-t-2 border-accent` e cor accent
- Visível apenas em mobile (`md:hidden`)
- Recebe `activeSection` e `onSectionChange` como props (mesmo padrão do sidebar)

**`src/pages/AdminDashboard.tsx`**:
- Importar e renderizar `AdminBottomNav` no final do layout, dentro do `flex-1` div
- Adicionar `pb-20` no `<main>` em mobile para não sobrepor conteúdo
- Bottom nav visível apenas `md:hidden`, sidebar continua funcionando em desktop

