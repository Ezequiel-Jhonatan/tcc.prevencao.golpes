/**
 * Lista de conteúdos (golpes) da plataforma.
 *
 * Cada conteúdo fica em seu próprio arquivo nesta pasta e é renderizado
 * por componentes reutilizáveis. Para adicionar um conteúdo novo, crie o
 * arquivo e inclua-o na lista abaixo (a ordem da lista é a ordem na Home).
 *
 * Campos usados pela Home:
 * - id: identificador único; usado na rota /conteudo/:id e no progresso
 * - titulo, resumo: textos do card
 * - icone: ícone Material (provisório até haver ilustrações)
 * - cor: cor de identidade (laranja, salvia, lilas, azul, rosa ou amarelo)
 *
 * Campos da página de conteúdo (ver mensagem-gerente-banco.js):
 * - manchete, introducao, ilustracao, sinais (3), protecao
 * - contato (da ilustração e do simulado): { nome, status, icone? }; icone é
 *   o ícone Material do avatar (sem ele, aparece o de banco)
 *
 * Campo do simulado (opcional; sem ele, o simulado mostra "Em construção"):
 * simulado: {
 *   contato: { nome, status, icone? }, // topo da conversa no celular
 *   inicio: 'id-da-etapa',       // primeira etapa
 *   etapas: {
 *     'id-da-etapa': {
 *       mensagens?: [{ de: 'golpista' | 'vitima', texto }], // somadas à conversa
 *       contexto?: '...',        // frase antes da pergunta (aceita TextoRico)
 *       pergunta: '...',
 *       opcoes: [{
 *         texto,                 // texto simples (fica dentro de um botão)
 *         correta,
 *         explicacao,            // aceita a marcação do TextoRico
 *         proxima?,              // etapa seguinte, depois de um erro
 *         mensagensExtras?,      // continuação da conversa, depois de um erro
 *         pagina?                // página que o link abriu (ver abaixo)
 *       }]
 *     }
 *   }
 * }
 *
 * Com `pagina`, o celular troca a conversa pela página falsa que o link
 * abriria (exemplo em sms-operadora.js). Ela fica até o fim do simulado.
 * pagina: {
 *   legenda,                     // legenda do celular enquanto ela aparece
 *   endereco,                    // endereço falso na barra do navegador
 *   imagem, descricaoImagem,     // print do site imitado (src/assets/simulados/)
 *   formulario: {                // o pedido do golpe, em texto de verdade
 *     titulo, texto, botao,
 *     campos: [{ rotulo, valor }]
 *   }
 * }
 */
import mensagemGerenteBanco from './mensagem-gerente-banco'
import smsOperadora from './sms-operadora'
import mensagemInss from './mensagem-inss'

export const conteudos = [mensagemGerenteBanco, smsOperadora, mensagemInss]

/**
 * Busca um conteúdo pelo id. Retorna undefined se não existir.
 */
export function buscarConteudo(id) {
  return conteudos.find(conteudo => conteudo.id === id)
}

/**
 * Indica se o conteúdo já tem texto para exibir. Conteúdos só com os
 * campos da Home abrem a página "Em construção".
 */
export function temTexto(conteudo) {
  return Array.isArray(conteudo?.sinais) && conteudo.sinais.length > 0
}

/**
 * Indica se o conteúdo já tem o roteiro do simulado.
 */
export function temSimulado(conteudo) {
  return Boolean(conteudo?.simulado?.etapas?.[conteudo.simulado.inicio])
}
