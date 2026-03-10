

## Plano: Login Editorial & Cinematográfico

Refatorar o layout da tela de Login para um visual mais editorial — tipografia grande, hierarquia visual forte, menos ruído.

### Mudanças em `src/pages/Login.tsx`:

1. **Tipografia heroica**: Escalar o título "CIMEDGO" de `text-4xl` para `text-6xl`/`text-7xl`, posicionar no topo com mais respiro vertical.

2. **Subtítulo editorial**: Trocar a frase descritiva por algo mais curto e impactante, com tracking bem aberto e tamanho `text-xs`, estilo legenda de revista.

3. **Remover ícones dos inputs**: Eliminar os ícones Mail, Lock, User de dentro dos campos — campos limpos, apenas texto. Reduzir padding lateral. Bordas finas (`border`) em vez de `border-2`.

4. **Layout vertical com mais espaço**: Aumentar gaps entre seções. Logo no topo com bastante margem. Form no centro-baixo. Links secundários empurrados para o fundo.

5. **Botão Entrar**: Manter preto com texto branco, aumentar altura para `h-16`, fonte maior.

6. **Remover botão Google**: Simplificar — mover para link de texto ou manter mas com estilo mais discreto (sem borda, apenas texto sublinhado).

7. **Links secundários**: Menor opacidade, posicionados no absolute bottom com padding.

8. **Símbolo Cimed**: Reduzir para `w-8 h-8`, colocado acima do título com espaçamento generoso.

### Resultado esperado:
Tela com sensação de poster/capa de revista — grande impacto tipográfico, poucos elementos, muito espaço negativo no amarelo.

