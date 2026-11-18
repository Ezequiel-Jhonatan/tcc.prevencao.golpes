<!--
  Pergunta do simulado com as opções de resposta.

  Cada opção é um botão grande, com o texto completo e uma letra (A, B, C)
  para facilitar a referência. Uma opção errada já tentada fica marcada e
  indisponível, para a pessoa tentar outra sem repetir o erro.

  As opções são texto simples: um termo do glossário (que também é um
  botão) não pode ficar dentro de outro botão.
-->
<template>
  <section class="opcoes-simulado pilha" :aria-labelledby="idPergunta">
    <h2 :id="idPergunta">{{ pergunta }}</h2>

    <ul class="opcoes-simulado__lista">
      <li v-for="(opcao, indice) in opcoes" :key="opcao.texto">
        <button
          type="button"
          class="opcoes-simulado__opcao"
          :class="{ 'opcoes-simulado__opcao--tentada': foiTentada(indice) }"
          :aria-disabled="foiTentada(indice) ? 'true' : undefined"
          @click="escolher(indice)"
        >
          <span class="opcoes-simulado__letra" aria-hidden="true">
            <q-icon v-if="foiTentada(indice)" name="close" />
            <template v-else>{{ LETRAS[indice] }}</template>
          </span>

          <span class="opcoes-simulado__texto">
            {{ opcao.texto }}
            <span v-if="foiTentada(indice)" class="opcoes-simulado__aviso">
              Há uma opção mais segura
            </span>
          </span>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
const LETRAS = ['A', 'B', 'C', 'D', 'E']

export default {
  name: 'OpcoesSimulado',

  props: {
    // Pergunta exibida acima das opções
    pergunta: {
      type: String,
      required: true
    },

    // Opções no formato { texto } (os outros campos não são usados aqui)
    opcoes: {
      type: Array,
      required: true
    },

    // Índices das opções erradas já tentadas nesta pergunta
    tentadas: {
      type: Array,
      default: () => []
    }
  },

  emits: ['escolher'],

  data() {
    return {
      LETRAS,
      // id único para ligar a seção à pergunta (aria-labelledby)
      idPergunta: `pergunta-${Math.random().toString(36).slice(2, 9)}`
    }
  },

  methods: {
    foiTentada(indice) {
      return this.tentadas.includes(indice)
    },

    // Usa aria-disabled em vez de `disabled`: o Quasar deixa todo
    // [disabled] com opacidade 0,6, o que derruba o contraste do texto.
    // Por isso o clique na opção já tentada é ignorado aqui.
    escolher(indice) {
      if (this.foiTentada(indice)) return
      this.$emit('escolher', indice)
    }
  }
}
</script>

<style lang="scss" scoped>
.opcoes-simulado__lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

// Botão nativo (e não q-btn): controle total da quebra de linha do
// texto longo e do estado desabilitado sem perder contraste.
.opcoes-simulado__opcao {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  min-height: 64px;
  padding: 0.75rem 1rem;
  border: 2px solid var(--cor-laranja-forte);
  border-radius: 16px;
  background: #fff;
  color: var(--cor-texto);
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:hover:not([aria-disabled='true']) {
    background: var(--cor-laranja-claro);
  }

  // Errada já tentada: continua legível (sem opacidade baixa), mas com
  // fundo âmbar, "X" e o aviso em texto, para não depender só da cor.
  &--tentada {
    border-color: var(--cor-ambar-borda);
    background: var(--cor-ambar-claro);
    cursor: default;
  }
}

.opcoes-simulado__letra {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--cor-laranja-claro);
  color: var(--cor-destaque-texto);
  font-weight: 900;

  .opcoes-simulado__opcao--tentada & {
    background: #fff;
    color: var(--cor-ambar-escuro);
  }
}

.opcoes-simulado__texto {
  line-height: 1.4;
}

.opcoes-simulado__aviso {
  display: block;
  margin-top: 0.25rem;
  font-size: 1.05rem;
  font-weight: 700;
}
</style>
