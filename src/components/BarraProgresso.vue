<!--
  Barra de progresso dos conteúdos concluídos.

  Sempre exibe o texto "X de Y conteúdos concluídos" junto da barra,
  para que a informação não dependa só da parte visual.
-->
<template>
  <div class="barra-progresso">
    <p :id="idTexto" class="barra-progresso__texto">
      Seu progresso: <strong>{{ concluidos }} de {{ total }}</strong>
      {{ total === 1 ? 'conteúdo concluído' : 'conteúdos concluídos' }}
    </p>

    <q-linear-progress
      :value="fracao"
      size="20px"
      rounded
      track-color="transparent"
      class="barra-progresso__barra"
      role="progressbar"
      :aria-labelledby="idTexto"
      aria-valuemin="0"
      :aria-valuemax="total"
      :aria-valuenow="concluidos"
    />
  </div>
</template>

<script>
export default {
  name: 'BarraProgresso',

  props: {
    // Quantidade de conteúdos concluídos
    concluidos: {
      type: Number,
      required: true
    },

    // Quantidade total de conteúdos
    total: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      // id único para ligar a barra ao texto (aria-labelledby)
      idTexto: `barra-progresso-${Math.random().toString(36).slice(2, 9)}`
    }
  },

  computed: {
    // O q-linear-progress espera um valor entre 0 e 1.
    fracao() {
      return this.total > 0 ? this.concluidos / this.total : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.barra-progresso__texto {
  margin: 0 0 0.5rem;
}

.barra-progresso__barra {
  // Trilho e preenchimento definidos aqui porque o q-linear-progress só
  // aceita cores da paleta do Quasar. O preenchimento tem 3,3:1 sobre o
  // trilho (mínimo de 3:1 para elementos gráficos).
  background: var(--cor-laranja-claro);
  color: var(--cor-laranja-forte);
  border: 1px solid var(--cor-laranja-forte);
}
</style>
