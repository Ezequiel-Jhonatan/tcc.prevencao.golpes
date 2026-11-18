# Plataforma de prevenção a golpes para pessoas idosas

Especificação funcional da plataforma: o que ela contém, suas regras de negócio e as diretrizes de acessibilidade e de linguagem. Este documento é a fonte de verdade sobre o produto e deve ser atualizado sempre que uma regra mudar.

## Visão geral

Plataforma web educativa (TCC) para prevenção de golpes aplicados por aplicativos de mensagem (WhatsApp, Telegram etc.) contra pessoas idosas.

- Funciona em desktop, tablet e celular.
- Todo o conteúdo e a interface são em português do Brasil.
- **O projeto deve continuar simples**: não tem servidor (backend) nem login, e cada nova biblioteca precisa ter um motivo claro.

## Páginas e funcionalidades

### Home

- Grade de cards, um para cada conteúdo (golpe).
- Cada card tem identidade visual própria (cor, ícone ou ilustração), para que os conteúdos sejam fáceis de diferenciar.
- Saudação e texto de boas-vindas em letra grande, seguidos de uma **instrução**: cada card é um tipo de golpe, e é só tocar ou clicar para começar.
- ~~Barra de progresso~~: **suspensa por orientação do orientador (16/11/2026)**. O progresso continua sendo salvo e aparece nos cards.
- O card de um conteúdo **ainda não concluído** é claro (cinza quente), com a cor de identidade só na mancha atrás do ícone e o convite "Começar ›".
- O card de um conteúdo **concluído** ganha a cor de identidade cheia e o selo "Concluído". Ou seja, colorido significa "feito".
- Um card específico leva ao **Glossário**.
- Um card específico leva à página **"Caí num golpe, e agora?"**.

### Página de conteúdo

- Leitura **curta e visual, de 1 a 2 minutos**: o texto é resumido ao essencial e organizado em cards.
- Ilustração em formato de **celular** mostrando a conversa do golpe.
- **No desktop, a ilustração e o texto ficam lado a lado**, para o usuário ver os dois ao mesmo tempo (disposição em [exemplo_orientador.html](exemplos/exemplo_orientador.html)). No celular e no tablet em pé, tudo fica em uma coluna.
- Termos técnicos, gírias ou palavras pouco conhecidas aparecem marcados com uma **lupa**. Ao tocar nela, abre uma janela (dialog) com a explicação do termo.
- No final, um botão inicia o **simulado**.

### Simulado

- Mostra um celular com uma conversa nova do mesmo tipo de golpe e, junto, **3 opções de atitude** (1 certa e 2 erradas). No desktop, as opções ficam ao lado do celular; no celular, abaixo.
- **Acertou**: a plataforma parabeniza o usuário e marca o conteúdo como concluído.
- **Errou**: uma caixa de retorno (que não some sozinha) conforta o usuário, com tom acolhedor e sem culpar, e explica por que não foi uma boa escolha. O título é "Há uma opção mais segura", e a cor é um **âmbar suave**, nunca vermelho, que transmite falha e desanima o público idoso. A conversa no celular continua, mostrando o que aconteceria, e vem um **cenário novo**: "Você já passou seus dados. E agora, o que fazer?", com outras 3 opções.
- No cenário novo, a opção errada fica marcada e o usuário tenta de novo. Ao acertar, é elogiado, mas **o conteúdo não é concluído**: ele é convidado a refazer o simulado e acertar logo na primeira pergunta.
- Quando a opção errada é **tocar num link**, o celular pode trocar a conversa pela **página falsa** que abriria: o print do site imitado, com o pedido do golpe por cima em texto de verdade e a legenda dizendo que a página é falsa ([plano 05](planos/05-sms-operadora.md)).
- O roteiro de cada simulado é definido como dados no conteúdo ([plano 04](planos/04-simulado-gerente-banco.md)).

### Glossário

- Lista de termos técnicos, gírias e palavras incomuns para pessoas idosas, com explicação simples, em **ordem alfabética** ([plano 06](planos/06-glossario.md)).
- É a **mesma fonte** usada pelas lupas dos conteúdos, então a explicação de um termo é sempre igual nos dois lugares. Toda palavra marcada com a lupa num conteúdo aparece na lista.

### Caí num golpe, e agora?

- Orientações do que fazer depois de cair em um golpe, baseadas no fascículo "Golpes: Caiu? Veja o que Fazer" do CERT.br.
- Segue as mesmas regras de linguagem e acessibilidade dos conteúdos, com tom especialmente acolhedor.
- Inclui os contatos de ajuda (Disque 100, WhatsApp do Disque Direitos Humanos, 190 / delegacia).
- Não tem simulado e não conta no progresso.

## Regras de negócio

| Regra              | Descrição                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Conteúdo concluído | O usuário **acertou o simulado na primeira pergunta** ou **confirmou manualmente** a conclusão.                                                  |
| Progresso          | Quantidade de conteúdos concluídos sobre o total de conteúdos.                                                                                   |
| Armazenamento      | O progresso fica salvo **no navegador do aparelho**. Ele não passa de um aparelho para outro e se perde se os dados do navegador forem apagados. |
| Glossário          | Fonte única de definições, usada pela página Glossário e pelas lupas.                                                                            |
| Novos conteúdos    | Cada conteúdo é cadastrado como dados (texto, imagens, termos, simulado). Adicionar um golpe novo não exige criar uma página nova.               |

## Acessibilidade

Os valores abaixo seguem as recomendações da WCAG (diretrizes internacionais de acessibilidade na web).

- **Fonte**: texto com no mínimo 18–20px, títulos maiores e espaçamento entre linhas confortável (~1,5). O zoom do navegador deve continuar funcionando.
- **Contraste**: texto com contraste mínimo de 4,5:1 com o fundo (nível AA). A cor nunca é o único sinal: um card concluído mostra cor **e** ícone/texto "Concluído".
- **Toque**: botões e áreas clicáveis de no mínimo 48×48px, com espaço entre eles para evitar toques errados.
- **Interação**: nada depende de passar o mouse por cima; botões têm texto (não só ícone); é possível navegar pelo teclado; todas as imagens têm descrição alternativa.
- **Ritmo**: sem tempo limite no simulado, sem animações rápidas e sem janelas que abrem sozinhas.

## Linguagem e estrutura dos conteúdos

- Falar diretamente com o leitor usando **"você"**, com frases curtas e voz ativa.
- **Tom acolhedor e sem culpa**: a vítima nunca é tratada como ingênua.
- Chamadas curtas, no imperativo e fáceis de lembrar, como "Desconfie. Informe-se. Verifique." e "Confirme primeiro, transfira depois". Ditados populares ajudam ("quando a esmola é demais, o santo desconfia").
- Siglas e termos em inglês (Pix, link, QR Code, token, consignado…) só aparecem acompanhados da lupa do glossário.

Cada conteúdo segue esta estrutura:

1. **Conversa no celular**: mostra como o golpe acontece (quem entra em contato, o que diz, o que pede). Substitui o texto "como o golpe funciona".
2. **Sinais de alerta**: exatamente **3 cards pequenos** (ícone, título curto e uma frase), por exemplo pressa, pedido de dinheiro/código/dados ou número novo.
3. **Manchete e introdução**: uma frase imperativa fácil de lembrar e no máximo 2 frases de introdução.
4. **Como se proteger**: card grande com uma frase e até 4 ações curtas.
5. **Onde pedir ajuda**: card grande com Disque 100 (ligação gratuita), WhatsApp do Disque Direitos Humanos (61) 99611-0100 e 190 / delegacia.
6. **Simulado**.

## Conteúdos

**Na plataforma:**

- **Mensagem de Gerente do Banco**: texto completo e resumido ([plano 02](planos/02-conteudo-gerente-banco.md), ajustado pelo [plano 03](planos/03-ajustes-orientador.md))
- **SMS da Operadora**: pontos do programa de fidelidade "vencendo hoje" e página falsa que cobra frete no cartão; texto e simulado ([plano 05](planos/05-sms-operadora.md)). Substituiu "Evite ser enganado".
- **Mensagem do INSS**: falso atendente ameaça bloquear a aposentadoria e pede foto do documento e uma selfie, usadas para fazer empréstimos no nome da vítima; texto e simulado ([plano 07](planos/07-mensagem-inss.md)). Substituiu "Proteção de dados": o tema continua, contado por um golpe concreto.

**Candidatos** (golpes por aplicativo de mensagem citados nas referências):

- WhatsApp clonado / pedido do código de verificação
- Falso parente com número novo pedindo dinheiro
- Falso namorado(a) pela internet
- Links falsos (encomenda retida, CPF cancelado, prêmio)
- Pix recebido "por engano"
- Áudio e vídeo falsos feitos com inteligência artificial
- Boleto e QR Code falsos enviados por mensagem

## Decisões em aberto

- [x] Contatos de ajuda (Disque 100, 190) fixos em todos os conteúdos: **mantido**.
- [x] Página "Caí num golpe, e agora?", baseada no fascículo do CERT.br: **incluída**.
- [ ] Definir a lista final de conteúdos.

## Referências

- Ministério dos Direitos Humanos e da Cidadania. _Cartilha de Apoio à Pessoa Idosa: enfrentamento à violência patrimonial e financeira_, 2024. https://www.gov.br/mdh/pt-br/assuntos/noticias/2024/outubro/saiba-como-prevenir-a-violencia-patrimonial-e-financeira-contra-pessoas-idosas/cartilha_violencia_patrimonial_pessoa_idosa_2024.pdf
- CERT.br. _Fascículos da Cartilha de Segurança para Internet_, especialmente "Golpes: Não se Deixe Enganar", "Golpes: Evite Fraudes" e "Golpes: Caiu? Veja o que Fazer". https://cartilha.cert.br/fasciculos/
- Secretaria de Comunicação Social (Secom). _Aposentados e pensionistas não precisam ir ao banco para fazer prova de vida_, 2025. https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2025/03/aposentados-e-pensionistas-nao-precisam-ir-ao-banco-para-fazer-prova-de-vida
- INSS. _É fake! Golpistas se passam pela Central 135 para enganar segurados sobre a Prova de Vida_. https://www.gov.br/inss/pt-br/assuntos/e-fake-golpistas-se-passam-pela-central-135-para-enganar-segurados-sobre-a-prova-de-vida
