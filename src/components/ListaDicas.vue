<!--
  Lista de dicas no estilo das cartilhas: itens com "»" e subitens com "▪".
  Os textos aceitam a marcação do TextoRico (negrito e termos do glossário).
-->
<template>
  <ul class="lista-dicas">
    <li v-for="(item, indice) in itens" :key="indice" class="lista-dicas__item">
      <TextoRico :texto="item.texto" />

      <ul v-if="item.subitens?.length" class="lista-dicas__subitens">
        <li v-for="(subitem, indiceSub) in item.subitens" :key="indiceSub">
          <TextoRico :texto="subitem" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import TextoRico from '@/components/TextoRico.vue'

export default {
  name: 'ListaDicas',

  components: { TextoRico },

  props: {
    // Itens no formato { texto, subitens?: [texto] }
    itens: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.lista-dicas,
.lista-dicas__subitens {
  margin: 0;
  padding: 0;
  list-style: none;
}

.lista-dicas {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

// Marcadores feitos com ::before para usar os símbolos das cartilhas.
.lista-dicas__item {
  position: relative;
  padding-left: 1.75rem;

  &::before {
    content: '»';
    position: absolute;
    left: 0;
    color: var(--cor-destaque-texto);
    font-weight: 900;
  }
}

.lista-dicas__subitens {
  margin-top: 0.25rem;

  li {
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: '▪';
      position: absolute;
      left: 0.25rem;
    }
  }
}
</style>
