# Plano de implementação: Conteúdo e simulado "SMS da Operadora"

> **Status:** implementado e validado (18/11/2026) · **Especificação:** [plataforma.md](../plataforma.md) · **Modelo:** [04-simulado-gerente-banco.md](04-simulado-gerente-banco.md)

## 1. Objetivo

1. Trocar o conteúdo "Evite ser enganado" por **"SMS da Operadora"** (novo id `sms-operadora`).
2. Escrever o texto do conteúdo e o roteiro do simulado, seguindo o "Mensagem de Gerente do Banco".
3. No simulado, quando a pessoa escolhe **tocar no link**, o celular deixa a conversa e mostra a **página falsa**: o print de um site de operadora de verdade, com o pedido do golpe por cima.

**Cenário do golpe:** pontos ou prêmios expirando. O SMS diz que o cliente juntou pontos no programa de fidelidade da operadora e que eles vencem no mesmo dia. Ao tocar para resgatar, a vítima cai numa página falsa que pede os dados do cartão de crédito para pagar um suposto frete.

## 2. Escopo

**Dentro do escopo**

- Dados do conteúdo em `src/data/conteudos/sms-operadora.js` (Home, página de conteúdo e simulado).
- Print do site imitado em `src/assets/simulados/sms-operadora-site.jpg`.
- `CelularConversa`: ícone do contato configurável e variante `pagina` (navegador com a página falsa).
- Simulado: campo `pagina` na opção, que troca a conversa pela página.
- Glossário: termo novo "Programa de fidelidade" e "Aplicativo oficial" sem falar só de banco.

**Fora do escopo**

- O conteúdo "Proteção de dados".
- Formulário de verdade: a página falsa é uma ilustração e não aceita digitação.

## 3. Conteúdo

| Campo         | Texto                                                                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título        | SMS da Operadora                                                                                                                                                                                   |
| Resumo (Home) | Pontos vencendo hoje? Desconfie do link.                                                                                                                                                           |
| Ícone e cor   | `sms`, laranja (a cor de "Evite ser enganado")                                                                                                                                                     |
| Manchete      | **Não toque no link do SMS**                                                                                                                                                                       |
| Introdução    | Golpistas mandam [[SMS]] **fingindo ser a sua operadora de celular**. O [[link]] abre uma página falsa, igual ao site da operadora, que pede os dados do cartão para pagar o "frete" de um prêmio. |

**Conversa no celular** (contato "OPERADORA", "Mensagem de texto", ícone de sinal de celular):

1. Olá! Você tem 3.200 pontos acumulados no programa de fidelidade.
2. ATENÇÃO: seus pontos VENCEM HOJE!
3. Troque agora por um fone de ouvido sem fio: pontos-operadora.exemplo

O remetente aparece como "OPERADORA" porque golpistas conseguem mandar SMS com o nome da empresa. O nome fica só no topo da conversa, e não repetido no texto do SMS, para o leitor de tela não ler "OPERADORA" duas vezes. Nenhuma operadora real é citada no texto.

**Sinais de alerta**

| Ícone         | Título           | Frase                                                             |
| ------------- | ---------------- | ----------------------------------------------------------------- |
| `timer`       | Pressa           | "Seus pontos do [[programa de fidelidade]] vencem HOJE!"          |
| `link`        | Link na mensagem | O [[link]] abre uma página falsa, **igual ao site** da operadora. |
| `credit_card` | Cobra frete      | Pede os dados do cartão para **pagar a entrega** do prêmio.       |

**Como se proteger:** Quando a esmola é demais, o santo desconfia. **Na dúvida, não toque em nada** e converse com alguém de confiança.

- **Não toque** em [[links]] de [[SMS]]
- **Não passe** os dados do cartão para pagar frete ou taxa
- **Confira seus pontos** no [[aplicativo oficial]] da operadora
- **Apague o SMS** sem responder

## 4. Roteiro do simulado

### Cenário 1: os pontos vencendo

**SMS no celular:**

1. Parabéns! Você juntou 5.800 pontos no programa de fidelidade.
2. ATENÇÃO: seus pontos VENCEM HOJE, à meia-noite! Troque agora por um celular novo.
3. Resgate aqui: premios-operadora.exemplo

**Pergunta:** O que você faz?

| Opção                                                                     | Certa?  | O que acontece                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toco no link para resgatar o celular antes que os pontos vençam           | Não     | **O celular mostra a página falsa** (seção 5). Explicação: Entendemos a vontade de não perder os pontos, mas **o link abre uma página falsa**, que copia o site da operadora. Ela pede os dados do cartão para pagar um "frete". **Desconfie de prêmio que cobra frete.**                                                                               |
| Respondo o SMS para resgatar sem precisar tocar no link                   | Não     | A conversa continua: a pessoa diz que não sabe mexer em link, o golpista pede os dados do cartão para o frete de R$ 12,90 e ela manda (com asteriscos, sem dados reais). Explicação: Fugir do link foi uma boa ideia, mas **quem responde o SMS é o próprio golpista**. Operadora nenhuma pede os dados do cartão por mensagem para entregar um prêmio. |
| Não toco no link e confiro meus pontos no aplicativo oficial da operadora | **Sim** | Você não caiu na pressa e conferiu pelo caminho seguro. **Pontos que vencem no mesmo dia e link por SMS são sinais de golpe.**                                                                                                                                                                                                                          |

A certa fica por último (no gerente do banco, ela fica no meio), para a pessoa não decorar a posição. A segunda opção ensina que **o perigo não é só o link**: responder o SMS também leva ao golpista.

### Cenário 2: depois de passar os dados (só depois de um erro)

**Contexto:** Veja no celular: os dados do cartão foram parar com os golpistas, e o prêmio **não existe**.

**Pergunta:** Você já passou seus dados. E agora, o que fazer?

| Opção                                                                                                                 | Certa?  | Explicação                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ligo na hora para o banco pelo número do verso do cartão, peço para bloquear o cartão e faço um boletim de ocorrência | **Sim** | Agir rápido diminui o prejuízo: com o cartão bloqueado, os golpistas não conseguem fazer compras. Faça também o [[boletim de ocorrência]] e, se precisar de ajuda, procure o Disque 100. |
| Espero o celular chegar, afinal paguei só R$ 12,90                                                                    | Não     | O prêmio **não existe**, e com os dados do cartão os golpistas podem fazer **compras bem maiores** no seu nome. E não precisa sentir vergonha: golpes enganam muita gente.               |
| Respondo o SMS pedindo para cancelar o pagamento                                                                      | Não     | Quem lê a resposta é o golpista: ele não cancela nada e pode inventar outra história para tirar mais dinheiro. **Fale direto com o seu banco**, pelo número do verso do cartão.          |

O fluxo (acerto, erro, cenário 2, conclusão só ao acertar de primeira) é o mesmo do [plano 04](04-simulado-gerente-banco.md).

## 5. Página falsa no celular

Quando a pessoa toca no link, o celular troca a conversa por um navegador:

```
┌───────────────────────┐
│  ◯ premios-operadora.exemplo │  ← barra de endereço (endereço falso)
├───────────────────────┤
│  [print do site da    │  ← site de operadora de verdade, escurecido
│   operadora: menu,    │
│   logotipo, banner    │
│   do clube de pontos] │
│ ┌───────────────────┐ │
│ │ Resgate seu prêmio│ │  ← janela por cima, em texto de verdade
│ │ Seus 5.800 pontos │ │
│ │ viraram um celular│ │
│ │ novo! Pague só o  │ │
│ │ frete de R$ 12,90 │ │
│ │ Número do cartão  │ │
│ │ [**** **** 4821]  │ │  ← já preenchido, sem dados reais
│ │ Validade │ Código │ │
│ │ [ Pagar frete ]   │ │
│ └───────────────────┘ │
└───────────────────────┘
  Página falsa aberta pelo link: ela imita o site da operadora
```

- **Print:** página do Claro clube (`claro.com.br/claro-clube`), o programa de pontos da Claro, capturada com o Playwright em 18/11/2026: celular de 390px, resolução 2x, JPEG de 83 KB. Foi escolhida porque mostra o programa de pontos sem fotos de pessoas nem promoções com data. Avisos de cookies, de localização e do aplicativo foram fechados antes do print.
- **Por que print + texto:** o print mostra que a página falsa é **igual ao site de verdade**, que é a lição principal. O pedido do golpe fica por cima em HTML, para ser lido com letra no tamanho certo, pelo leitor de tela e com zoom.
- **Acessibilidade:** a imagem tem descrição, o endereço é anunciado como "Endereço da página", e a legenda do celular diz que a página é falsa. O botão "Pagar frete" é só desenho (não recebe foco nem clique).
- A página continua no celular até o fim do simulado, e "Tentar o simulado de novo" volta à conversa.

## 6. Arquitetura

| Arquivo                                      | Mudança                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/data/conteudos/sms-operadora.js`        | Novo nome do `evite-ser-enganado.js`, com texto e roteiro                          |
| `src/data/conteudos/index.js`                | Registro do conteúdo e documentação de `contato.icone` e `pagina`                  |
| `src/components/CelularConversa.vue`         | `contato.icone` (padrão: banco) e prop `pagina` (navegador com print e formulário) |
| `src/pages/index/conteudo/[id]/simulado.vue` | Guarda a `pagina` aberta pela opção errada e troca a legenda do celular            |
| `src/data/glossario.js`                      | "Programa de fidelidade" (novo) e "Aplicativo oficial" (banco ou operadora)        |

Formato da `pagina` (na opção do simulado):

```js
pagina: {
  legenda, endereco,
  imagem, descricaoImagem,
  formulario: { titulo, texto, botao, campos: [{ rotulo, valor }] }
}
```

## 7. Pontos de atenção

- **Marca real no print:** é o único lugar onde uma empresa real aparece. A legenda deixa claro que a página é falsa e que ela **imita** o site. Para o texto do TCC, vale citar a fonte do print (site da Claro, acesso em 18/11/2026) e dizer que a operadora não tem relação com o golpe.
- **O print envelhece:** se o site mudar, o print continua o mesmo, o que não atrapalha o simulado. Para trocar a imagem, basta substituir o arquivo.
- O id antigo (`evite-ser-enganado`) nunca pôde ser concluído (a página era "Em construção"), então nenhum progresso salvo se perde.

## 8. Critérios de aceite

- [x] A Home mostra o card "SMS da Operadora" (ícone de SMS, laranja) no lugar de "Evite ser enganado".
- [x] A página `/conteudo/sms-operadora` mostra o celular com o SMS, os 3 sinais, a manchete, a introdução, "Como se proteger" e "Onde pedir ajuda".
- [x] As lupas de SMS, link, programa de fidelidade e aplicativo oficial abrem a explicação.
- [x] O simulado mostra o SMS e 3 opções; acertar de primeira conclui o conteúdo.
- [x] Tocar no link mostra a página falsa no celular (print do site, endereço falso e formulário), a explicação e o cenário 2.
- [x] Responder o SMS continua a conversa e leva ao cenário 2.
- [x] No cenário 2, a errada fica marcada; a certa mostra "Isso mesmo!" sem concluir, e "Tentar de novo" volta à conversa.
- [x] O gerente do banco continua igual (ícone de banco no celular).
- [x] Sem erros no console e sem rolagem horizontal em 1280px e 390px.

## 9. Validação (18/11/2026)

Feita com o Playwright em 1280×800 e 390×844.

**Primeira rodada: 2 problemas**

1. Na página falsa, o rótulo "Código de segurança" quebrava em duas linhas e a caixa dele ficava mais baixa que a de "Validade". **Correção:** cada campo virou uma coluna com a caixa embaixo, e as duas caixas do par ficam sempre alinhadas.
2. O leitor de tela lia "OPERADORA: OPERADORA: Parabéns!", porque o texto do SMS começava com o nome do remetente, que o celular já anuncia. **Correção:** o nome saiu do texto das mensagens e ficou só no topo da conversa.

**Revalidação: sem problemas**

- Home: card "SMS da Operadora" com o ícone de SMS e a mancha laranja; depois do acerto, card colorido com o selo "Concluído".
- Conteúdo: celular ao lado dos sinais no desktop e em coluna no celular, leitura de 2 minutos; a lupa "Programa de fidelidade" abre a explicação nova.
- Tocar no link (A): o celular mostra a barra com `premios-operadora.exemplo`, o print do Claro clube escurecido e o formulário preenchido; a legenda muda para "Página falsa aberta pelo link: ela imita o site da operadora"; a explicação e o cenário 2 aparecem. No celular de 390px, o print fica com 226px de altura visível.
- Responder o SMS (B): a conversa continua com 3 balões novos e leva ao cenário 2, sem página.
- Cenário 2: a errada fica marcada com "X" e não reage a cliques; a certa mostra "Isso mesmo!", não conclui, e "Tentar o simulado de novo" volta à conversa (sem a página).
- Acerto direto (C): "Parabéns!", selo "Concluído" e progresso salvo (`sms-operadora`).
- O gerente do banco continua com o ícone de banco no celular.
- Botões das opções com 84px a 168px de altura em 390px; sem erros ou avisos no console e sem rolagem horizontal.

**Observação (não é erro):** endereços como `premios-operadora.exemplo` quebram a linha no hífen dentro do balão, como num celular de verdade. A página Glossário continua "Em construção" (fora do escopo); o termo novo já aparece nas lupas.
