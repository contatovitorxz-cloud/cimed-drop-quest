

## Plano: Dark Mode Toggle no Header

O app atualmente só tem tema escuro (`:root` com cores escuras). Preciso criar um tema claro e um toggle no header.

### Mudanças

#### 1. `src/index.css` — Adicionar tema claro
- Mover as variáveis atuais (escuras) para `.dark`
- Criar novas variáveis em `:root` com cores claras (fundo branco, texto escuro, cards cinza claro)
- Manter primary (orange), accent (yellow) iguais em ambos os temas

#### 2. `src/components/layout/AppHeader.tsx` — Adicionar toggle
- Importar `Sun`/`Moon` do lucide-react
- Adicionar botão entre o sino e o avatar que alterna a classe `dark` no `<html>`
- Usar `useState` com localStorage para persistir preferência

#### 3. `tailwind.config.ts` — Já configurado
- `darkMode: ["class"]` já está definido, perfeito

#### 4. `index.html` — Classe inicial
- Adicionar `class="dark"` no `<html>` para manter o dark como padrão (já que é o tema atual)

| Arquivo | Ação |
|---|---|
| `src/index.css` | Criar variáveis light em `:root`, mover dark para `.dark` |
| `src/components/layout/AppHeader.tsx` | Adicionar botão Sun/Moon toggle |
| `index.html` | Adicionar `class="dark"` no html |

