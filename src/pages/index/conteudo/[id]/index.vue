<!--
  Página de conteúdo. Rota: /conteudo/:id
  Planos: docs/planos/02-conteudo-gerente-banco.md e
  docs/planos/03-ajustes-orientador.md (disposição atual)

  Genérica: monta qualquer conteúdo a partir de src/data/conteudos/.
  Conteúdos ainda sem texto (ou id desconhecido) mostram "Em construção".

  Disposição do exemplo do orientador (docs/exemplos/exemplo_orientador.html):
  no desktop, o celular fica ao lado dos sinais e do texto, para o usuário
  ver a conversa e a explicação ao mesmo tempo. Embaixo, dois cards grandes
  lado a lado. No celular e no tablet em pé, tudo em uma coluna.
-->
<template>
  <PaginaEmConstrucao
    v-if="!temTexto"
    :titulo="conteudo ? conteudo.titulo : 'Conteúdo'"
  />

  <q-page v-else class="q-pa-md">
    <article ref="artigo" class="conteudo-limitado pilha pilha--grande">
      <q-btn
        to="/"
        flat
        no-caps
        icon="arrow_back"
        label="Voltar para o início"
        class="botao-principal self-start"
      />

      <div class="conteudo__principal">
        <CelularConversa
          :contato="conteudo.ilustracao.contato"
          :mensagens="conteudo.ilustracao.mensagens"
          :legenda="conteudo.ilustracao.legenda"
        />

        <div class="conteudo__lateral">
          <section aria-labelledby="rotulo-sinais" class="pilha">
            <p id="rotulo-sinais" class="conteudo__rotulo">
              <q-icon name="warning" aria-hidden="true" />
              Sinais de alerta
            </p>

            <ul class="conteudo__sinais">
              <li v-for="sinal in conteudo.sinais" :key="sinal.titulo">
                <CardSinal
                  :icone="sinal.icone"
                  :titulo="sinal.titulo"
                  :texto="sinal.texto"
                />
              </li>
            </ul>
          </section>

          <header class="pilha">
            <SeloConcluido v-if="concluido" class="self-start" />
            <h1 class="conteudo__titulo">{{ conteudo.titulo }}</h1>
            <p v-if="minutosLeitura" class="conteudo__tempo">
              <q-icon name="schedule" aria-hidden="true" />
              Leitura de {{ minutosLeitura }}
              {{ minutosLeitura === 1 ? 'minuto' : 'minutos' }}
            </p>
            <p class="conteudo__manchete">{{ conteudo.manchete }}</p>
          </header>

          <p class="conteudo__introducao">
            <TextoRico :texto="conteudo.introducao" />
          </p>
        </div>
      </div>

      <!-- Dois cards grandes: lado a lado no desktop, com a mesma altura -->
      <div class="conteudo__cards">
        <CaixaDestaque titulo="Como se proteger" icone="shield">
          <p class="q-mt-none q-mb-md">
            <TextoRico :texto="conteudo.protecao.texto" />
          </p>
          <ListaDicas :itens="conteudo.protecao.itens" />
        </CaixaDestaque>

        <CaixaAjuda />
      </div>

      <div class="conteudo__acoes">
        <q-btn
          :to="`/conteudo/${conteudo.id}/simulado`"
          color="primary"
          icon="quiz"
          label="Fazer o simulado"
          no-caps
          unelevated
          class="botao-principal"
        />

        <!-- Já concluído: só volta; senão, permite concluir manualmente -->
        <q-btn
          v-if="concluido"
          to="/"
          outline
          icon="home"
          label="Voltar para o início"
          no-caps
          class="botao-principal"
        />
        <q-btn
          v-else
          outline
          icon="check"
          label="Já entendi"
          no-caps
          class="botao-principal"
          @click="concluir"
        />
      </div>
    </article>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import CaixaAjuda from '@/components/CaixaAjuda.vue'
import CaixaDestaque from '@/components/CaixaDestaque.vue'
import CardSinal from '@/components/CardSinal.vue'
import CelularConversa from '@/components/CelularConversa.vue'
import ListaDicas from '@/components/ListaDicas.vue'
import PaginaEmConstrucao from '@/components/PaginaEmConstrucao.vue'
import SeloConcluido from '@/components/SeloConcluido.vue'
import TextoRico from '@/components/TextoRico.vue'
import { buscarConteudo, temTexto } from '@/data/conteudos'
import { useProgressoStore } from '@/stores/progresso'

// Velocidade de leitura usada para estimar o tempo (palavras por minuto).
// Mais baixa que a média de adultos (~200), pensando no público idoso.
const PALAVRAS_POR_MINUTO = 130

export default {
  name: 'PaginaConteudo',

  components: {
    CaixaAjuda,
    CaixaDestaque,
    CardSinal,
    CelularConversa,
    ListaDicas,
    PaginaEmConstrucao,
    SeloConcluido,
    TextoRico
  },

  computed: {
    ...mapState(useProgressoStore, ['estaConcluido']),

    conteudo() {
      return buscarConteudo(this.$route.params.id)
    },

    temTexto() {
      return temTexto(this.conteudo)
    },

    concluido() {
      return this.estaConcluido(this.conteudo.id)
    }
  },

  data() {
    return {
      // Calculado depois de renderizar (ver calcularTempoLeitura)
      minutosLeitura: null
    }
  },

  watch: {
    // A mesma página é reaproveitada ao trocar de conteúdo pela rota.
    '$route.params.id': {
      handler() {
        this.$nextTick(this.calcularTempoLeitura)
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(useProgressoStore, ['marcarConcluido']),

    /**
     * Estima o tempo de leitura contando as palavras do texto exibido na
     * página (inclusive a conversa e a caixa de ajuda), e não só dos dados.
     */
    calcularTempoLeitura() {
      const artigo = this.$refs.artigo
      if (!artigo) {
        this.minutosLeitura = null
        return
      }

      const palavras = artigo.innerText.split(/\s+/).filter(Boolean).length
      this.minutosLeitura = Math.max(
        1,
        Math.round(palavras / PALAVRAS_POR_MINUTO)
      )
    },

    // Conclusão manual (regra de negócio em docs/plataforma.md).
    concluir() {
      this.marcarConcluido(this.conteudo.id)

      this.$q.notify({
        message: 'Muito bem! Conteúdo concluído.',
        icon: 'check_circle',
        color: 'positive',
        position: 'top',
        classes: 'notificacao-grande'
      })

      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
// Celular | sinais e texto. Lado a lado só a partir do desktop; antes
// disso, a coluna do lado ficaria estreita demais para letra grande.
.conteudo__principal {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: $breakpoint-md-min) {
    grid-template-columns: 300px 1fr;
    gap: 3rem;
    align-items: start;
  }
}

.conteudo__lateral {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.conteudo__rotulo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-weight: 700;
  color: var(--cor-destaque-texto);
}

.conteudo__sinais {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.conteudo__titulo {
  font-size: 1.5rem;
}

.conteudo__tempo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: var(--cor-texto-secundario);
}

// Manchete em negrito grande, sem caixa alta (mais fácil de ler).
.conteudo__manchete {
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.15;
  color: var(--cor-destaque-texto);

  @media (min-width: $breakpoint-sm-min) {
    font-size: 2.5rem;
  }
}

.conteudo__introducao {
  margin: 0;
  font-size: 1.375rem;
}

.conteudo__cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: $breakpoint-md-min) {
    grid-template-columns: 1fr 1fr;
  }
}

.conteudo__acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;

  // No celular, botões ocupam a largura toda (alvo de toque maior).
  > * {
    flex: 1 1 240px;
  }
}
</style>
