/**
 * Glossário da plataforma: fonte única das explicações de termos.
 *
 * Usado pela lupa nos textos dos conteúdos (TermoGlossario) e, no futuro,
 * pela página Glossário. Nos textos, um termo é marcado assim:
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
      'O aplicativo verdadeiro do banco, baixado da loja do celular (Play Store ou App Store) e publicado pelo próprio banco.'
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
