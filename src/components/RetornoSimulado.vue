<!--
  Caixa de retorno do simulado, mostrada depois de cada escolha.

  Fica na própria página e não some sozinha: a plataforma não tem tempo
  limite nem janelas que abrem sozinhas (docs/plataforma.md). Ícone e
  título acompanham a cor, para o resultado não depender só dela.

  A página move o foco para a caixa depois da escolha (método `focar`):
  o leitor de tela lê o título e a explicação, e a tela rola até ela.
-->
<template>
  <section
    ref="caixa"
    class="retorno-simulado"
    :class="`retorno-simulado--${tipo}`"
    tabindex="-1"
    :aria-labelledby="idTitulo"
    :aria-describedby="idExplicacao"
  >
    <h2 :id="idTitulo" class="retorno-simulado__titulo">
      <q-icon :name="icone" aria-hidden="true" />
      {{ titulo }}
    </h2>

    <p :id="idExplicacao" class="retorno-simulado__explicacao">
      <TextoRico :texto="explicacao" />
    </p>

    <!-- Conteúdo extra (selo, botões finais) -->
    <slot />
  </section>
</template>

<script>
import TextoRico from '@/components/TextoRico.vue'

export default {
  name: 'RetornoSimulado',

  components: { TextoRico },

  props: {
    // "acerto" (verde) ou "erro" (âmbar, tom acolhedor)
    tipo: {
      type: String,
      required: true,
      validator: valor => ['acerto', 'erro'].includes(valor)
    },

    // Ex.: "Parabéns!" ou "Há uma opção mais segura"
    titulo: {
      type: String,
      required: true
    },

    // Explicação; aceita a marcação do TextoRico
    explicacao: {
      type: String,
      required: true
    }
  },

  data() {
    const id = Math.random().toString(36).slice(2, 9)
    return {
      idTitulo: `retorno-titulo-${id}`,
      idExplicacao: `retorno-texto-${id}`
    }
  },

  computed: {
    icone() {
      return this.tipo === 'acerto' ? 'check_circle' : 'info'
    }
  },

  methods: {
    focar() {
      this.$refs.caixa.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.retorno-simulado {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border: 2px solid;
  border-radius: 20px;
  // Rolagem até a caixa sem colar no cabeçalho fixo
  scroll-margin-top: 96px;

  // Verde claro: texto marrom acima de 10:1
  &--acerto {
    border-color: var(--cor-concluido);
    background: #e3f2e8;

    // Verde mais escuro que o do selo: 4,5:1 sobre o fundo verde claro
    .retorno-simulado__titulo {
      color: #1f5e3a;
    }
  }

  // Âmbar claro: acolhedor, sem o vermelho que transmite falha
  &--erro {
    border-color: var(--cor-ambar-borda);
    background: var(--cor-ambar-claro);

    .retorno-simulado__titulo {
      color: var(--cor-ambar-escuro);
    }
  }
}

.retorno-simulado__titulo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.retorno-simulado__explicacao {
  margin: 0;
}
</style>
