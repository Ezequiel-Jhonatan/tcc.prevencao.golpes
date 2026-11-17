# Plano de implementação: Página de conteúdo "Mensagem de Gerente do Banco"

> **Status:** implementado e validado (10/11/2026) · **Especificação:** [plataforma.md](../plataforma.md) · **Referência de layout:** [exemplo_pagina.png](../exemplos/exemplo_pagina.png) · **Plano anterior:** [01-home.md](01-home.md) · **Ajustado por:** [03-ajustes-orientador.md](03-ajustes-orientador.md)

## 1. Objetivo

1. Trocar o conteúdo "Banco via Internet" por **"Mensagem de Gerente do Banco"**.
2. Construir a **página de conteúdo** (hoje "Em construção") com um layout parecido com o do exemplo: ilustração caricata no topo, manchete grande, letra capitular e listas com destaques em negrito.
3. Escrever o texto do golpe e de como se prevenir.
4. Criar a **lupa do glossário** nas palavras difíceis.

A página é genérica: ela renderiza qualquer conteúdo a partir dos dados. Os conteúdos "Evite ser enganado" e "Proteção de dados" passam a usar o mesmo layout quando ganharem texto.

## 2. Escopo

**Dentro do escopo**

- Renomear o conteúdo, com novo id, ícone, resumo e cor.
- Página de conteúdo genérica (`/conteudo/:id`).
- Ilustração do celular com a conversa falsa, feita em código (ver seção 4).
- Texto completo do golpe "Mensagem de Gerente do Banco" (seção 5).
- Dados do glossário e lupa interativa (dialog).
- Caixa "Onde pedir ajuda", reaproveitável.
- Botões no final da página (ver questão em aberto sobre o simulado).

**Fora do escopo** (próximos planos)

- O **simulado** em si (sugestão: plano `03-simulado.md`). Ele vai reaproveitar o componente do celular desta página.
- A página do Glossário completa (a lista de termos já fica pronta aqui).
- O texto de "Evite ser enganado" e "Proteção de dados".

## 3. Layout

### O que vem do exemplo

| Elemento do exemplo                                                               | Como fica na plataforma                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Ilustração caricata no topo (ratoeira com celular)                                | Celular com uma conversa falsa de "gerente" e um **anzol** fisgando o aparelho (metáfora de "pescar" dados)  |
| Manchete grande, em caixa alta e colorida ("CONFIRME PRIMEIRO, TRANSFIRA DEPOIS") | Manchete curta e imperativa, em **negrito grande, sem caixa alta**: **"Gerente de verdade não pede código"** |
| Letra capitular grande no primeiro parágrafo                                      | Mantida, via CSS `::first-letter` (o leitor de tela continua lendo a palavra inteira)                        |
| Palavras-chave em **negrito**                                                     | Mantido                                                                                                      |
| Lista com `»` e subitens com `▪`                                                  | Mantido, num componente reutilizável                                                                         |
| Hifenização ("Golpis-tas")                                                        | **Removida**: palavra quebrada atrapalha a leitura do idoso                                                  |

### Estrutura da página

```
┌──────────────────────────────────────────┐
│ ← Voltar para o início                   │
│                                          │
│        [ ilustração: celular com a       │
│          conversa do falso gerente ]     │
│                                          │
│  Mensagem de Gerente do Banco · 3 min    │  ← título + tempo de leitura
│                                          │
│  Gerente de verdade                      │  ← manchete (negrito grande)
│  não pede código                         │
│                                          │
│  V ocê recebe uma mensagem...            │  ← introdução com capitular
│                                          │
│  Como o golpe funciona                   │
│  ...texto... 🔍SMS ...                   │  ← termos com lupa
│                                          │
│  Sinais de alerta                        │
│  » ...                                   │
│                                          │
│  ┌ Como se proteger ───────────────────┐ │  ← caixa em destaque
│  │ » Nunca passe códigos...            │ │
│  │   ▪ o banco nunca pede isso...      │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  ┌ Onde pedir ajuda ───────────────────┐ │  ← caixa fixa
│  │ Disque 100 · WhatsApp · 190          │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  [ Fazer o simulado ]  [ Já entendi ✔ ]  │
└──────────────────────────────────────────┘
```

- **Coluna única centralizada** (máx. ~720px), igual no celular e no desktop. Linhas curtas são mais fáceis de ler, e o layout não muda de um aparelho para outro.
- No desktop, a ilustração tem no máximo ~420px de largura; no celular, ocupa a largura da tela.
- O tempo de leitura é calculado pela quantidade de palavras (~130 palavras por minuto) e não é escrito à mão.

### Tipografia e cores

- **Manchete:** negrito grande (Roboto 900), **sem caixa alta**, que é mais difícil de ler; 2,5rem no desktop e 2rem no celular. Cor **`#A8521C`** (laranja terroso), com contraste de **5,1:1** sobre o creme. O laranja forte da barra de progresso (`#C0662E`) daria só 3,9:1.
- **Capitular:** 3 linhas de altura, mesma cor da manchete.
- **Marcadores** `»` na cor da manchete; subitens `▪` em marrom.
- A caixa "Como se proteger" usa fundo `#FDE3CF` (laranja claro), com 10:1 para o texto.

## 4. Ilustração

### Recomendação: celular desenhado em código (HTML/CSS + SVG)

Um componente `CelularConversa.vue` desenha o celular com o "aplicativo de mensagens", a partir de dados:

```
┌─────────────────────────┐
│ ●  Gerente Carlos 🏦     │  ← cabeçalho verde-escuro, "online"
│    online               │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │ Bom dia, Sra. Maria! │ │
│ │ Aqui é o Carlos, seu │ │
│ │ gerente do banco.    │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ Identificamos uma    │ │
│ │ compra de R$ 2.450   │ │
│ │ no seu cartão. Foi a │ │
│ │ senhora?             │ │
│ └─────────────────────┘ │
│        ┌──────────────┐ │
│        │ Não fui eu!  │ │  ← resposta da vítima (balão verde-claro)
│        └──────────────┘ │
│ ┌─────────────────────┐ │
│ │ Calma, eu resolvo.   │ │
│ │ Vai chegar um código │ │
│ │ por SMS. Me passa,   │ │
│ │ é URGENTE!           │ │
│ └─────────────────────┘ │
└─────────────────────────┘
        ╰── anzol (SVG) fisgando o celular por cima
```

Por que desenhar em código e não usar uma imagem:

- **Reaproveitamento:** o **simulado** vai mostrar outras conversas no mesmo celular, e cada conteúdo de golpe por mensagem pode ter a sua. Basta trocar os dados.
- **Sem problema de licença**, o que importa num TCC (a imagem do exemplo é do CERT.br).
- **Acessível:** o leitor de tela lê as mensagens como texto, e o zoom não deixa a imagem embaçada.
- **Sem dependência nova:** nada é baixado de fora, o que respeita a CSP.

Cuidados:

- **Não usar o logotipo nem o nome "WhatsApp"** no desenho. O visual lembra um aplicativo de mensagens (balões verdes e cabeçalho verde-escuro), mas é genérico. O texto da página pode citar o WhatsApp normalmente.
- **Nenhum banco real** é citado: o contato é "Gerente Carlos" com um ícone genérico de banco.
- Contrastes: balão do golpista branco com texto escuro (12,3:1); balão da vítima `#DCF8C6` (10,7:1); cabeçalho `#1F6F5C` com texto branco (6,0:1).
- O anzol e outros enfeites são SVG decorativos (`aria-hidden`). A conversa fica num `figure` com `figcaption`: "Exemplo de conversa de um falso gerente de banco".
- Ilustração com leve inclinação e sombra, para ficar "caricata" como no exemplo, sem prejudicar a leitura.

**Alternativa:** uma ilustração em imagem (feita por um ilustrador ou gerada por IA, com licença clara). Ela fica mais artística, mas não é reaproveitável no simulado e o texto da conversa vira imagem. Ver questões em aberto.

## 5. Texto do conteúdo (rascunho para revisão)

> ~350 palavras, ~3 minutos de leitura. Os termos entre `[[ ]]` ganham a lupa do glossário.

**Título:** Mensagem de Gerente do Banco
**Resumo (card da Home):** Gerente pedindo código ou Pix? Desconfie.
**Manchete:** Gerente de verdade não pede código

**Introdução (com capitular)**

Você recebe uma mensagem no WhatsApp de alguém que diz ser o **gerente do seu banco**. A foto tem o desenho do banco, o nome parece certo e ele até sabe o seu nome e o seu CPF. Mas quem está do outro lado é um **golpista**.

**Como o golpe funciona**

O falso gerente diz que encontrou um **problema urgente** na sua conta: uma compra estranha no cartão, um [[pix|Pix]] que você não fez ou uma conta que vai ser bloqueada. Para "resolver", ele pede uma destas coisas:

- o **[[codigo-verificacao|código]]** que chegou por [[sms|SMS]] no seu celular;
- a sua **senha** do banco ou do cartão;
- um **Pix** para uma "conta de segurança";
- que você toque em um **[[link|link]]** ou instale um aplicativo.

Com isso, o golpista entra na sua conta e leva o seu dinheiro. Ele sabe o seu nome e outros dados porque essas informações foram **[[dados-vazados|vazadas]]** na internet. Isso **não prova** que ele é do banco.

**Sinais de alerta**

- » **Pressa:** "é urgente", "sua conta será bloqueada hoje"
- » Pedido de **código, senha ou Pix**
- » **Número desconhecido**, mesmo com a foto e o nome do banco
- » Pedido de **segredo:** "não conte para ninguém", "não ligue para a agência"

**Como se proteger** (caixa em destaque)

- » **Nunca passe** códigos, senhas ou dados do cartão
  - ▪ o banco **nunca** pede isso por mensagem ou ligação
- » **Não faça Pix** para "conta de segurança"
  - ▪ essa conta **não existe**
- » **Pare a conversa e ligue você** para o banco
  - ▪ use o número que está **no verso do seu cartão** ou no [[aplicativo-oficial|aplicativo oficial]]
- » **Não toque** em links recebidos na conversa
- » Na dúvida, **converse com alguém de confiança** antes de fazer qualquer coisa

**Fechamento:** Gerente de verdade não tem pressa e não pede código. **Na dúvida, não faça!**

**Onde pedir ajuda** (caixa fixa, igual em todos os conteúdos)

- Caiu no golpe? **Ligue para o seu banco** na hora, pelo número do verso do cartão.
- **Disque 100**: ligação gratuita, de qualquer telefone.
- **WhatsApp do Disque Direitos Humanos:** (61) 99611-0100.
- **190** ou a delegacia mais próxima, para registrar o boletim de ocorrência.

### Glossário inicial (`src/data/glossario.js`)

| id                   | Termo                 | Explicação                                                                                                                                            |
| -------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sms`                | SMS                   | Mensagem de texto que chega no celular pelo número de telefone, fora do WhatsApp.                                                                     |
| `codigo-verificacao` | Código de verificação | Números enviados pelo banco ou pelo WhatsApp para confirmar que é você mesmo. Funciona como uma chave: **nunca passe para ninguém**.                  |
| `pix`                | Pix                   | Forma de mandar dinheiro na hora, pelo aplicativo do banco. Depois de enviado, é muito difícil ter o dinheiro de volta.                               |
| `link`               | Link                  | Texto azul ou endereço que, ao ser tocado, abre uma página ou um aplicativo. Links falsos podem roubar seus dados.                                    |
| `dados-vazados`      | Dados vazados         | Informações pessoais (nome, CPF, endereço) que foram roubadas de empresas e circulam na internet. Golpistas usam esses dados para parecer confiáveis. |
| `aplicativo-oficial` | Aplicativo oficial    | O aplicativo verdadeiro do banco, baixado da loja do celular (Play Store ou App Store) e publicado pelo próprio banco.                                |

## 6. Arquitetura

Segue as convenções do [CLAUDE.md](../../CLAUDE.md#convenções-de-código): Options API, componentes reutilizáveis e comentários em pt-BR.

### Dados

Cada conteúdo passa a ter **seu próprio arquivo**, para a lista não virar um arquivo gigante:

```
src/data/
├── conteudos/
│   ├── index.js                      # junta todos e exporta `conteudos` e `buscarConteudo`
│   ├── mensagem-gerente-banco.js
│   ├── evite-ser-enganado.js         # só os campos da Home, por enquanto
│   └── protecao-de-dados.js
└── glossario.js
```

Formato de um conteúdo completo:

```js
export default {
  id: 'mensagem-gerente-banco',
  titulo: 'Mensagem de Gerente do Banco',
  resumo: 'Gerente pedindo código ou Pix? Desconfie.',
  icone: 'support_agent',
  cor: 'azul',

  manchete: 'Gerente de verdade não pede código',
  ilustracao: {
    contato: { nome: 'Gerente Carlos', status: 'online' },
    mensagens: [
      {
        de: 'golpista',
        texto: 'Bom dia, Sra. Maria! Aqui é o Carlos, seu gerente do banco.'
      },
      { de: 'vitima', texto: 'Não fui eu!' }
      // ...
    ]
  },
  introducao:
    'Você recebe uma mensagem no WhatsApp de alguém que diz ser o **gerente do seu banco**...',
  // Implementado com `blocos` (parágrafos e listas na ordem em que
  // aparecem). Formato final em src/data/conteudos/mensagem-gerente-banco.js.
  secoes: [
    {
      titulo: 'Como o golpe funciona',
      paragrafos: ['...'],
      lista: [{ texto: '...' }]
    },
    { titulo: 'Sinais de alerta', lista: [{ texto: '**Pressa:** ...' }] },
    {
      titulo: 'Como se proteger',
      destaque: true,
      lista: [
        {
          texto: '**Nunca passe** ...',
          subitens: ['o banco **nunca** pede...']
        }
      ]
    }
  ],
  fechamento:
    'Gerente de verdade não tem pressa e não pede código. **Na dúvida, não faça!**'
}
```

- **Marcação mínima no texto:** `**negrito**` e `[[id-do-termo|texto exibido]]` para a lupa. Um componente transforma isso em elementos Vue, **sem `v-html`** (mais seguro e sem HTML solto nos dados).
- Conteúdos sem `secoes` (os dois ainda sem texto) continuam abrindo a página "Em construção".

### Componentes novos

| Componente            | Responsabilidade                                                                               | Reuso futuro                                  |
| --------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `CelularConversa.vue` | Celular com cabeçalho de contato e balões de mensagem, a partir de `contato` e `mensagens`     | Simulado, outros golpes por mensagem          |
| `TextoRico.vue`       | Interpreta `**negrito**` e `[[termo\|texto]]` e renderiza com `TermoGlossario`                 | Todo texto de conteúdo                        |
| `TermoGlossario.vue`  | Palavra sublinhada + ícone de lupa; ao tocar, abre um `q-dialog` com a explicação do glossário | Todo texto de conteúdo                        |
| `ListaDicas.vue`      | Lista com `»` e subitens `▪`                                                                   | Sinais, prevenção, página "Caí num golpe"     |
| `CaixaDestaque.vue`   | Caixa com título e fundo de destaque                                                           | "Como se proteger", "Onde pedir ajuda"        |
| `CaixaAjuda.vue`      | Contatos de ajuda (usa `CaixaDestaque`)                                                        | Todos os conteúdos e a página "Caí num golpe" |

A página `src/pages/index/conteudo/[id].vue` só busca o conteúdo pelo id e monta esses componentes.

### Lupa do glossário: acessibilidade

- O termo é um `<button>` (focável, abre com Enter ou Espaço) com o texto da palavra e o ícone de lupa. O `aria-label` é, por exemplo, "SMS, ver explicação".
- A área de toque tem no mínimo 48px de altura, ganha com padding, sem desalinhar a linha do texto.
- O dialog tem título (o termo), a explicação em fonte grande e um botão **"Entendi"** grande. Ele fecha com Esc ou com toque fora, e o foco volta para a palavra.
- Se um id de termo não existir no glossário, a palavra aparece como texto normal e um aviso vai para o console em desenvolvimento.

### Mudanças em arquivos existentes

| Arquivo                             | Mudança                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| `src/data/conteudos.js`             | Substituído por `src/data/conteudos/index.js` (mesmos exports, então a Home não muda) |
| `src/pages/index/conteudo/[id].vue` | Sai o "Em construção" e entra a página real                                           |
| `src/css/quasar.variables.scss`     | Nova cor `$laranja-terroso: #a8521c` (manchete e capitular)                           |
| `docs/plataforma.md`                | Atualizar "Conteúdos candidatos" e "Decisões em aberto"                               |

**Progresso salvo:** quem concluiu "Banco via Internet" perde esse item, porque o id muda. O store já ignora ids que não existem mais, então nada quebra. Como ainda não há usuários reais, isso não é problema.

## 7. Etapas

1. **Dados:** reorganizar `src/data/conteudos/`, escrever `mensagem-gerente-banco.js` e criar `glossario.js`.
2. **Componentes de texto:** `TextoRico`, `TermoGlossario`, `ListaDicas`, `CaixaDestaque` e `CaixaAjuda`.
3. **Ilustração:** `CelularConversa` e o SVG do anzol.
4. **Página:** reescrever `conteudo/[id].vue` com o layout da seção 3 e o tempo de leitura.
5. **Botões finais e estado concluído** (decisões 3 e 4 da seção 9):
   - "Fazer o simulado" leva a `/conteudo/:id/simulado`, uma página "Em construção" (reusa `PaginaEmConstrucao`);
   - "Já entendi" chama `marcarConcluido(id)` do store, mostra uma confirmação acolhedora (`Notify`) e volta para a Home;
   - com o conteúdo já concluído, o `SeloConcluido` aparece no topo da página e "Já entendi" vira "Voltar para o início". "Fazer o simulado" continua disponível para revisar.
6. **Documentação:** atualizar `plataforma.md`.
7. **Validação:** `pnpm lint:check` + Playwright em desktop e mobile (regra do CLAUDE.md).

## 8. Critérios de aceite

- [x] O card da Home mostra "Mensagem de Gerente do Banco" e abre a nova página.
- [x] A página mostra ilustração, título, tempo de leitura, manchete, capitular, seções, caixa de proteção, caixa de ajuda e botões finais.
- [x] A conversa do celular é texto real (selecionável e lido pelo leitor de tela), sem logotipo do WhatsApp nem nome de banco real.
- [x] Todos os termos marcados mostram a lupa; tocar ou pressionar Enter abre o dialog com a explicação; Esc fecha e o foco volta para a palavra.
- [x] Nenhuma palavra hifenizada; nenhum texto com contraste abaixo de 4,5:1 (manchete ≥ 3:1 por ser texto grande, mas o alvo é 5,1:1).
- [x] Leitura entre 3 e 5 minutos.
- [x] "Fazer o simulado" abre a página "Em construção" do simulado.
- [x] "Já entendi" marca o conteúdo como concluído (selo na Home e barra atualizada).
- [x] Ao reabrir um conteúdo concluído, o selo aparece no topo e o botão vira "Voltar para o início".
- [x] A manchete aparece em negrito grande, sem caixa alta.
- [x] "Evite ser enganado" e "Proteção de dados" continuam abrindo "Em construção".
- [x] Sem rolagem horizontal em 360px, 390px, 768px e 1280px.
- [x] Nenhum `v-html`; `pnpm lint:check` passa.

## 9. Decisões

| #   | Questão                               | Decisão                                                                               |
| --- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| 1   | Texto do rascunho (seção 5)           | **Aprovado**                                                                          |
| 2   | Ilustração                            | **Celular desenhado em código**, com o anzol. Pode ser trocada por imagem depois      |
| 3   | Botões enquanto o simulado não existe | **"Fazer o simulado"** (leva a "Em construção") **+ "Já entendi"** (conclusão manual) |
| 4   | Conteúdo já concluído                 | **Selo "Concluído" no topo**, e "Já entendi" vira "Voltar para o início"              |
| 5   | Manchete                              | **Negrito grande, sem caixa alta**                                                    |
