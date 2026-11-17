# Plano de implementação: Tela Home

> **Status:** implementado e validado (10/11/2026) · **Especificação:** [plataforma.md](../plataforma.md) · **Referências visuais:** [referencia_visual.png](../referencia_visual.png), [referencia_visual_2.png](../referencia_visual_2.png) · **Ajustado por:** [03-ajustes-orientador.md](03-ajustes-orientador.md)

## 1. Objetivo

Construir a tela inicial da plataforma com:

- uma saudação curta explicando o que é a plataforma;
- uma barra de progresso dos conteúdos concluídos;
- uma grade de cards de conteúdo, cada um com identidade visual própria e um destaque quando concluído;
- os cards especiais **Glossário** e **Caí num golpe, e agora?**.

Junto com a Home, este plano define o **tema visual inicial** (cores e tipografia) da plataforma inteira.

## 2. Escopo

**Dentro do escopo**

- Tema visual: paleta laranja pastel + marrom escuro, tamanhos de fonte e espaçamentos.
- Layout geral (cabeçalho simples) no lugar do scaffold do Quasar.
- Dados de exemplo de 3 conteúdos: "Banco via Internet", "Evite ser enganado" e "Proteção de dados" (ver seção 5).
- Store de progresso salva no navegador.
- Componentes da Home: card e barra de progresso.
- Páginas provisórias ("Em construção") para Conteúdo, Glossário e Caí num golpe, para que os cards já naveguem.

**Fora do escopo** (planos futuros)

- Texto real dos conteúdos, leitura, lupa do glossário e simulado.
- Ilustrações definitivas.
- Lista final de conteúdos (decisão em aberto em `plataforma.md`).

## 3. Direção visual

### O que as referências mostram

| Referência                | Características                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `referencia_visual.png`   | Ilustração plana (flat) de pessoas idosas usando tablet, celular e notebook. Formas arredondadas, fundo em "mancha" orgânica atrás de cada personagem, rostos sorridentes, sem contornos pretos. |
| `referencia_visual_2.png` | Ilustração plana com traço fino, cores suaves e terrosas (coral, verde-musgo, lilás, bege), clima acolhedor (cuidado, mãos com coração) e muito espaço em branco.                                |

Para a Home, isso se traduz em:

- **fundo claro e espaçoso**, com cards de cantos bem arredondados e sombra leve;
- **cores pastel** de fundo nos cards, com texto sempre em marrom escuro;
- **"mancha" orgânica** colorida atrás do ícone ou ilustração de cada card, imitando a referência 1;
- visual amigável e calmo, sem nada alarmista (nada de vermelho forte nem ícones de perigo na Home).

> ⚠️ As duas imagens parecem ser de bancos de imagens. Use-as **apenas como referência de estilo**. Se forem para a plataforma, confira a licença e a atribuição exigidas, o que importa num TCC.

### Paleta inicial

Os contrastes abaixo foram calculados com a fórmula da WCAG. O mínimo exigido é **4,5:1** para texto e **3:1** para elementos gráficos.

| Papel            | Cor                        | Uso                                         | Contraste              |
| ---------------- | -------------------------- | ------------------------------------------- | ---------------------- |
| Texto principal  | `#4A2E1F` marrom escuro    | Todo texto                                  | —                      |
| Texto secundário | `#7A5240` marrom médio     | Legendas, só sobre fundos claros            | 6,4:1 no fundo         |
| Fundo da página  | `#FFF8F0` creme            | Fundo geral                                 | 11,7:1 com texto       |
| **Primária**     | `#F9C49A` laranja pastel   | Cabeçalho, botões, destaques                | 7,9:1 com texto marrom |
| Primária clara   | `#FDE3CF`                  | Trilho da barra de progresso, fundos suaves | 10,0:1 com texto       |
| Primária forte   | `#C0662E` laranja queimado | Preenchimento da barra de progresso, foco   | 3,3:1 sobre o trilho   |
| Concluído        | `#2E7D4F` verde            | Selo "Concluído" (texto branco)             | 5,0:1 com branco       |

**Cores de identidade dos cards** (fundo pastel, todas com texto marrom acima de 8:1):

| Nome    | Cor       |
| ------- | --------- |
| Laranja | `#F9C49A` |
| Sálvia  | `#CFE3C8` |
| Lilás   | `#E1D5F0` |
| Azul    | `#CFE0F2` |
| Rosa    | `#F6D3D8` |
| Amarelo | `#F8E6A8` |

**Regras da paleta:**

- **Nunca use texto branco sobre o laranja pastel** (contraste de 1,6:1). Em botões primários, o texto é marrom.
- O texto secundário (`#7A5240`) não deve ser usado sobre o laranja pastel (4,3:1, abaixo do mínimo).
- Tudo isto é provisório e pode mudar depois da avaliação de acessibilidade. Por isso as cores ficam **só** em `quasar.variables.scss` e `app.scss`.

### Tipografia e tamanhos

- Fonte: **Roboto** (já incluída no projeto). Uma fonte mais legível (ex.: Atkinson Hyperlegible) exige instalação local por causa da CSP; fica para depois.
- Texto base: **20px**; títulos dos cards: ~24px; título da página: ~32px. Tudo em `rem`.
- Espaçamento entre linhas: 1,5.
- Botões e cards clicáveis: altura mínima de 48px e área de toque generosa.

## 4. Estrutura da tela

```
┌──────────────────────────────────────────────┐
│  [ícone]  Proteja-se dos Golpes              │  ← cabeçalho laranja pastel
├──────────────────────────────────────────────┤
│  Olá! Aqui você aprende a reconhecer e       │
│  evitar golpes no WhatsApp e em outros       │  ← saudação
│  aplicativos de mensagem.                    │
│                                              │
│  Seu progresso: 1 de 3 conteúdos concluídos  │
│  ██████████░░░░░░░░░░░░░░░░                  │  ← barra de progresso
│                                              │
│  Conteúdos                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ (mancha) │ │ (mancha) │ │ (mancha) │      │
│  │  ícone   │ │  ícone   │ │  ícone ✔ │      │  ← cards (1 / 2 / 3 colunas)
│  │ Título   │ │ Título   │ │ Título   │      │
│  │ resumo   │ │ resumo   │ │CONCLUÍDO │      │
│  └──────────┘ └──────────┘ └──────────┘      │
│                                              │
│  Ajuda                                       │
│  ┌───────────────────┐ ┌───────────────────┐ │
│  │ 📖 Glossário      │ │ 🆘 Caí num golpe, │ │  ← cards especiais
│  │ Palavras difíceis │ │    e agora?       │ │
│  └───────────────────┘ └───────────────────┘ │
└──────────────────────────────────────────────┘
```

- **Cards iniciais:** Banco via Internet (azul), Evite ser enganado (laranja) e Proteção de dados (sálvia).
- **Grade responsiva:** 1 coluna no celular, 2 no tablet e 3 no desktop (classes `col-12 col-sm-6 col-md-4` do Quasar).
- O card inteiro é clicável (um único link), não só um botão dentro dele.
- **Card concluído:** selo verde "✔ Concluído" no canto, com ícone **e** texto. A cor de fundo do card não muda, para preservar a identidade.
- **Cards especiais** aparecem numa seção "Ajuda" separada, com visual diferente dos conteúdos (horizontais, sem selo) e sem contar no progresso.
- A barra de progresso sempre mostra o texto "X de Y conteúdos concluídos", não só a barra.

## 5. Arquitetura

Todo o código segue as convenções do [CLAUDE.md](../../CLAUDE.md#convenções-de-código): **Options API**, componentes reutilizáveis e comentários em pt-BR.

### Arquivos

| Arquivo                                                                                                                                | Ação       | Responsabilidade                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------- |
| `src/css/quasar.variables.scss`                                                                                                        | editar     | Paleta (`$primary`, `$positive` etc.) e tamanho de fonte base        |
| `src/css/app.scss`                                                                                                                     | editar     | Variáveis CSS das cores de identidade, fundo da página, foco visível |
| `src/data/conteudos.js`                                                                                                                | criar      | Lista de conteúdos (dados de exemplo)                                |
| `src/stores/progresso.js`                                                                                                              | criar      | Conteúdos concluídos, persistidos com `LocalStorage`                 |
| `src/components/CardHome.vue`                                                                                                          | criar      | Card da grade (conteúdo e especial)                                  |
| `src/components/BarraProgresso.vue`                                                                                                    | criar      | Barra com texto "X de Y"                                             |
| `src/components/SeloConcluido.vue`                                                                                                     | criar      | Selo "✔ Concluído" (ícone + texto)                                   |
| `src/components/PaginaEmConstrucao.vue`                                                                                                | criar      | Conteúdo comum das três páginas provisórias                          |
| `src/pages/index.vue`                                                                                                                  | reescrever | Layout com cabeçalho simples, sem drawer                             |
| `src/pages/index/(index).vue`                                                                                                          | reescrever | Tela Home                                                            |
| `src/pages/index/conteudo/[id].vue`                                                                                                    | criar      | Página provisória "Em construção"                                    |
| `src/pages/index/glossario.vue`                                                                                                        | criar      | Página provisória                                                    |
| `src/pages/index/cai-num-golpe.vue`                                                                                                    | criar      | Página provisória                                                    |
| `src/pages/index/second.vue`, `src/components/EssentialLink.vue`, `src/stores/example-store.js`, `src/assets/quasar-logo-vertical.svg` | remover    | Scaffold do Quasar                                                   |
| `src/pages/[...path].vue`                                                                                                              | ajustar    | 404 com o novo tema e texto em pt-BR                                 |

### Dados: `src/data/conteudos.js`

A Home usa só os campos de apresentação. Os demais (leitura, termos, simulado) entram no plano da página de conteúdo.

```js
export const conteudos = [
  {
    id: 'banco-via-internet', // usado na rota /conteudo/banco-via-internet e no progresso
    titulo: 'Banco via Internet',
    resumo: 'Use o aplicativo do banco com segurança.',
    icone: 'account_balance', // ícone provisório até haver ilustração
    cor: 'azul' // uma das cores de identidade
  },
  {
    id: 'evite-ser-enganado',
    titulo: 'Evite ser enganado',
    resumo: 'Aprenda a reconhecer os sinais de um golpe.',
    icone: 'visibility',
    cor: 'laranja'
  },
  {
    id: 'protecao-de-dados',
    titulo: 'Proteção de dados',
    resumo: 'Cuide das suas senhas, códigos e informações pessoais.',
    icone: 'lock',
    cor: 'salvia'
  }
]
```

Os títulos são os conteúdos iniciais de exibição. Os resumos e ícones são provisórios. A lista final de conteúdos continua em aberto em `plataforma.md`.

### Store: `src/stores/progresso.js`

- **Estado:** `concluidos`, um array de `id`s, carregado do `LocalStorage` (chave única, ex.: `progresso`).
- **Getters:** `total`, `quantidadeConcluida`, `percentual`, `estaConcluido(id)`.
- **Ações:** `marcarConcluido(id)` (ignora ids repetidos e salva) e `reiniciar()`.
- Formato options (`state`, `getters`, `actions`), consumido na Home com `mapState` e `mapActions`.
- `total` vem de `conteudos.length`, então os cards especiais nunca entram na conta.
- Ids salvos que não existem mais em `conteudos` são ignorados na contagem.

### Componente: `CardHome.vue`

É o **único** componente de card da Home: os cards de conteúdo e os especiais (Glossário, Caí num golpe) usam o mesmo componente, e a diferença vem da prop `variante`.

Props: `titulo`, `descricao`, `icone`, `cor`, `para` (rota), `concluido` (boolean) e `variante` (`'conteudo'` | `'especial'`).

O selo "✔ Concluído" também vira um componente próprio (`SeloConcluido.vue`), porque vai se repetir em outras telas, como no topo da página de conteúdo concluído.

- Renderizado como um `q-card` dentro de um `router-link`, ou com a prop `to`, para que o card inteiro seja um link acessível pelo teclado.
- O `aria-label` inclui o estado, por exemplo "WhatsApp clonado, concluído".
- A "mancha" orgânica atrás do ícone é feita com CSS (`border-radius` irregular), sem imagem.

## 6. Etapas

1. **Tema:** paleta em `quasar.variables.scss`, cores de identidade e fonte base em `app.scss`, foco visível (contorno laranja queimado).
2. **Limpeza:** remover os arquivos do scaffold e reescrever o layout `index.vue` com um cabeçalho simples.
3. **Dados e store:** criar `conteudos.js` com os 3 conteúdos iniciais e `progresso.js`.
4. **Componentes:** criar `BarraProgresso.vue` e `CardHome.vue`.
5. **Home:** montar `(index).vue` com saudação, barra, grade de conteúdos e seção Ajuda.
6. **Páginas provisórias e 404:** criar Conteúdo, Glossário e Caí num golpe, e ajustar o 404.
7. **Verificação:** rodar `pnpm lint` e testar no navegador em 360px (celular), 768px (tablet) e 1280px (desktop).

## 7. Como testar o estado "concluído"

Como ainda não há simulado, marque conteúdos pelo console do navegador para ver o visual:

```js
localStorage.setItem('progresso', '__q_objt|["banco-via-internet"]')
// recarregue a página
```

> O plugin `LocalStorage` do Quasar salva arrays com o prefixo `__q_objt|`. Para zerar o progresso: `localStorage.removeItem('progresso')`.

## 8. Critérios de aceite

- [x] A Home exibe saudação, barra de progresso, grade de conteúdos e a seção Ajuda.
- [x] Cada card de conteúdo tem cor e ícone próprios.
- [x] Um conteúdo concluído mostra o selo "✔ Concluído" (ícone + texto), e a barra mostra "X de Y".
- [x] O progresso continua salvo depois de recarregar a página.
- [x] Glossário e Caí num golpe não contam no progresso.
- [x] Todos os cards navegam para as páginas provisórias, sem cair no 404.
- [x] O layout funciona em 360px, 768px e 1280px, sem rolagem horizontal.
- [x] Dá para navegar por todos os cards com Tab, com foco visível, e abri-los com Enter.
- [x] Nenhum texto fica com contraste abaixo de 4,5:1.
- [x] Não sobra nenhum arquivo do scaffold do Quasar, e `pnpm lint:check` passa.

## 9. Questões em aberto

- **Nome da plataforma** para o cabeçalho. "Proteja-se dos Golpes" é provisório.
- **Texto da saudação** final.
- **Ilustração** na saudação ou nos cards: até haver ilustrações com licença adequada, os cards usam ícones Material com a mancha colorida.
