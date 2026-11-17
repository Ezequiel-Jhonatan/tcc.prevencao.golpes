import { defineStore, acceptHMRUpdate } from 'pinia'
import { LocalStorage } from 'quasar'
import { conteudos } from '@/data/conteudos'

// Chave usada para salvar o progresso no navegador.
const CHAVE_STORAGE = 'progresso'

/**
 * Lê do navegador a lista de conteúdos concluídos.
 * Qualquer valor inválido (dado antigo ou corrompido) vira lista vazia,
 * para a plataforma nunca quebrar por causa do que está salvo.
 */
function carregarConcluidos() {
  const salvo = LocalStorage.getItem(CHAVE_STORAGE)
  return Array.isArray(salvo) ? salvo : []
}

/**
 * Progresso do usuário: quais conteúdos ele já concluiu.
 *
 * Regra de negócio: um conteúdo está concluído quando o usuário acertou o
 * simulado ou confirmou manualmente a conclusão (ver docs/plataforma.md).
 * Não há backend; o progresso fica salvo só neste navegador.
 */
export const useProgressoStore = defineStore('progresso', {
  state: () => ({
    // ids dos conteúdos concluídos
    concluidos: carregarConcluidos()
  }),

  getters: {
    // Total de conteúdos. Glossário e "Caí num golpe" não entram na conta
    // porque não fazem parte de `conteudos`.
    total: () => conteudos.length,

    // Conta só ids que ainda existem, para que um conteúdo removido da lista
    // não continue contando no progresso.
    quantidadeConcluida: state =>
      conteudos.filter(conteudo => state.concluidos.includes(conteudo.id))
        .length,

    // Percentual de 0 a 100, arredondado.
    percentual() {
      if (this.total === 0) return 0
      return Math.round((this.quantidadeConcluida / this.total) * 100)
    },

    // Uso: estaConcluido('banco-via-internet')
    estaConcluido: state => id => state.concluidos.includes(id)
  },

  actions: {
    marcarConcluido(id) {
      if (this.concluidos.includes(id)) return
      this.concluidos.push(id)
      this.salvar()
    },

    reiniciar() {
      this.concluidos = []
      this.salvar()
    },

    salvar() {
      LocalStorage.set(CHAVE_STORAGE, this.concluidos)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProgressoStore, import.meta.hot))
}
