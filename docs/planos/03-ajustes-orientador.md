# Plano de implementação: Ajustes do orientador (Home e página de conteúdo)

> **Status:** implementado e validado (16/11/2026) · **Origem:** [sugestao_16_11_26.txt](../sugestoes_orientador/sugestao_16_11_26.txt) · **Referência de disposição:** [exemplo_orientador.html](../exemplos/exemplo_orientador.html) · **Planos anteriores:** [01-home.md](01-home.md), [02-conteudo-gerente-banco.md](02-conteudo-gerente-banco.md)

## 1. Objetivo

Aplicar as orientações de 16/11/2026:

| #   | Orientação                                                             | Tela     |
| --- | ---------------------------------------------------------------------- | -------- |
| H1  | Tirar a barra de progresso por enquanto                                | Home     |
| H2  | Título e texto maiores                                                 | Home     |
| H3  | Instrução dizendo que cada card é um tipo de golpe e que é para clicar | Home     |
| H4  | Cards mais claros ou cinza enquanto não foram feitos                   | Home     |
| C1  | No desktop, a imagem e o texto lado a lado (ver ao mesmo tempo)        | Conteúdo |
| C2  | Imagem do golpe no formato de celular, como no exemplo                 | Conteúdo |
| C3  | Texto mais curto e mais visual: simplificar e resumir                  | Conteúdo |

O HTML do orientador vale só como **disposição** dos elementos. Cores, fontes e tamanhos continuam os da plataforma (paleta laranja e marrom e regras de acessibilidade). O cinza do exemplo não passa no contraste mínimo.

## 2. Escopo

**Dentro do escopo**

- Home: ajustes H1 a H4.
- Página de conteúdo: novo layout, celular redesenhado e texto resumido do "Mensagem de Gerente do Banco".
- Atualizar [plataforma.md](../plataforma.md) com as regras que mudam (barra de progresso suspensa, nova estrutura do conteúdo, tempo de leitura).

**Fora do escopo**

- O simulado (passa a ser o plano 04).
- Os textos de "Evite ser enganado" e "Proteção de dados".
- As páginas Glossário e "Caí num golpe".

## 3. Home

### H1. Barra de progresso

Sai da tela. O componente `BarraProgresso` e a store ficam no projeto, porque a store continua marcando os cards concluídos e a barra pode voltar depois.

### H2. Título e texto maiores

| Elemento             | Hoje           | Proposto (celular / desktop) |
| -------------------- | -------------- | ---------------------------- |
| "Olá!" (h1)          | 2rem           | 2.5rem / 3rem                |
| Texto de boas-vindas | 1.25rem (20px) | 1.5rem (24px)                |

### H3. Instrução

Logo acima da grade de conteúdos, no lugar do título "Conteúdos":

> **Escolha um golpe para aprender**
> Cada card abaixo é um tipo de golpe. Toque ou clique em um deles para começar.

### H4. Cards claros enquanto não foram feitos

O card só ganha a cor cheia **depois** de concluído. Assim, colorido passa a significar "feito".

| Estado        | Fundo                                      | Identidade (cor própria)          | Sinal extra                        |
| ------------- | ------------------------------------------ | --------------------------------- | ---------------------------------- |
| Não concluído | cinza quente bem claro (`#f3eeea`) e borda | mantida **só na mancha do ícone** | texto "Começar ›" no rodapé        |
| Concluído     | cor de identidade cheia                    | card inteiro                      | selo verde "Concluído" (já existe) |

A mancha colorida atrás do ícone mantém cada card diferente dos outros (regra da plataforma) mesmo antes de concluir.

Os cards de ajuda (Glossário e "Caí num golpe") nunca são "concluídos". Para não parecerem feitos, eles também ficam com fundo claro e a cor só na mancha do ícone.

```
Não concluído                       Concluído
┌──────────────────────────┐        ┌──────────────────────────┐
│ (●) ← mancha azul        │        │ (●)          ✔ Concluído │  ← fundo azul cheio
│ Mensagem de Gerente      │        │ Mensagem de Gerente      │
│ do Banco                 │        │ do Banco                 │
│ Gerente pedindo código…  │        │ Gerente pedindo código…  │
│                Começar › │        │                          │
└──────────────────────────┘        └──────────────────────────┘
  fundo cinza claro
```

## 4. Página de conteúdo

### C1. Disposição (segue o exemplo do orientador)

**Desktop (a partir de 1024px):**

```
┌──────────────────────────────────────────────────────────┐
│ ← Voltar para o início                                   │
│ ┌───────────┐  ┌──────────────────────────────────────┐  │
│ │           │  │ [⏱] Pressa       "É urgente!..."     │  │ ← 3 cards de
│ │  CELULAR  │  │ [🔑] Pede código O banco nunca...    │  │   sinais de alerta
│ │ (conversa │  │ [📵] Número novo Mesmo com foto...   │  │
│ │  do falso │  └──────────────────────────────────────┘  │
│ │  gerente) │  Mensagem de Gerente do Banco · 1 min      │
│ │           │  Gerente de verdade não pede código        │ ← manchete
│ │           │  Golpistas fingem ser o gerente...         │ ← introdução (2 frases)
│ └───────────┘                                            │
│ ┌─────────────────────────┐ ┌──────────────────────────┐ │
│ │ Como se proteger        │ │ Onde pedir ajuda         │ │ ← 2 cards grandes
│ │ texto + lista curta     │ │ Disque 100 / WhatsApp /  │ │
│ │                         │ │ 190                      │ │
│ └─────────────────────────┘ └──────────────────────────┘ │
│        [ Fazer o simulado ]   [ Já entendi ]             │
└──────────────────────────────────────────────────────────┘
```

**Celular e tablet em pé:** uma coluna, na ordem do exemplo: celular → cards de sinais → título e manchete → "Como se proteger" → "Onde pedir ajuda" → botões.

### C2. Celular no formato do exemplo

O componente `CelularConversa` é redesenhado para parecer o celular do exemplo:

- moldura escura com borda e cantos bem arredondados;
- "câmera" (entalhe) no topo;
- proporção de celular (mais alto que largo, cerca de 300×600px no desktop);
- sem inclinação;
- barra de digitação falsa no rodapé ("Mensagem"), decorativa e escondida do leitor de tela.

A conversa continua sendo texto de verdade, com os mesmos dados. Proposta: **tirar o anzol**, que deixa o desenho menos parecido com o exemplo e empurra o celular para baixo (ver decisão 3).

### C3. Texto resumido

O texto atual tem cerca de 430 palavras e passa para cerca de 150. A conversa no celular já conta a história do golpe, então a seção "Como o golpe funciona" sai e o resto vira cards.

| Bloco                 | Hoje                                | Proposto                                    |
| --------------------- | ----------------------------------- | ------------------------------------------- |
| Introdução            | 3 frases, com letra capitular       | 2 frases, sem capitular                     |
| Como o golpe funciona | 2 parágrafos e uma lista de 4 itens | **Sai**: a conversa no celular mostra       |
| Sinais de alerta      | lista de 4 itens                    | **3 cards pequenos** (ícone, título, frase) |
| Como se proteger      | 5 itens com subitens                | 1 frase e 4 itens curtos, sem subitens      |
| Fechamento            | 1 parágrafo                         | **Sai**: a ideia já está na manchete        |
| Onde pedir ajuda      | caixa com 3 contatos                | igual, como card grande                     |

**Texto proposto:**

- **Manchete:** Gerente de verdade não pede código
- **Introdução:** Golpistas mandam mensagem no WhatsApp **fingindo ser o gerente do seu banco**. Eles inventam um problema urgente para você agir sem pensar.
- **Sinais de alerta** (3 cards):
  1. ⏱ **Pressa**: "É urgente! Sua conta vai ser bloqueada."
  2. 🔑 **Pede código, senha ou Pix**: O banco **nunca** pede [código](lupa) ou [Pix](lupa) por mensagem.
  3. 📵 **Número desconhecido**: Mesmo com a foto e o nome do banco.
- **Como se proteger:** Na dúvida, **não faça nada** e converse com alguém de confiança.
  - **Não passe** códigos nem senhas
  - **Não faça [Pix](lupa)** para "conta de segurança"
  - **Não toque** em [links](lupa) da conversa
  - **Desligue e ligue você** para o banco, pelo número do verso do cartão
- **Onde pedir ajuda:** sem mudança.

Os termos "SMS", "dados vazados" e "aplicativo oficial" deixam de aparecer no texto, mas continuam no glossário para a futura página Glossário.

### Tempo de leitura

Com cerca de 150 palavras, a estimativa cai para **1 minuto**, abaixo dos 3 a 5 minutos da especificação. Como o orientador pediu para resumir, a proposta é mudar a regra para "leitura curta, de 1 a 2 minutos" e manter o aviso de tempo na página (ver decisão 2).

## 5. Arquitetura

### Dados (`src/data/conteudos/mensagem-gerente-banco.js`)

As `secoes` genéricas viram campos com papel fixo, porque o layout novo tem lugares fixos para cada parte:

```js
{
  id, titulo, resumo, icone, cor,
  manchete: '...',
  introducao: '...',
  ilustracao: { contato, mensagens },   // legenda passa a ser opcional
  sinais: [{ icone, titulo, texto }],   // exatamente 3, viram os cards pequenos
  protecao: { texto: '...', itens: [{ texto: '...' }] }
}
```

`temTexto()` passa a verificar `sinais` e `protecao`.

### Componentes

| Componente              | Mudança                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `CardHome`              | Estado não concluído claro, cor só na mancha, rodapé "Começar ›" (só na variante `conteudo`) |
| `CelularConversa`       | Novo visual (moldura, entalhe, proporção, barra de digitação); sem anzol e sem inclinação    |
| `CardSinal` (novo)      | Card pequeno: ícone em círculo, título e frase (`TextoRico`); usado 3 vezes por conteúdo     |
| `CaixaDestaque`         | Vira o "card grande" do exemplo, com altura igual quando lado a lado                         |
| `CaixaAjuda`            | Sem mudança no conteúdo                                                                      |
| `ListaDicas`            | Mantido; subitens deixam de ser usados (o suporte fica)                                      |
| `BlocosConteudo`        | **Removido**: deixa de ter uso                                                               |
| Página `[id]/index.vue` | Grade em duas colunas no desktop; sem capitular nem fechamento                               |
| Home `(index).vue`      | Sem barra, título e texto maiores, instrução nova                                            |

## 6. Passos

1. Home: tirar a barra, aumentar o título e o texto e trocar o título "Conteúdos" pela instrução.
2. `CardHome`: estado não concluído claro e rodapé "Começar ›"; cards de ajuda claros.
3. Dados: reescrever `mensagem-gerente-banco.js` no formato novo e ajustar `temTexto()`.
4. Criar `CardSinal` e redesenhar `CelularConversa`.
5. Página de conteúdo: nova grade, cards grandes lado a lado e remoção de `BlocosConteudo`.
6. Atualizar `plataforma.md`, `CLAUDE.md` e os planos 01 e 02 onde houver regra que mudou.
7. `lint:check` e validação com Playwright (desktop 1280×800 e mobile 390×844), conforme o CLAUDE.md.

## 7. Critérios de aceite

- [x] A Home não mostra a barra de progresso.
- [x] O "Olá!" e o texto de boas-vindas estão maiores (tamanhos da seção 3).
- [x] A instrução "Escolha um golpe para aprender…" aparece acima dos cards.
- [x] Card não concluído tem fundo claro, cor só na mancha do ícone e "Começar ›".
- [x] Card concluído tem a cor cheia e o selo "Concluído".
- [x] No desktop (1280px), o celular e o texto aparecem lado a lado, sem rolar para ver os dois.
- [x] Os cards "Como se proteger" e "Onde pedir ajuda" ficam lado a lado no desktop, com a mesma altura.
- [x] No celular (390px), tudo fica em uma coluna, na ordem da seção 4.
- [x] O celular tem moldura, entalhe e proporção de celular, e a conversa é lida pelo leitor de tela.
- [x] O texto tem cerca de 150 palavras e as lupas funcionam (código, Pix, link).
- [x] "Fazer o simulado" e "Já entendi" continuam funcionando como antes.
- [x] Contraste mínimo de 4,5:1 em todos os textos, incluindo o card claro.
- [x] Sem erros no console e sem rolagem horizontal em 360, 390, 768 e 1280px.

## 8. Decisões (16/11/2026)

| #   | Pergunta            | Decisão                                                           |
| --- | ------------------- | ----------------------------------------------------------------- |
| 1   | Cards claros (H4)   | Cinza quente claro, com a cor de identidade só na mancha do ícone |
| 2   | Tempo de leitura    | Regra muda para "1 a 2 minutos"; o aviso continua na página       |
| 3   | Anzol no celular    | Retirado                                                          |
| 4   | Texto resumido (C3) | Aprovado como está na seção 4                                     |

## 9. Validação (16/11/2026)

Feita com o Playwright em 1280×800, 768×1024, 390×844 e 360×780. **Nenhum bug encontrado**, então não houve rodada de correção.

- Home: sem a barra, "Olá!" e texto maiores, instrução acima dos cards, card claro com "Começar ›" e card concluído azul com selo.
- Conteúdo no desktop: celular (300px) ao lado dos sinais, do título e da manchete; os dois cards grandes lado a lado com a mesma altura. Em 768px e abaixo, uma coluna.
- Lupas (código e Pix nos sinais; Pix e link na proteção) abrem a explicação. O Esc fecha e o foco volta para a palavra.
- "Já entendi" marca o conteúdo, volta para a Home e o card fica colorido com o selo. Ao reabrir, aparecem o selo e "Voltar para o início".
- Contrastes medidos: texto no card claro 10,7:1; "Começar ›" 4,7:1; rótulo "Sinais de alerta" 5,1:1; texto dos sinais 12,3:1.
- Sem erros ou avisos no console e sem rolagem horizontal em nenhuma largura.

**Observações:**

- Foi incluído um rótulo visível "Sinais de alerta" acima dos três cards pequenos (não estava no exemplo). Sem ele, não fica claro o que os cards são. É um parágrafo, não um título, para não ficar um título antes do h1 da página.
- A página mostra **2 minutos** de leitura. O texto do conteúdo tem cerca de 150 palavras, mas a conta inclui tudo o que está na tela (conversa do celular e caixa de ajuda), cerca de 250 palavras.
