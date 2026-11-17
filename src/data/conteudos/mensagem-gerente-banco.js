/**
 * Conteúdo: golpe da mensagem do falso gerente do banco.
 * Texto resumido aprovado em docs/planos/03-ajustes-orientador.md (seção 4).
 *
 * Marcação usada nos textos (interpretada pelo componente TextoRico):
 * - **negrito**
 * - [[id-do-termo|texto exibido]] → palavra com a lupa do glossário
 */
export default {
  id: 'mensagem-gerente-banco',
  titulo: 'Mensagem de Gerente do Banco',
  resumo: 'Gerente pedindo código ou Pix? Desconfie.',
  icone: 'support_agent',
  cor: 'azul',

  manchete: 'Gerente de verdade não pede código',

  introducao:
    'Golpistas mandam mensagem no WhatsApp **fingindo ser o gerente do seu banco**. Eles inventam um problema urgente para você agir sem pensar.',

  // Conversa exibida no celular ilustrado (componente CelularConversa).
  // Ela conta a história do golpe, por isso o texto não repete a história.
  ilustracao: {
    legenda: 'Exemplo de conversa de um falso gerente de banco',
    contato: { nome: 'Gerente Carlos', status: 'online' },
    mensagens: [
      {
        de: 'golpista',
        texto: 'Bom dia, Sra. Maria! Aqui é o Carlos, seu gerente do banco.'
      },
      {
        de: 'golpista',
        texto:
          'Identificamos uma compra de R$ 2.450,00 no seu cartão. Foi a senhora?'
      },
      { de: 'vitima', texto: 'Não fui eu!' },
      {
        de: 'golpista',
        texto:
          'Calma, eu resolvo agora. Vai chegar um código por SMS. Me passa ele, é URGENTE!'
      }
    ]
  },

  // Sinais de alerta: exatamente 3, exibidos como cards pequenos (CardSinal)
  sinais: [
    {
      icone: 'timer',
      titulo: 'Pressa',
      texto: '"É urgente! Sua conta vai ser bloqueada."'
    },
    {
      icone: 'password',
      titulo: 'Pede código, senha ou Pix',
      texto:
        'O banco **nunca** pede [[codigo-verificacao|código]] ou [[pix|Pix]] por mensagem.'
    },
    {
      icone: 'person_off',
      titulo: 'Número desconhecido',
      texto: 'Mesmo com a foto e o nome do banco.'
    }
  ],

  // Card grande "Como se proteger": uma frase e uma lista curta
  protecao: {
    texto: 'Na dúvida, **não faça nada** e converse com alguém de confiança.',
    itens: [
      { texto: '**Não passe** códigos nem senhas' },
      { texto: '**Não faça [[pix|Pix]]** para "conta de segurança"' },
      { texto: '**Não toque** em [[link|links]] da conversa' },
      {
        texto:
          '**Desligue e ligue você** para o banco, pelo número do verso do cartão'
      }
    ]
  },

  // Simulado (roteiro aprovado em docs/planos/04-simulado-gerente-banco.md).
  // Formato descrito em src/data/conteudos/index.js.
  simulado: {
    contato: { nome: 'Gerente Carlos', status: 'online' },
    inicio: 'oferta',
    etapas: {
      oferta: {
        mensagens: [
          {
            de: 'golpista',
            texto: 'Boa tarde, Sr. José! Aqui é o Carlos, seu gerente do banco.'
          },
          {
            de: 'golpista',
            texto:
              'O senhor foi escolhido para um crédito de R$ 20.000,00 com juros de só 0,19% ao mês!'
          },
          {
            de: 'golpista',
            texto: 'É uma OFERTA RELÂMPAGO: só vale nos próximos 30 minutos.'
          },
          {
            de: 'golpista',
            texto:
              'Para garantir, me mande agora seu CPF, a senha do cartão e o código que vai chegar por SMS. Ou faça o cadastro aqui: cadastro-credito.exemplo'
          }
        ],
        pergunta: 'O que você faz?',
        // A certa fica no meio, para não ser sempre a primeira.
        opcoes: [
          {
            texto: 'Mando os dados rápido para não perder a oferta',
            correta: false,
            explicacao:
              'Calma, isso acontece com muita gente. Mas **banco nenhum pede senha ou [[codigo-verificacao|código]] por mensagem**. A "oferta relâmpago" serve para você não ter tempo de pensar.',
            proxima: 'depois-dos-dados',
            mensagensExtras: [
              {
                de: 'vitima',
                texto:
                  'Meu CPF é ***.***.***-**, a senha é **** e o código é ******.'
              },
              {
                de: 'golpista',
                texto:
                  'Pronto, Sr. José! Agora é só pagar a taxa de liberação de R$ 390,00 por Pix que o dinheiro cai hoje.'
              }
            ]
          },
          {
            texto:
              'Não respondo e ligo para o banco pelo número do verso do cartão',
            correta: true,
            explicacao:
              'Você não caiu na pressa, não passou nenhum dado e confirmou direto com o banco. **Juros baixos demais e prazo curto são sinais de golpe.**'
          },
          {
            texto: 'Toco no link para fazer o cadastro com calma',
            correta: false,
            explicacao:
              'Entendemos a vontade de resolver, mas **o [[link|link]] leva a uma página falsa**, feita para roubar seus dados. O banco de verdade não manda link para liberar crédito.',
            proxima: 'depois-dos-dados',
            mensagensExtras: [
              {
                de: 'vitima',
                texto: 'Pronto, preenchi o cadastro com os meus dados.'
              },
              {
                de: 'golpista',
                texto:
                  'Pronto, Sr. José! Agora é só pagar a taxa de liberação de R$ 390,00 por Pix que o dinheiro cai hoje.'
              }
            ]
          }
        ]
      },

      'depois-dos-dados': {
        contexto:
          'Veja no celular: depois dos seus dados, o golpista pediu uma **taxa de liberação** por [[pix|Pix]].',
        pergunta: 'Você já passou seus dados. E agora, o que fazer?',
        opcoes: [
          {
            texto: 'Pago a taxa para finalmente receber o crédito',
            correta: false,
            explicacao:
              'Essa taxa é **mais um golpe**. O crédito não existe: quem pede dinheiro adiantado para liberar empréstimo é golpista.'
          },
          {
            texto: 'Fico quieto e espero para ver se acontece alguma coisa',
            correta: false,
            explicacao:
              '**Cada minuto conta**: o golpista pode usar seus dados agora mesmo. E não precisa sentir vergonha: golpes enganam muita gente.'
          },
          {
            texto:
              'Ligo na hora para o banco, peço para bloquear o cartão e a conta, troco as senhas e faço um boletim de ocorrência',
            correta: true,
            explicacao:
              'Agir rápido diminui o prejuízo. Ligue para o banco e faça o [[boletim-ocorrencia|boletim de ocorrência]]. Se precisar de ajuda, procure o Disque 100.'
          }
        ]
      }
    }
  }
}
