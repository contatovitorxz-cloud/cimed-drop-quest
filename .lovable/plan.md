

## Plan: Tornar botões do Admin Dashboard funcionais

O painel admin tem botões "CRIAR CAMPANHA", "CRIAR QR CODE", "CRIAR MISSÃO" e "APROVAR" que não fazem nada. Vou adicionar modais/dialogs funcionais para cada um, usando dados fake (já que as tabelas têm RLS restritiva e não permitem INSERT pelo anon/authenticated para a maioria).

### Alterações em `src/pages/AdminDashboard.tsx`

**1. Adicionar estado e Dialog para cada seção de criação:**

- **CRIAR CAMPANHA (DropsSection)**: Dialog com formulário (título, descrição, tipo, quantidade, farmácia). Ao submeter, adiciona o novo drop à lista local com `toast` de sucesso.

- **CRIAR QR CODE (QRCodesSection)**: Dialog com formulário (código, tipo, pontos, produto, farmácia). Ao submeter, adiciona à lista local.

- **CRIAR MISSÃO (MissionsSection)**: Dialog com formulário (título, descrição, tipo, recompensa, ícone). Ao submeter, adiciona à lista local.

- **APROVAR (InfluencersSection)**: Ao clicar em "Aprovar", muda o status do influenciador para "Ativo" na lista local com toast de confirmação.

- **Editar (Pencil) nos Drops**: Dialog com dados pré-preenchidos para edição, salva localmente.

**2. Implementação**: Usar `Dialog` do shadcn/ui com formulários simples (inputs + selects). Todas as operações são locais (state) com toast de feedback, já que é demonstrativo. Importar `Dialog, DialogContent, DialogHeader, DialogTitle` e `toast` do sonner.

**3. Dashboard "CRIAR CAMPANHA"**: Mesmo dialog do DropsSection.

### Arquivo editado
- `src/pages/AdminDashboard.tsx` — adicionar dialogs de criação e lógica de aprovar influenciadores

