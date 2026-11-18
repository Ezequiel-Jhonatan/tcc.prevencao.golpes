/**
 * Conteúdo: golpe da mensagem do falso atendente do INSS, que ameaça
 * bloquear a aposentadoria e pede foto do documento e uma selfie.
 * Substituiu "Proteção de dados": o tema continua, contado por um golpe.
 * Texto e roteiro em docs/planos/07-mensagem-inss.md.
 *
 * Marcação usada nos textos (interpretada pelo componente TextoRico):
 * - **negrito**
 * - [[id-do-termo|texto exibido]] → palavra com a lupa do glossário
 */

// Sem `icone`: o avatar usa o prédio padrão, que serve para órgão público.
const CONTATO_INSS = { nome: 'INSS Atendimento', status: 'online' }

// Resposta do golpista depois que a pessoa manda os dados (pelas fotos ou
// pelo site): o "tudo certo" é para ela não desconfiar.
const CONCLUSAO_FALSA = {
  de: 'golpista',
  texto: 'Prova de vida concluída, Sr. José! Sua aposentadoria está liberada.'
}

export default {
  id: 'mensagem-inss',
  titulo: 'Mensagem do INSS',
  resumo: 'Pedindo foto do documento? Desconfie.',
  icone: 'badge',
  cor: 'salvia',

  manchete: 'Não mande foto do documento por mensagem',

  introducao:
    'Golpistas mandam mensagem **fingindo ser do [[inss|INSS]]**. Eles ameaçam bloquear a aposentadoria e pedem fotos dos seus documentos para fazer empréstimos no seu nome.',

  // Conversa exibida no celular ilustrado (componente CelularConversa).
  ilustracao: {
    legenda: 'Exemplo de conversa de um falso atendente do INSS',
    contato: CONTATO_INSS,
    mensagens: [
      {
        de: 'golpista',
        // O final do CPF, e não asteriscos: fica claro que o golpista já
        // sabe o número (ver o sinal "Sabe seus dados").
        texto:
          'Bom dia, Sra. Maria! Aqui é do INSS. Seu CPF termina em 45, certo?'
      },
      {
        de: 'golpista',
        texto:
          'Seu cadastro está desatualizado. Se não atualizar HOJE, sua aposentadoria será BLOQUEADA.'
      },
      { de: 'vitima', texto: 'Meu Deus! O que eu faço?' },
      {
        de: 'golpista',
        texto:
          'Mande uma foto do seu documento, frente e verso, e uma selfie segurando ele.'
      }
    ]
  },

  // Sinais de alerta: exatamente 3, exibidos como cards pequenos (CardSinal)
  sinais: [
    {
      icone: 'timer',
      titulo: 'Ameaça e pressa',
      texto: '"Sua aposentadoria será bloqueada HOJE!"'
    },
    {
      icone: 'photo_camera',
      titulo: 'Pede documento e selfie',
      texto:
        'Com a foto do documento e a [[selfie|selfie]], o golpista faz [[consignado|empréstimos]] no seu nome.'
    },
    {
      icone: 'person_search',
      titulo: 'Sabe seus dados',
      texto:
        'Saber seu nome e CPF **não prova nada**: eles podem ter sido [[dados-vazados|vazados]].'
    }
  ],

  // Card grande "Como se proteger": uma frase e uma lista curta.
  // As atitudes não dependem de aplicativo (ligar, perguntar a alguém).
  protecao: {
    texto:
      'Seus documentos são como a chave da sua casa: **não entregue a estranhos**.',
    itens: [
      {
        texto:
          '**Não mande** foto de documento nem [[selfie|selfie]] por mensagem'
      },
      { texto: '**Não passe** CPF, senhas ou códigos' },
      // "Você" em destaque: golpistas também fingem ligar da Central 135
      { texto: '**Ligue você** para o [[inss|INSS]], no **135**' },
      { texto: '**Peça ajuda** a alguém de confiança antes de responder' }
    ]
  },

  // Simulado (roteiro em docs/planos/07-mensagem-inss.md).
  // Formato descrito em src/data/conteudos/index.js.
  simulado: {
    contato: CONTATO_INSS,
    inicio: 'prova-de-vida',
    etapas: {
      'prova-de-vida': {
        mensagens: [
          { de: 'golpista', texto: 'Boa tarde, Sr. José! Aqui é do INSS.' },
          {
            de: 'golpista',
            texto:
              'Sua prova de vida está VENCIDA. Se não fizer hoje, o pagamento da sua aposentadoria será SUSPENSO.'
          },
          {
            de: 'golpista',
            texto:
              'Mande agora uma foto do seu documento e uma selfie. Ou faça pelo site: provadevida-inss.exemplo'
          }
        ],
        pergunta: 'O que você faz?',
        // A certa fica em primeiro (no gerente do banco, no meio; no SMS,
        // por último), para a pessoa não decorar a posição.
        opcoes: [
          {
            texto: 'Não mando nada e ligo eu mesmo para o INSS, no 135',
            correta: true,
            explicacao:
              'Você não caiu na ameaça e confirmou pelo caminho seguro. **O [[inss|INSS]] não pede documento nem [[selfie|selfie]] por mensagem.**'
          },
          {
            texto: 'Mando as fotos rápido para não ficar sem a aposentadoria',
            correta: false,
            explicacao:
              'Calma, esse medo é muito comum. Mas **o [[inss|INSS]] não pede documento nem [[selfie|selfie]] por mensagem**. E hoje a [[prova-de-vida|prova de vida]] costuma ser feita pelo próprio INSS, sem você precisar fazer nada.',
            proxima: 'depois-dos-dados',
            mensagensExtras: [
              {
                de: 'vitima',
                texto: 'Pronto, mandei a foto do documento e a selfie.'
              },
              CONCLUSAO_FALSA
            ]
          },
          {
            texto: 'Toco no link para fazer a prova de vida pelo site',
            correta: false,
            explicacao:
              'Entendemos a vontade de resolver logo, mas **o [[link|link]] leva a uma página falsa**, que imita o site do governo. Ela pede as mesmas fotos e o seu CPF.',
            proxima: 'depois-dos-dados',
            mensagensExtras: [
              {
                de: 'vitima',
                texto:
                  'Pronto, fiz pelo site: coloquei meu CPF, a foto do documento e a selfie.'
              },
              CONCLUSAO_FALSA
            ]
          }
        ]
      },

      'depois-dos-dados': {
        contexto:
          'Veja no celular: o golpista diz que está tudo certo, mas **ficou com a foto do seu documento e a sua [[selfie|selfie]]**. Com elas, ele pode fazer [[consignado|empréstimos]] no seu nome.',
        pergunta: 'Você já passou seus dados. E agora, o que fazer?',
        opcoes: [
          {
            texto:
              'Fico tranquilo, afinal o atendente disse que está tudo certo',
            correta: false,
            explicacao:
              'O "tudo certo" é para você não desconfiar. Os [[consignado|empréstimos]] feitos no seu nome **só aparecem depois**, descontados da aposentadoria.'
          },
          {
            texto:
              'Ligo para o INSS, no 135, e para o meu banco, conto o que aconteceu e faço um boletim de ocorrência',
            correta: true,
            explicacao:
              'Agir rápido diminui o prejuízo: avisar logo o INSS e o banco ajuda a **impedir empréstimos no seu nome**. Faça também o [[boletim-ocorrencia|boletim de ocorrência]] e, se precisar de ajuda, procure o Disque 100.'
          },
          {
            // Ensina a guardar as provas (CERT.br, "Golpes: Caiu? Veja o
            // que Fazer") e tira a culpa de quem caiu.
            texto: 'Apago a conversa e não conto para ninguém, por vergonha',
            correta: false,
            explicacao:
              '**Não precisa sentir vergonha**: golpes enganam muita gente. E não apague nada: a conversa ajuda a provar o golpe para o banco e para a polícia.'
          }
        ]
      }
    }
  }
}
