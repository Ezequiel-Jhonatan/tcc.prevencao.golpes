/**
 * Glossário da plataforma: fonte única das explicações de termos.
 *
 * Usado pela lupa nos textos dos conteúdos (TermoGlossario) e pela página
 * Glossário, que lista todos os termos em ordem alfabética (a ordem deste
 * arquivo não importa). Nos textos, um termo é marcado assim:
 * [[id-do-termo|texto exibido]]
 *
 * Explicações em linguagem simples, sem outros termos técnicos.
 */
export const glossario = [
  {
    id: 'sms',
    termo: 'SMS',
    explicacao:
      'Mensagem de texto que chega no celular pelo número de telefone, fora do WhatsApp.'
  },
  {
    id: 'codigo-verificacao',
    termo: 'Código de verificação',
    explicacao:
      'Números enviados pelo banco ou pelo WhatsApp para confirmar que é você mesmo. Funciona como uma chave: nunca passe para ninguém.'
  },
  {
    id: 'pix',
    termo: 'Pix',
    explicacao:
      'Forma de mandar dinheiro na hora, pelo aplicativo do banco. Depois de enviado, é muito difícil ter o dinheiro de volta.'
  },
  {
    id: 'link',
    termo: 'Link',
    explicacao:
      'Texto azul ou endereço que, ao ser tocado, abre uma página ou um aplicativo. Links falsos podem roubar seus dados.'
  },
  {
    id: 'dados-vazados',
    termo: 'Dados vazados',
    explicacao:
      'Informações pessoais (nome, CPF, endereço) que foram roubadas de empresas e circulam na internet. Golpistas usam esses dados para parecer confiáveis.'
  },
  {
    id: 'aplicativo-oficial',
    termo: 'Aplicativo oficial',
    explicacao:
      'O aplicativo verdadeiro de uma empresa, como o banco ou a operadora de celular, baixado da loja do celular (Play Store ou App Store) e publicado pela própria empresa.'
  },
  {
    id: 'programa-fidelidade',
    termo: 'Programa de fidelidade',
    explicacao:
      'Programa de uma empresa (operadora de celular, banco, loja) que dá pontos para o cliente trocar por descontos ou produtos. Golpistas inventam pontos "vencendo" para apressar você.'
  },
  {
    id: 'inss',
    termo: 'INSS',
    explicacao:
      'Instituto Nacional do Seguro Social, o órgão do governo que paga as aposentadorias e pensões. Ele não pede documento, foto nem senha por mensagem.'
  },
  {
    id: 'consignado',
    termo: 'Empréstimo consignado',
    explicacao:
      'Empréstimo pago com descontos todo mês, direto na aposentadoria ou no salário. Com seus documentos e uma foto do seu rosto, golpistas conseguem fazer um no seu nome.'
  },
  {
    id: 'selfie',
    termo: 'Selfie',
    explicacao:
      'Foto do próprio rosto, tirada com a câmera do celular. Bancos e o governo usam a selfie para confirmar que é você mesmo.'
  },
  {
    id: 'prova-de-vida',
    termo: 'Prova de vida',
    explicacao:
      'Confirmação de que o aposentado continua vivo, para o pagamento não parar. Hoje, na maioria das vezes, o próprio governo faz essa confirmação sozinho, sem você precisar fazer nada.'
  },
  {
    id: 'boletim-ocorrencia',
    termo: 'Boletim de ocorrência',
    explicacao:
      'Registro que você faz na polícia contando o que aconteceu. Pode ser feito na delegacia ou pela internet. Ajuda a provar o golpe para o banco.'
  }
]

/**
 * Busca um termo pelo id. Retorna undefined se não existir.
 */
export function buscarTermo(id) {
  return glossario.find(item => item.id === id)
}
