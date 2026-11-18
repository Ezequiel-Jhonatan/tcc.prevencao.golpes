<!--
  Simulado do conteúdo. Rota: /conteudo/:id/simulado
  Plano: docs/planos/04-simulado-gerente-banco.md

  Genérico: segue o roteiro do campo `simulado` do conteúdo (formato em
  src/data/conteudos/index.js). Sem roteiro, mostra "Em construção".

  Fluxo: cada etapa tem uma pergunta e opções. A opção errada mostra a
  explicação e pode levar a outra etapa (ex.: "você passou seus dados, e
  agora?"), continuando a conversa no celular. Se a opção errada for tocar
  num link, o celular passa a mostrar a página falsa (campo `pagina`).
  A opção certa encerra.

  Regra de conclusão (decisão 2 do plano): o conteúdo só é concluído quando
  a pessoa acerta sem ter errado antes. Quem acertou depois de um erro é
  elogiado e convidado a tentar de novo.

  Layout: no desktop, opções ao lado do celular (ver tudo ao mesmo tempo);
  no celular e no tablet em pé, opções abaixo.
-->
<template>
  <PaginaEmConstrucao
    v-if="!temSimulado"
    :titulo="conteudo ? `Simulado: ${conteudo.titulo}` : 'Simulado'"
    :voltar-para="`/conteudo/${$route.params.id}`"
    texto-voltar="Voltar para o conteúdo"
  />

  <q-page v-else class="q-pa-md">
    <div class="conteudo-limitado pilha pilha--grande">
      <q-btn
        :to="`/conteudo/${conteudo.id}`"
        flat
        no-caps
        icon="arrow_back"
        label="Voltar para o conteúdo"
        class="botao-principal self-start"
      />

      <header class="pilha">
        <h1 class="simulado__titulo">Simulado: {{ conteudo.titulo }}</h1>
        <p class="q-ma-none">
          Leia a conversa no celular e escolha o que você faria. Não tem tempo
          limite: pense com calma.
        </p>
      </header>

      <div class="simulado__principal">
        <CelularConversa
          :contato="conteudo.simulado.contato"
          :mensagens="conversa"
          :pagina="pagina"
          :legenda="pagina ? pagina.legenda : 'Conversa do simulado'"
        />

        <div class="simulado__painel">
          <RetornoSimulado
            v-if="retorno"
            ref="retorno"
            :key="retorno.chave"
            :tipo="retorno.tipo"
            :titulo="retorno.titulo"
            :explicacao="retorno.explicacao"
          >
            <template v-if="finalizado">
              <SeloConcluido v-if="concluidoAgora" class="self-start" />

              <p v-else class="q-ma-none">
                Para concluir o conteúdo, tente o simulado de novo e escolha a
                melhor atitude logo na primeira pergunta.
              </p>

              <div class="simulado__acoes">
                <template v-if="concluidoAgora">
                  <q-btn
                    to="/"
                    color="primary"
                    icon="home"
                    label="Voltar para o início"
                    no-caps
                    unelevated
                    class="botao-principal"
                  />
                  <q-btn
                    :to="`/conteudo/${conteudo.id}`"
                    outline
                    icon="menu_book"
                    label="Rever o conteúdo"
                    no-caps
                    class="botao-principal"
                  />
                </template>

                <template v-else>
                  <q-btn
                    color="primary"
                    icon="replay"
                    label="Tentar o simulado de novo"
                    no-caps
                    unelevated
                    class="botao-principal"
                    @click="reiniciar"
                  />
                  <q-btn
                    to="/"
                    outline
                    icon="home"
                    label="Voltar para o início"
                    no-caps
                    class="botao-principal"
                  />
                </template>
              </div>
            </template>
          </RetornoSimulado>

          <template v-if="!finalizado">
            <p v-if="etapa.contexto" class="simulado__contexto">
              <TextoRico :texto="etapa.contexto" />
            </p>

            <OpcoesSimulado
              :pergunta="etapa.pergunta"
              :opcoes="etapa.opcoes"
              :tentadas="tentadas"
              @escolher="escolher"
            />
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'pinia'
import CelularConversa from '@/components/CelularConversa.vue'
import OpcoesSimulado from '@/components/OpcoesSimulado.vue'
import PaginaEmConstrucao from '@/components/PaginaEmConstrucao.vue'
import RetornoSimulado from '@/components/RetornoSimulado.vue'
import SeloConcluido from '@/components/SeloConcluido.vue'
import TextoRico from '@/components/TextoRico.vue'
import { buscarConteudo, temSimulado } from '@/data/conteudos'
import { useProgressoStore } from '@/stores/progresso'

export default {
  name: 'PaginaSimulado',

  components: {
    CelularConversa,
    OpcoesSimulado,
    PaginaEmConstrucao,
    RetornoSimulado,
    SeloConcluido,
    TextoRico
  },

  data() {
    return {
      etapaId: null,
      // Mensagens exibidas no celular; crescem conforme as escolhas
      conversa: [],
      // Página falsa aberta por um link (substitui a conversa no celular)
      pagina: null,
      // Índices das opções erradas já tentadas na etapa atual
      tentadas: [],
      // Caixa de retorno atual: { chave, tipo, titulo, explicacao }
      retorno: null,
      // Errou alguma vez nesta tentativa (impede a conclusão)
      errou: false,
      finalizado: false,
      concluidoAgora: false
    }
  },

  computed: {
    conteudo() {
      return buscarConteudo(this.$route.params.id)
    },

    temSimulado() {
      return temSimulado(this.conteudo)
    },

    etapa() {
      return this.conteudo.simulado.etapas[this.etapaId]
    }
  },

  watch: {
    // A mesma página é reaproveitada ao trocar de conteúdo pela rota.
    '$route.params.id': {
      handler() {
        this.reiniciar()
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(useProgressoStore, ['marcarConcluido']),

    // Volta ao começo do roteiro (também usado em "Tentar de novo").
    reiniciar() {
      if (!this.temSimulado) return

      this.conversa = []
      this.pagina = null
      this.retorno = null
      this.errou = false
      this.finalizado = false
      this.concluidoAgora = false
      this.irParaEtapa(this.conteudo.simulado.inicio)

      window.scrollTo({ top: 0 })
    },

    irParaEtapa(id) {
      this.etapaId = id
      this.tentadas = []
      this.conversa.push(...(this.etapa.mensagens || []))
    },

    escolher(indice) {
      const opcao = this.etapa.opcoes[indice]

      if (opcao.correta) {
        this.finalizado = true
        this.concluidoAgora = !this.errou
        if (this.concluidoAgora) this.marcarConcluido(this.conteudo.id)

        this.mostrarRetorno({
          tipo: 'acerto',
          titulo: this.concluidoAgora ? 'Parabéns!' : 'Isso mesmo!',
          explicacao: opcao.explicacao
        })
        return
      }

      this.errou = true
      this.conversa.push(...(opcao.mensagensExtras || []))
      // Tocou no link: o celular mostra a página que ele abriria
      if (opcao.pagina) this.pagina = opcao.pagina

      if (opcao.proxima) {
        this.irParaEtapa(opcao.proxima)
      } else {
        this.tentadas.push(indice)
      }

      this.mostrarRetorno({
        tipo: 'erro',
        titulo: 'Há uma opção mais segura',
        explicacao: opcao.explicacao
      })
    },

    // A chave nova recria a caixa, e o foco vai para ela (leitor de tela
    // lê o resultado; a tela rola até ela no celular).
    mostrarRetorno(retorno) {
      this.retorno = { ...retorno, chave: Date.now() }
      this.$nextTick(() => this.$refs.retorno?.focar())
    }
  }
}
</script>

<style lang="scss" scoped>
.simulado__titulo {
  font-size: 1.75rem;
}

// Celular | painel. Lado a lado só a partir do desktop (decisão 3).
.simulado__principal {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: $breakpoint-md-min) {
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    align-items: start;
  }
}

.simulado__painel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.simulado__contexto {
  margin: 0;
  font-weight: 500;
}

.simulado__acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  > * {
    flex: 1 1 220px;
  }
}
</style>
