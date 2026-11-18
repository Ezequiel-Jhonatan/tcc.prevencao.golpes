# Plano de implementação: Conteúdo e simulado "Mensagem do INSS"

> **Status:** implementado e validado, com 1 ajuste pendente de decisão (18/11/2026) · **Especificação:** [plataforma.md](../plataforma.md) · **Modelos:** [04-simulado-gerente-banco.md](04-simulado-gerente-banco.md), [05-sms-operadora.md](05-sms-operadora.md)

## 1. Objetivo

1. Trocar o conteúdo "Proteção de dados" por **"Mensagem do INSS"** (novo id `mensagem-inss`).
2. Escrever o texto do conteúdo e o roteiro do simulado, no mesmo formato dos outros dois.
3. Acrescentar ao glossário os termos novos.

**Por que trocar:** "Proteção de dados" é um tema, não um golpe. Os outros conteúdos começam por uma conversa concreta no celular e terminam num simulado; um texto sobre "dados" em geral ficaria abstrato para quem tem pouca familiaridade com tecnologia. O tema continua, contado por um golpe concreto.

**Cenário do golpe:** um falso atendente do INSS manda mensagem dizendo que o cadastro está desatualizado (ou que a prova de vida venceu) e ameaça bloquear a aposentadoria. Para "regularizar", pede **foto do documento e uma selfie**. Com eles, o golpista faz empréstimos consignados no nome da vítima.

**O que este conteúdo acrescenta aos outros dois:**

| Conteúdo         | Dado que o golpista quer        |
| ---------------- | ------------------------------- |
| Gerente do banco | Código e senha                  |
| SMS da Operadora | Dados do cartão                 |
| Mensagem do INSS | Foto do documento, selfie e CPF |

Ele também usa o termo "Dados vazados", que estava no glossário sem aparecer em nenhum texto: saber o nome e o CPF da pessoa **não prova** que o contato é verdadeiro.

## 2. Escopo

**Dentro do escopo**

- Dados do conteúdo em `src/data/conteudos/mensagem-inss.js` (novo nome de `protecao-de-dados.js`).
- Glossário: INSS, Empréstimo consignado, Selfie e Prova de vida.
- `plataforma.md`: lista de conteúdos e referências.

**Fora do escopo**

- Página falsa no celular (como no SMS da Operadora). Ela exigiria um print do site do governo; a opção do link continua a conversa, como no gerente do banco. Pode ser acrescentada depois só com dados (campo `pagina` da opção) e o print.
- Componentes novos: o conteúdo usa os mesmos componentes dos outros dois.

## 3. Fatos usados nos textos

Conferidos em fontes oficiais em 18/11/2026:

- A **prova de vida** é feita, na maioria das vezes, pelo próprio INSS, cruzando informações do governo; aposentados e pensionistas não precisam ir ao banco ([Secom, 03/2025](https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2025/03/aposentados-e-pensionistas-nao-precisam-ir-ao-banco-para-fazer-prova-de-vida)).
- O INSS **pode mandar avisos** (inclusive por WhatsApp oficial), mas **não pede** documento, foto ou senha por mensagem. Golpistas também fingem ligar da Central 135 ([INSS: "É fake! Golpistas se passam pela Central 135"](https://www.gov.br/inss/pt-br/assuntos/e-fake-golpistas-se-passam-pela-central-135-para-enganar-segurados-sobre-a-prova-de-vida)).

Por isso os textos dizem "o INSS **não pede**…" (e não "o INSS nunca manda mensagem") e "**ligue você** para o 135" (e não "atenda a ligação do 135"). O custo da ligação para o 135 não é citado, porque depende de onde se liga.

## 4. Conteúdo

| Campo         | Texto                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Título        | Mensagem do INSS (mesmo padrão de "Mensagem de Gerente do Banco")                                                                                                   |
| Resumo (Home) | Pedindo foto do documento? Desconfie.                                                                                                                               |
| Ícone e cor   | `badge` (documento de identidade), sálvia (a cor de "Proteção de dados")                                                                                            |
| Manchete      | **Não mande foto do documento por mensagem**                                                                                                                        |
| Introdução    | Golpistas mandam mensagem **fingindo ser do [[INSS]]**. Eles ameaçam bloquear a aposentadoria e pedem fotos dos seus documentos para fazer empréstimos no seu nome. |

**Conversa no celular** (contato "INSS Atendimento", "online", ícone padrão de prédio):

1. Bom dia, Sra. Maria! Aqui é do INSS. Seu CPF termina em 45, certo?
2. Seu cadastro está desatualizado. Se não atualizar HOJE, sua aposentadoria será BLOQUEADA.
3. (Você) Meu Deus! O que eu faço?
4. Mande uma foto do seu documento, frente e verso, e uma selfie segurando ele.

O CPF aparece pelo final ("termina em 45"), e não com asteriscos, para a pessoa entender sem esforço que o golpista **já sabe** o número.

**Sinais de alerta**

| Ícone           | Título                  | Frase                                                                               |
| --------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| `timer`         | Ameaça e pressa         | "Sua aposentadoria será bloqueada HOJE!"                                            |
| `photo_camera`  | Pede documento e selfie | Com a foto do documento e a [[selfie]], o golpista faz [[empréstimos]] no seu nome. |
| `person_search` | Sabe seus dados         | Saber seu nome e CPF **não prova nada**: eles podem ter sido [[vazados]].           |

**Como se proteger:** Seus documentos são como a chave da sua casa: **não entregue a estranhos**.

- **Não mande** foto de documento nem [[selfie]] por mensagem
- **Não passe** CPF, senhas ou códigos
- **Ligue você** para o [[INSS]], no **135**
- **Peça ajuda** a alguém de confiança antes de responder

As atitudes certas não dependem de tecnologia (ligar, perguntar a alguém): o público tem pouca familiaridade com aplicativos, então o conteúdo não manda abrir o Meu INSS.

## 5. Roteiro do simulado

### Cenário 1: a prova de vida "vencida"

**Mensagens no celular:**

1. Boa tarde, Sr. José! Aqui é do INSS.
2. Sua prova de vida está VENCIDA. Se não fizer hoje, o pagamento da sua aposentadoria será SUSPENSO.
3. Mande agora uma foto do seu documento e uma selfie. Ou faça pelo site: provadevida-inss.exemplo

**Pergunta:** O que você faz?

| Opção                                                    | Certa?  | O que acontece                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Não mando nada e ligo eu mesmo para o INSS, no 135       | **Sim** | Você não caiu na ameaça e confirmou pelo caminho seguro. **O [[INSS]] não pede documento nem [[selfie]] por mensagem.**                                                                                                                                                                                       |
| Mando as fotos rápido para não ficar sem a aposentadoria | Não     | A conversa continua: a pessoa manda as fotos e o golpista diz que a prova de vida foi concluída. Explicação: Calma, esse medo é muito comum. Mas **o [[INSS]] não pede documento nem [[selfie]] por mensagem**. E hoje a [[prova de vida]] costuma ser feita pelo próprio INSS, sem você precisar fazer nada. |
| Toco no link para fazer a prova de vida pelo site        | Não     | A conversa continua: a pessoa conta que preencheu o site com o CPF, o documento e a selfie, e o golpista diz que está tudo certo. Explicação: Entendemos a vontade de resolver logo, mas **o [[link]] leva a uma página falsa**, que imita o site do governo. Ela pede as mesmas fotos e o seu CPF.           |

A certa fica em primeiro (no gerente do banco, ela fica no meio; no SMS, por último), para a pessoa não decorar a posição.

### Cenário 2: depois de passar os dados (só depois de um erro)

**Contexto:** Veja no celular: o golpista diz que está tudo certo, mas **ficou com a foto do seu documento e a sua [[selfie]]**. Com elas, ele pode fazer [[empréstimos]] no seu nome.

**Pergunta:** Você já passou seus dados. E agora, o que fazer?

| Opção                                                                                               | Certa?  | Explicação                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fico tranquilo, afinal o atendente disse que está tudo certo                                        | Não     | O "tudo certo" é para você não desconfiar. Os [[empréstimos]] feitos no seu nome **só aparecem depois**, descontados da aposentadoria.                                                           |
| Ligo para o INSS, no 135, e para o meu banco, conto o que aconteceu e faço um boletim de ocorrência | **Sim** | Agir rápido diminui o prejuízo: avisar logo o INSS e o banco ajuda a **impedir empréstimos no seu nome**. Faça também o [[boletim de ocorrência]] e, se precisar de ajuda, procure o Disque 100. |
| Apago a conversa e não conto para ninguém, por vergonha                                             | Não     | **Não precisa sentir vergonha**: golpes enganam muita gente. E não apague nada: a conversa ajuda a provar o golpe para o banco e para a polícia.                                                 |

A terceira opção ensina a **guardar as provas**, como orienta o fascículo "Golpes: Caiu? Veja o que Fazer" do CERT.br. O fluxo (acerto, erro, cenário 2, conclusão só ao acertar de primeira) é o mesmo do [plano 04](04-simulado-gerente-banco.md).

## 6. Glossário

Termos novos, em linguagem simples e sem outros termos técnicos:

| Termo                 | id              | Explicação                                                                                                                                                                           |
| --------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| INSS                  | `inss`          | Instituto Nacional do Seguro Social, o órgão do governo que paga as aposentadorias e pensões. Ele não pede documento, foto nem senha por mensagem.                                   |
| Empréstimo consignado | `consignado`    | Empréstimo pago com descontos todo mês, direto na aposentadoria ou no salário. Com seus documentos e uma foto do seu rosto, golpistas conseguem fazer um no seu nome.                |
| Selfie                | `selfie`        | Foto do próprio rosto, tirada com a câmera do celular. Bancos e o governo usam a selfie para confirmar que é você mesmo.                                                             |
| Prova de vida         | `prova-de-vida` | Confirmação de que o aposentado continua vivo, para o pagamento não parar. Hoje, na maioria das vezes, o próprio governo faz essa confirmação sozinho, sem você precisar fazer nada. |

"Dados vazados" (`dados-vazados`) passa a ter lupa no sinal "Sabe seus dados".

## 7. Arquivos

| Arquivo                               | Ação     | Descrição                                                |
| ------------------------------------- | -------- | -------------------------------------------------------- |
| `src/data/conteudos/mensagem-inss.js` | renomear | Novo nome de `protecao-de-dados.js`, com texto e roteiro |
| `src/data/conteudos/index.js`         | ajustar  | Registro do conteúdo                                     |
| `src/data/glossario.js`               | ajustar  | 4 termos novos                                           |
| `src/pages/index/glossario.vue`       | ajustar  | Comentário que citava "8 itens"                          |
| `docs/plataforma.md`                  | ajustar  | Lista de conteúdos e referências do INSS                 |

## 8. Pontos de atenção

- O id antigo (`protecao-de-dados`) nunca pôde ser concluído (a página era "Em construção"), então nenhum progresso salvo se perde.
- **INSS real no texto:** diferente da operadora, o INSS é citado pelo nome, porque o golpe depende disso e o próprio órgão divulga alertas sobre ele. Nenhum logotipo ou print do governo é usado.
- **Prazos e regras do INSS mudam:** os textos evitam prazos e passos de aplicativo, e falam só do que é estável (o INSS não pede documento por mensagem; ligue você para o 135).

## 9. Critérios de aceite

- [x] A Home mostra o card "Mensagem do INSS" (ícone de documento, sálvia) no lugar de "Proteção de dados".
- [x] A página `/conteudo/mensagem-inss` mostra o celular com a conversa, os 3 sinais, a manchete, a introdução, "Como se proteger" e "Onde pedir ajuda".
- [x] As lupas de INSS, selfie, empréstimo consignado e dados vazados abrem a explicação.
- [x] O simulado mostra a conversa e 3 opções; acertar de primeira conclui o conteúdo.
- [x] Mandar as fotos ou tocar no link continua a conversa e leva ao cenário 2.
- [x] No cenário 2, a errada fica marcada; a certa mostra "Isso mesmo!" sem concluir, e "Tentar de novo" volta à conversa.
- [x] A página Glossário lista os 12 termos em ordem alfabética.
- [x] Sem erros no console e sem rolagem horizontal em 1280px e 390px.

## 10. Validação (18/11/2026)

Feita com o Playwright em 1280×800 e 390×844.

**Primeira rodada: 1 problema**

1. Na página do conteúdo, a conversa do celular passava 26px da tela: a última mensagem ficava cortada na borda (no gerente do banco, a conversa cabe exatamente). **Correção:** mensagens 1 e 4 encurtadas ("Sra. Maria", sem "Aparecida"; "Mande uma foto…", sem "É simples:"), sem mudar o sentido.

**Revalidação**

- Home: card "Mensagem do INSS" com o ícone de documento e a mancha sálvia; depois do acerto, selo "Concluído" na página do conteúdo.
- Conteúdo: celular ao lado dos sinais no desktop e em coluna no celular, leitura de 2 minutos. A lupa "selfie" abre a explicação; as outras (INSS, empréstimos, vazados, prova de vida) foram conferidas por script: todos os ids marcados existem no glossário.
- Mandar as fotos (B): caixa âmbar, a conversa continua com 2 balões ("Pronto, mandei…" e a falsa "Prova de vida concluída") e aparece o cenário 2.
- Tocar no link (C), em 390px: mesma continuação, com a mensagem do site, e o cenário 2.
- Cenário 2: depois da errada, a certa mostra "Isso mesmo!" sem concluir; "Tentar o simulado de novo" volta à conversa.
- Acerto direto (A): "Parabéns!", selo "Concluído" e progresso salvo (`mensagem-inss`).
- Glossário: 12 termos em ordem alfabética, de "Aplicativo oficial" a "SMS".
- Console sem erros nem avisos, sem rolagem horizontal nos dois tamanhos.

**Pendente (decisão do usuário)**

- A conversa da página do conteúdo ainda passa **3px** da tela (433 de 430). Todo o texto fica visível, mas aparece uma barra de rolagem fina dentro do celular. Impacto: só visual. Opções: (a) encurtar também a mensagem 2 (ex.: "a aposentadoria" no lugar de "sua aposentadoria") ou (b) manter como está.
