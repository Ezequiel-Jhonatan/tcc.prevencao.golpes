<!--
  Caixa com título e fundo de destaque.
  Usada em "Como se proteger" e "Onde pedir ajuda". O conteúdo vai no slot.
-->
<template>
  <section class="caixa-destaque" :aria-labelledby="idTitulo">
    <h2 :id="idTitulo" class="caixa-destaque__titulo titulo-secao">
      <q-icon v-if="icone" :name="icone" aria-hidden="true" />
      {{ titulo }}
    </h2>

    <slot />
  </section>
</template>

<script>
export default {
  name: 'CaixaDestaque',

  props: {
    // Título da caixa
    titulo: {
      type: String,
      required: true
    },

    // Ícone Material opcional ao lado do título
    icone: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      // id único para ligar a seção ao título (aria-labelledby)
      idTitulo: `caixa-${Math.random().toString(36).slice(2, 9)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.caixa-destaque {
  padding: 1.5rem;
  border-radius: 24px;
  border: 2px solid var(--cor-laranja-forte);
  // Laranja claro: 10:1 com o texto marrom.
  background: var(--cor-laranja-claro);
}

.caixa-destaque__titulo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
</style>
