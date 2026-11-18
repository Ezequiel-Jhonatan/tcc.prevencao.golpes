# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Plataforma web educativa (TCC) sobre prevenção de golpes por aplicativos de mensagem contra idosos. Funciona em desktop, tablet e celular, com todo o conteúdo em pt-BR.

Stack: Vue 3 (**Options API**, JavaScript, sem TypeScript), Quasar 2 via `@quasar/app-vite`, Pinia, Vue Router 5.

**O projeto deve continuar simples.** Não adicione backend, autenticação, bibliotecas ou camadas de abstração sem pedido explícito.

A especificação do produto (páginas, regras de negócio, acessibilidade, linguagem dos conteúdos e referências) está em @docs/plataforma.md. Siga esse documento e mantenha-o atualizado quando uma regra mudar.

Os planos de implementação de cada tela ficam em `docs/planos/` (numerados: `01-home.md`, ...). Ao implementar uma tela, siga o plano correspondente e marque os critérios de aceite concluídos.

### Validação obrigatória ao concluir um plano

Ao terminar a execução de um plano, sempre:

1. Rode `pnpm lint:check` e suba o servidor (`pnpm dev`).
2. Valide com o **Playwright** (MCP) em **desktop (1280×800)** e **mobile (390×844)**: capture screenshots das telas afetadas, confira a navegação, os critérios de aceite do plano, o console sem erros e a ausência de rolagem horizontal.
3. Se encontrar bugs, faça **uma única rodada de correção** e valide de novo nos dois tamanhos.
4. Se ainda houver problemas depois dessa rodada, **não corrija mais**: devolva ao usuário a lista de problemas restantes (o que, onde, impacto e opções) para ele decidir.

### Decisões de implementação

- O glossário é a **fonte única** das definições: a página Glossário e os dialogs da lupa usam os mesmos dados.
- Os conteúdos (texto, imagens, termos marcados, cenário do simulado) são definidos como dados e renderizados por componentes reutilizáveis, não escritos à mão em cada página.
- O progresso fica em uma store Pinia persistida com o plugin `LocalStorage` do Quasar.
- Os valores de acessibilidade (fonte, contraste, tamanho de toque) ficam centralizados em `src/css/quasar.variables.scss` / `app.scss`, não repetidos em cada componente.

## Comandos

```bash
pnpm install          # também roda `quasar prepare` (gera .quasar/)
pnpm dev              # quasar dev, servidor com HMR, abre o navegador
pnpm build            # quasar build, saída em dist/spa
pnpm lint             # oxfmt (formata) + oxlint --fix
pnpm lint:check       # só verifica formatação e lint (oxlint permite no máximo 10 warnings)
```

O README indica pnpm (`pnpm-workspace.yaml`), mas também existe um `yarn.lock` no repositório. Não há framework de testes configurado.

## Arquitetura

- **Roteamento por arquivo** (`build.filenameBasedRouting: true` em `quasar.config.js`): as rotas são geradas a partir de `src/pages/` e importadas de `vue-router/auto-routes` em `src/router/index.js`. Não declare rotas manualmente. Convenções:
  - `src/pages/index.vue` é o **layout** (`q-layout` com header/drawer e `<router-view />`) das rotas em `src/pages/index/`.
  - `src/pages/index/(index).vue` é a página `/` (Home); `src/pages/index/glossario.vue` é `/glossario`; `src/pages/index/conteudo/[id].vue` é `/conteudo/:id`.
  - `src/pages/[...path].vue` é o 404 (catch-all).
- **Modo de rota hash** (`vueRouterMode: 'hash'`). Mude o modo e a base em `quasar.config.js`, não em `src/router/index.js`.
- **`#q-app`** é o módulo do Quasar CLI que fornece `defineConfig`, `defineRouter`, `defineStore` e `defineBoot`. O diretório `.quasar/` é gerado automaticamente (não edite); o `jsconfig.json` herda dele.
- **Alias `@`** aponta para `src/` (ex.: `@/components/...`; em templates de asset use `~@/assets/...`).
- **Stores Pinia** ficam em `src/stores/`. O `index.js` cria a instância, e cada store usa `defineStore` do `pinia` no formato options, com `acceptHMRUpdate` para HMR.
- **Boot files** ficam em `src/boot/` e precisam ser registrados em `boot: []` no `quasar.config.js`.
- **Os componentes Quasar são auto-importados**. Plugins Quasar habilitados: `LocalStorage`, `Loading`, `Dialog` e `Notify`. Para usar outro, adicione-o em `framework.plugins`.
- **Estilos**: CSS global em `src/css/app.scss` e variáveis de tema do Quasar (`$primary` etc.) em `src/css/quasar.variables.scss`.
- **CSP** em `index.html`: `default-src 'self'; script-src 'self'`. Recursos de domínios externos (CDNs, iframes de vídeo, analytics) são bloqueados até a política ser ajustada.
- **Dados**: um arquivo por conteúdo em `src/data/conteudos/` (registrado em `index.js`; campos `manchete`, `introducao`, `ilustracao`, `sinais` (3), `protecao` e `simulado`, com o formato documentado no topo do `index.js`; sem `sinais` ou sem `simulado`, a página correspondente mostra "Em construção"), glossário em `src/data/glossario.js`, progresso em `src/stores/progresso.js` (o plugin `LocalStorage` salva arrays com prefixo `__q_objt|`).
- **Textos dos conteúdos** usam uma marcação mínima interpretada por `TextoRico.vue`: `**negrito**` e `[[id-do-termo|texto]]` para a lupa do glossário. Nunca use `v-html`.
- **Página de conteúdo** (`src/pages/index/conteudo/[id]/index.vue`) é genérica e monta tudo a partir dos dados com `CelularConversa`, `CardSinal`, `ListaDicas`, `CaixaDestaque` e `CaixaAjuda`. No desktop (a partir de `$breakpoint-md-min`), o celular fica ao lado do texto, como em `docs/exemplos/exemplo_orientador.html`.
- **Simulado** (`src/pages/index/conteudo/[id]/simulado.vue`) é genérico e segue o roteiro de etapas do conteúdo, com `CelularConversa`, `OpcoesSimulado` e `RetornoSimulado`. O retorno é uma caixa na página que recebe o foco, nunca uma notificação que some sozinha. Uma opção com `pagina` troca a conversa do celular pela página falsa (prop `pagina` do `CelularConversa`: print do site em `src/assets/simulados/` + formulário em HTML). Para marcar uma opção como indisponível, use `aria-disabled`: o Quasar aplica `opacity: .6` em todo `[disabled]`. A pasta `[id]/` (com `index.vue` + `simulado.vue`) evita que `[id].vue` vire layout pai das rotas filhas.
- **Espaçamento vertical**: use as classes `.pilha` / `.pilha--grande` de `app.scss` (flex + `gap`). Não aninhe classes `q-gutter-y-*`, porque as margens negativas se anulam e geram espaços errados.

## Convenções de código

- **Options API** em todos os componentes (habilitada por `build.vueOptionsAPI: true` em `quasar.config.js`; o Quasar a desliga por padrão): `export default { name, components, props, emits, data, computed, watch, methods, ... }` em `<script>`. Não use `<script setup>` nem a Composition API (`ref`, `computed()`, `onMounted()` etc.).
  - Acesse o Quasar por `this.$q` e o router por `this.$router` / `this.$route`.
  - Stores Pinia no formato options (`state`, `getters`, `actions`), consumidas nos componentes com `mapState`, `mapActions` (ou `mapStores`) do `pinia`.
- **Componentização**: qualquer elemento visual que se repita (cards, barra de progresso, selos, caixas de destaque, botões com o mesmo papel) vira componente em `src/components/`, configurado por props. Antes de criar um componente novo, procure um existente que possa ser reaproveitado ou ganhar uma variante por prop.
- **Props** sempre declaradas como objeto, com `type` e `required` ou `default`. Eventos declarados em `emits`.
- **Comentários em pt-BR** quando agregam: um bloco no topo de cada componente explicando o papel dele, uma linha por prop, e comentários sobre o **porquê** de lógicas não óbvias (regras de negócio, decisões de acessibilidade). Não comente o óbvio.
- **Nomes em pt-BR** para dados, props, métodos, stores e componentes do domínio (ex.: `conteudos`, `concluido`, `marcarConcluido`, `CardHome`).

## Estilo de código

A formatação é feita pelo oxfmt (`.oxfmtrc.json`): sem ponto e vírgula, aspas simples, sem vírgula final, `arrowParens: avoid`, 80 colunas e indentação de 2 espaços. Rode `pnpm lint` depois de editar.
