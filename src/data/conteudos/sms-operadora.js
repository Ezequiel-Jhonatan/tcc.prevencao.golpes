/**
 * Conteúdo: golpe do SMS da operadora (pontos do programa de fidelidade
 * "vencendo hoje" e página falsa que cobra um frete no cartão).
 * Texto e roteiro em docs/planos/05-sms-operadora.md.
 *
 * Marcação usada nos textos (interpretada pelo componente TextoRico):
 * - **negrito**
 * - [[id-do-termo|texto exibido]] → palavra com a lupa do glossário
 */
import imagemSiteOperadora from '@/assets/simulados/sms-operadora-site.jpg'

// Contato do SMS: o golpista usa o nome da operadora como remetente.
const CONTATO_SMS = {
  nome: 'OPERADORA',
  status: 'Mensagem de texto',
  icone: 'signal_cellular_alt'
}

export default {
  id: 'sms-operadora',
  titulo: 'SMS da Operadora',
  resumo: 'Pontos vencendo hoje? Desconfie do link.',
  icone: 'sms',
  cor: 'laranja',

  manchete: 'Não toque no link do SMS',

  introducao:
    'Golpistas mandam [[sms|SMS]] **fingindo ser a sua operadora de celular**. O [[link|link]] abre uma página falsa, igual ao site da operadora, que pede os dados do cartão para pagar o "frete" de um prêmio.',

  // Conversa exibida no celular ilustrado (componente CelularConversa).
  ilustracao: {
    legenda: 'Exemplo de SMS falso de uma operadora de celular',
    contato: CONTATO_SMS,
    mensagens: [
      {
        de: 'golpista',
        texto:
          'Olá! Você tem 3.200 pontos acumulados no programa de fidelidade.'
      },
      {
        de: 'golpista',
        texto: 'ATENÇÃO: seus pontos VENCEM HOJE!'
      },
      {
        de: 'golpista',
        texto:
          'Troque agora por um fone de ouvido sem fio: pontos-operadora.exemplo'
      }
    ]
  },

  // Sinais de alerta: exatamente 3, exibidos como cards pequenos (CardSinal)
  sinais: [
    {
      icone: 'timer',
      titulo: 'Pressa',
      texto:
        '"Seus pontos do [[programa-fidelidade|programa de fidelidade]] vencem HOJE!"'
    },
    {
      icone: 'link',
      titulo: 'Link na mensagem',
      texto:
        'O [[link|link]] abre uma página falsa, **igual ao site** da operadora.'
    },
    {
      icone: 'credit_card',
      titulo: 'Cobra frete',
      texto: 'Pede os dados do cartão para **pagar a entrega** do prêmio.'
    }
  ],

  // Card grande "Como se proteger": uma frase e uma lista curta
  protecao: {
    texto:
      'Quando a esmola é demais, o santo desconfia. **Na dúvida, não toque em nada** e converse com alguém de confiança.',
    itens: [
      { texto: '**Não toque** em [[link|links]] de [[sms|SMS]]' },
      { texto: '**Não passe** os dados do cartão para pagar frete ou taxa' },
      {
        texto:
          '**Confira seus pontos** no [[aplicativo-oficial|aplicativo oficial]] da operadora'
      },
      { texto: '**Apague o SMS** sem responder' }
    ]
  },

  // Simulado (roteiro em docs/planos/05-sms-operadora.md).
  // Formato descrito em src/data/conteudos/index.js.
  simulado: {
    contato: CONTATO_SMS,
    inicio: 'pontos',
    etapas: {
      pontos: {
        mensagens: [
          {
            de: 'golpista',
            texto:
              'Parabéns! Você juntou 5.800 pontos no programa de fidelidade.'
          },
          {
            de: 'golpista',
            texto:
              'ATENÇÃO: seus pontos VENCEM HOJE, à meia-noite! Troque agora por um celular novo.'
          },
          {
            de: 'golpista',
            texto: 'Resgate aqui: premios-operadora.exemplo'
          }
        ],
        pergunta: 'O que você faz?',
        // A certa fica por último (no gerente do banco, ela fica no meio),
        // para a pessoa não decorar a posição.
        opcoes: [
          {
            texto:
              'Toco no link para resgatar o celular antes que os pontos vençam',
            correta: false,
            explicacao:
              'Entendemos a vontade de não perder os pontos, mas **o [[link|link]] abre uma página falsa**, que copia o site da operadora. Ela pede os dados do cartão para pagar um "frete". **Desconfie de prêmio que cobra frete.**',
            proxima: 'depois-dos-dados',
            // O celular sai da conversa e mostra a página que o link abriu
            pagina: {
              legenda:
                'Página falsa aberta pelo link: ela imita o site da operadora',
              endereco: 'premios-operadora.exemplo',
              imagem: imagemSiteOperadora,
              descricaoImagem:
                'Página com as cores, o logotipo e o programa de pontos de uma operadora de celular de verdade.',
              formulario: {
                titulo: 'Resgate seu prêmio',
                texto:
                  'Seus 5.800 pontos viraram um celular novo! Pague só o frete de R$ 12,90.',
                // Preenchido: a pessoa passou os dados (sem dados reais)
                campos: [
                  { rotulo: 'Número do cartão', valor: '**** **** **** 4821' },
                  { rotulo: 'Validade', valor: '**/**' },
                  { rotulo: 'Código de segurança', valor: '***' }
                ],
                botao: 'Pagar frete'
              }
            }
          },
          {
            texto: 'Respondo o SMS para resgatar sem precisar tocar no link',
            correta: false,
            explicacao:
              'Fugir do [[link|link]] foi uma boa ideia, mas **quem responde o SMS é o próprio golpista**. Operadora nenhuma pede os dados do cartão por mensagem para entregar um prêmio.',
            proxima: 'depois-dos-dados',
            mensagensExtras: [
              {
                de: 'vitima',
                texto:
                  'Quero resgatar, mas não sei mexer em link. Posso fazer por aqui?'
              },
              {
                de: 'golpista',
                texto:
                  'Pode sim! É só pagar o frete de R$ 12,90. Mande o número do cartão, a validade e o código de trás.'
              },
              {
                de: 'vitima',
                texto:
                  'Cartão **** **** **** 4821, validade **/** e código ***.'
              }
            ]
          },
          {
            texto:
              'Não toco no link e confiro meus pontos no aplicativo oficial da operadora',
            correta: true,
            explicacao:
              'Você não caiu na pressa e conferiu pelo caminho seguro. **Pontos que vencem no mesmo dia e [[link|link]] por [[sms|SMS]] são sinais de golpe.**'
          }
        ]
      },

      'depois-dos-dados': {
        contexto:
          'Veja no celular: os dados do cartão foram parar com os golpistas, e o prêmio **não existe**.',
        pergunta: 'Você já passou seus dados. E agora, o que fazer?',
        opcoes: [
          {
            texto:
              'Ligo na hora para o banco pelo número do verso do cartão, peço para bloquear o cartão e faço um boletim de ocorrência',
            correta: true,
            explicacao:
              'Agir rápido diminui o prejuízo: com o cartão bloqueado, os golpistas não conseguem fazer compras. Faça também o [[boletim-ocorrencia|boletim de ocorrência]] e, se precisar de ajuda, procure o Disque 100.'
          },
          {
            texto: 'Espero o celular chegar, afinal paguei só R$ 12,90',
            correta: false,
            explicacao:
              'O prêmio **não existe**, e com os dados do cartão os golpistas podem fazer **compras bem maiores** no seu nome. E não precisa sentir vergonha: golpes enganam muita gente.'
          },
          {
            texto: 'Respondo o SMS pedindo para cancelar o pagamento',
            correta: false,
            explicacao:
              'Quem lê a resposta é o golpista: ele não cancela nada e pode inventar outra história para tirar mais dinheiro. **Fale direto com o seu banco**, pelo número do verso do cartão.'
          }
        ]
      }
    }
  }
}
