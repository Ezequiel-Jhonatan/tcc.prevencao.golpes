# Plano de implementação: Simulado "Mensagem de Gerente do Banco"

> **Status:** implementado e validado (16/11/2026) · **Especificação:** [plataforma.md](../plataforma.md) · **Planos anteriores:** [02-conteudo-gerente-banco.md](02-conteudo-gerente-banco.md), [03-ajustes-orientador.md](03-ajustes-orientador.md)

## 1. Objetivo

Trocar a página "Em construção" de `/conteudo/mensagem-gerente-banco/simulado` pelo simulado de verdade:

- um celular (o mesmo `CelularConversa` da explicação) com uma conversa nova: o falso gerente oferece um **crédito com juros baixíssimos**, numa **"oferta relâmpago"**, e pede os dados com urgência;
- abaixo do celular, **3 opções**: 1 certa e 2 erradas;
- **errou**: aparece uma explicação acolhedora do porquê não foi uma boa escolha e um **cenário novo**: "Você passou seus dados. E agora?", com outras 3 opções;
- **acertou**: parabéns e o conteúdo fica concluído.

A página é genérica: o roteiro fica nos dados do conteúdo, e os próximos conteúdos ganham simulado só escrevendo o roteiro.

## 2. Escopo

**Dentro do escopo**

- Página `/conteudo/:id/simulado` genérica, montada a partir do campo `simulado` do conteúdo.
- Roteiro do simulado do gerente do banco (seção 4).
- Retorno (certo/errado) e cenário de recuperação depois do erro.
- Conclusão do conteúdo ao acertar (regra de negócio já existente).
- Atualizar `plataforma.md`: o simulado passa a ter **3 opções**, e não mais só "É golpe" / "Não é golpe".

**Fora do escopo**

- Simulados dos outros conteúdos (ainda sem texto).
- Pontuação, tempo ou histórico de tentativas (a plataforma não tem tempo limite no simulado).

## 3. Fluxo

```
            ┌──────────────────────────────┐
            │ Cenário 1: oferta de crédito │
            │ "O que você faz?" (3 opções) │
            └──────────────┬───────────────┘
          certa ┌──────────┴──────────┐ errada (qualquer uma das 2)
                ▼                     ▼
      ┌──────────────────┐  ┌──────────────────────────────────┐
      │ Parabéns!        │  │ Explicação acolhedora do erro    │
      │ Conteúdo         │  │ + a conversa continua no celular │
      │ concluído        │  │ Cenário 2: "Você passou seus     │
      └──────────────────┘  │ dados. E agora?" (3 opções)      │
                            └────────────────┬─────────────────┘
                              certa ┌────────┴────────┐ errada
                                    ▼                 ▼
                       ┌───────────────────────┐  ┌─────────────────────────┐
                       │ "É isso que você deve │  │ Explicação; a opção     │
                       │ fazer se cair num     │  │ errada fica marcada e   │
                       │ golpe" + Tentar de    │  │ a pessoa tenta de novo  │
                       │ novo (ver decisão 2)  │  └─────────────────────────┘
                       └───────────────────────┘
```

Detalhe visual: ao escolher uma opção errada no cenário 1, a **conversa do celular continua**. Aparece a resposta da pessoa, e o golpista pede mais, a "taxa de liberação". Assim a pessoa vê o que aconteceria.

## 4. Roteiro (texto proposto)

### Cenário 1: a oferta

**Conversa no celular** (contato "Gerente Carlos", online):

1. **Golpista:** Boa tarde, Sr. José! Aqui é o Carlos, seu gerente do banco.
2. **Golpista:** O senhor foi escolhido para um crédito de R$ 20.000,00 com juros de só 0,19% ao mês!
3. **Golpista:** É uma OFERTA RELÂMPAGO: só vale nos próximos 30 minutos.
4. **Golpista:** Para garantir, me mande agora seu CPF, a senha do cartão e o código que vai chegar por SMS. Ou faça o cadastro aqui: cadastro-credito.exemplo

**Pergunta:** O que você faz?

| Opção                                                           | Certa?  | Explicação mostrada                                                                                                                                             |
| --------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mando os dados rápido para não perder a oferta                  | Não     | Calma, isso acontece com muita gente. Mas **banco nenhum pede senha ou [[código]] por mensagem**. A "oferta relâmpago" serve para você não ter tempo de pensar. |
| Não respondo e ligo para o banco pelo número do verso do cartão | **Sim** | Parabéns! Você não caiu na pressa, não passou nenhum dado e confirmou direto com o banco. **Juros baixos demais e prazo curto são sinais de golpe.**            |
| Toco no link para fazer o cadastro com calma                    | Não     | Entendemos a vontade de resolver, mas **o link leva a uma página falsa**, feita para roubar seus dados. O banco de verdade não manda link para liberar crédito. |

A opção certa fica no meio, para não ser sempre a primeira.

### Cenário 2: depois de passar os dados (só depois de um erro)

**A conversa continua no celular:**

- **Você:** (mensagem com os dados, mostrada assim: "Meu CPF é \*\*\*.\*\*\*.\*\*\*-\*\*…", sem dados reais)
- **Golpista:** Pronto, Sr. José! Agora é só pagar a taxa de liberação de R$ 390,00 por Pix que o dinheiro cai hoje.

**Pergunta:** Você já passou seus dados. E agora, o que fazer?

| Opção                                                                                                             | Certa?  | Explicação mostrada                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Pago a taxa para finalmente receber o crédito                                                                     | Não     | Essa taxa é **mais um golpe**. O crédito não existe: quem pede dinheiro adiantado para liberar empréstimo é golpista.          |
| Fico quieto e espero para ver se acontece alguma coisa                                                            | Não     | **Cada minuto conta**: o golpista pode usar seus dados agora mesmo. E não precisa sentir vergonha: golpes enganam muita gente. |
| Ligo na hora para o banco, peço para bloquear o cartão e a conta, troco as senhas e faço um boletim de ocorrência | **Sim** | Isso mesmo! Agir rápido diminui o prejuízo. Depois, se precisar, procure o Disque 100 ou a delegacia.                          |

`código`, `link`, `Pix` e `boletim de ocorrência` usam a lupa do glossário **só nas explicações e no contexto**. As opções são botões, e a lupa (também um botão) não pode ficar dentro de outro botão. O termo **"Boletim de ocorrência"** foi incluído no glossário.

## 5. Layout

**Celular (390px):** coluna única, como o usuário descreveu.

```
┌────────────────────────────┐
│ ← Voltar para o conteúdo   │
│ Simulado: Mensagem de      │
│ Gerente do Banco           │
│ Leia a conversa e escolha  │
│ o que você faria.          │
│      ┌──────────────┐      │
│      │   CELULAR    │      │
│      │  (conversa)  │      │
│      └──────────────┘      │
│ O que você faz?            │
│ ┌────────────────────────┐ │
│ │ Mando os dados rápido… │ │  ← 3 botões grandes,
│ ├────────────────────────┤ │    texto completo,
│ │ Não respondo e ligo…   │ │    alvo de toque ≥ 48px
│ ├────────────────────────┤ │
│ │ Toco no link…          │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

**Desktop (a partir de 1024px):** ver decisão 3. A proposta é pôr as opções **ao lado** do celular, seguindo a orientação de "ver ao mesmo tempo". Com as opções abaixo, o celular (cerca de 600px de altura) as empurra para fora da tela.

**Retorno do erro:** ver decisão 1. A proposta é uma **caixa de retorno na própria página**, logo acima das novas opções, que não some sozinha. Ela fica no lugar da notificação flutuante do Quasar, que desaparece depois de alguns segundos (a plataforma não tem tempo limite e não tem janelas que abrem sozinhas).

```
┌───────────────────────────────────────────┐
│ ⓘ Há uma opção mais segura                │  ← fundo âmbar claro, ícone e texto
│ Calma, isso acontece com muita gente.     │    (a cor nunca é o único sinal)
│ Mas banco nenhum pede senha ou código...  │
└───────────────────────────────────────────┘
Você já passou seus dados. E agora, o que fazer?
[ opção ] [ opção ] [ opção ]
```

**Acerto:** caixa verde "Parabéns!" com a explicação, o selo "Concluído" e os botões **"Voltar para o início"** e **"Rever o conteúdo"**.

## 6. Arquitetura

### Dados (no arquivo do conteúdo)

```js
simulado: {
  contato: { nome: 'Gerente Carlos', status: 'online' },
  inicio: 'oferta', // id da primeira etapa
  etapas: {
    oferta: {
      mensagens: [{ de, texto }],   // conversa mostrada no celular
      pergunta: 'O que você faz?',
      opcoes: [
        {
          texto: '...',
          correta: false,
          explicacao: '...',          // aceita a marcação do TextoRico
          proxima: 'depois-dos-dados',// etapa seguinte (só nas erradas)
          mensagensExtras: [{ de, texto }] // continuação da conversa
        }
      ]
    },
    'depois-dos-dados': { mensagens, pergunta, opcoes }
  }
}
```

`temSimulado(conteudo)` em `src/data/conteudos/index.js`: sem `simulado`, a página continua "Em construção" e o botão "Fazer o simulado" continua levando para ela.

### Componentes

| Componente                 | Papel                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CelularConversa`          | Reaproveitado sem mudança. As mensagens extras são somadas à lista                                                                                              |
| `OpcoesSimulado` (novo)    | Pergunta (h2) e 3 botões grandes com o texto completo. Emite `escolher`. Opção errada já tentada fica marcada e desabilitada                                    |
| `RetornoSimulado` (novo)   | Caixa de retorno: variante `acerto` (verde, check) ou `erro` (âmbar, ícone de informação), título e explicação. Anunciada pelo leitor de tela (`role="status"`) |
| Página `[id]/simulado.vue` | Guarda a etapa atual, as opções já tentadas e o resultado. Marca o conteúdo como concluído ao acertar                                                           |

O foco do teclado vai para a caixa de retorno depois de cada escolha, para quem usa leitor de tela ou teclado não se perder.

## 7. Passos

1. Escrever o roteiro em `mensagem-gerente-banco.js` e criar `temSimulado()`.
2. Criar `OpcoesSimulado` e `RetornoSimulado`.
3. Reescrever `simulado.vue`: etapas, retorno, conclusão e layout responsivo.
4. Incluir "Boletim de ocorrência" no glossário (se aprovado).
5. Atualizar `plataforma.md` (simulado com 3 opções e cenário de recuperação) e `CLAUDE.md`.
6. `lint:check` e validação com Playwright (desktop 1280×800 e mobile 390×844), conforme o CLAUDE.md.

## 8. Critérios de aceite

- [x] O simulado mostra o celular com a conversa da oferta de crédito e 3 opções.
- [x] Acertar no cenário 1 mostra "Parabéns!", marca o conteúdo como concluído e a Home mostra o card colorido com o selo.
- [x] Errar no cenário 1 mostra a explicação acolhedora, continua a conversa no celular e mostra o cenário 2.
- [x] No cenário 2, a opção errada mostra a explicação e fica marcada; a pessoa pode tentar de novo.
- [x] A opção certa do cenário 2 mostra a mensagem final (regra da decisão 2).
- [x] O retorno não some sozinho e não depende só da cor (tem ícone e título).
- [x] O leitor de tela anuncia o retorno, e o foco vai para ele depois da escolha.
- [x] Botões das opções com no mínimo 48px de altura e o texto completo visível (sem cortar).
- [x] As lupas funcionam nas explicações.
- [x] Sem erros no console e sem rolagem horizontal em 360, 390, 768 e 1280px.

## 9. Decisões (16/11/2026)

| #   | Pergunta                                    | Decisão                                                                |
| --- | ------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | Formato do retorno                          | Caixa na própria página, que não some sozinha                          |
| 2   | Errou no cenário 1 e acertou no 2: conclui? | Não. Mensagem "Isso mesmo!" e convite para "Tentar o simulado de novo" |
| 3   | Desktop                                     | Opções ao lado do celular                                              |
| 4   | Texto do roteiro                            | Aprovado                                                               |
| 5   | "Boletim de ocorrência" no glossário        | Incluído                                                               |

## 10. Validação (16/11/2026)

Feita com o Playwright em 1280×800, 768×1024, 390×844 e 360×780.

**Primeira rodada: 2 problemas**

1. A opção errada já tentada ficava **desbotada**: o Quasar aplica `opacity: .6` em todo `[disabled]`, o que derrubava o contraste do texto. **Correção:** `aria-disabled="true"` no lugar de `disabled`, com o clique ignorado no componente. O leitor de tela continua anunciando "indisponível".
2. O título verde "Parabéns!" tinha contraste de 4,36:1 (passava como texto grande, mas abaixo da meta de 4,5:1). **Correção:** verde mais escuro (`#1f5e3a`), agora com 6,67:1.

**Revalidação: sem problemas**

- Acerto direto (B): "Parabéns!", selo "Concluído", conteúdo salvo e card colorido na Home.
- Erro pelo caminho dos dados (A) e pelo caminho do link (C): a explicação aparece, a conversa continua no celular (6 balões) e surge o cenário 2.
- Erro no cenário 2: a opção fica marcada com "X" e "Não foi uma boa escolha", legível (8,95:1) e sem reagir a novos cliques.
- Acerto depois de erro: "Isso mesmo!", o conteúdo **não** é concluído, e "Tentar o simulado de novo" volta ao início.
- O foco vai para a caixa de retorno a cada escolha. No celular, a tela rola até ela, e a conversa nova fica visível logo acima.
- Botões das opções com 112px a 196px de altura em 360px, com o texto completo.
- Sem erros ou avisos no console e sem rolagem horizontal em nenhuma largura.

## 11. Ajuste (17/11/2026)

O rosa e o título "Não foi uma boa escolha" lembravam falha e podiam desanimar o idoso. O erro passou a usar um **âmbar suave** (`$ambar-*` em `quasar.variables.scss`) e o texto **"Há uma opção mais segura"**, tanto no título da caixa de retorno quanto no aviso da opção já tentada. Contrastes: texto marrom 11,1:1 e título âmbar escuro 6,9:1 sobre o fundo âmbar claro.
