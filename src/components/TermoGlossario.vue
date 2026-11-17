<!--
  Palavra com a lupa do glossário.

  Mostra a palavra sublinhada com um ícone de lupa. Ao tocar (ou pressionar
  Enter/Espaço), abre uma janela com a explicação do termo, vinda de
  src/data/glossario.js (fonte única das definições).

  Se o termo não existir no glossário, a palavra aparece como texto normal.
-->
<template>
  <button
    v-if="termo"
    type="button"
    class="termo-glossario"
    :aria-label="`${texto}, ver explicação`"
    @click="aberto = true"
  >
    <span class="termo-glossario__texto">{{ texto }}</span>
    <q-icon name="search" class="termo-glossario__lupa" aria-hidden="true" />
  </button>
  <span v-else>{{ texto }}</span>

  <!-- O Quasar devolve o foco à palavra quando a janela fecha -->
  <q-dialog v-if="termo" v-model="aberto">
    <q-card class="termo-glossario__janela">
      <q-card-section class="row items-center no-wrap q-gutter-x-md">
        <q-icon name="search" size="32px" aria-hidden="true" />
        <h2 class="titulo-secao">{{ termo.termo }}</h2>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p class="q-ma-none">{{ termo.explicacao }}</p>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn
          v-close-popup
          label="Entendi"
          icon="check"
          color="primary"
          no-caps
          unelevated
          class="botao-principal"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { buscarTermo } from '@/data/glossario'

export default {
  name: 'TermoGlossario',

  props: {
    // id do termo em src/data/glossario.js
    termoId: {
      type: String,
      required: true
    },

    // Palavra exibida no texto (pode ser diferente do nome do termo,
    // ex.: "vazadas" para o termo "Dados vazados")
    texto: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      // Controla a janela com a explicação
      aberto: false
    }
  },

  computed: {
    termo() {
      return buscarTermo(this.termoId)
    }
  },

  created() {
    // Avisa durante o desenvolvimento quando um texto usa um termo que não
    // está no glossário (erro de digitação no id, por exemplo).
    if (import.meta.env.DEV && !this.termo) {
      console.warn(`[TermoGlossario] termo "${this.termoId}" não existe.`)
    }
  }
}
</script>

<style lang="scss" scoped>
.termo-glossario {
  // Parece texto, não um botão, para não quebrar a leitura da frase.
  display: inline;
  // O padding vertical aumenta a área de toque para ~48px sem mudar a
  // altura da linha (a margem negativa compensa o padding).
  padding: 0.6rem 0.1rem;
  margin: -0.6rem 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.termo-glossario__texto {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.termo-glossario__lupa {
  margin-left: 0.15em;
  font-size: 0.9em;
  vertical-align: -0.1em;
  color: var(--cor-destaque-texto);
}

.termo-glossario__janela {
  width: 100%;
  max-width: 520px;
  border-radius: 24px;
  color: var(--cor-texto);
  background: var(--cor-fundo);
}
</style>
