<!--
  Card pequeno de um sinal de alerta: ícone em círculo, título e uma frase.
  Cada conteúdo mostra três, ao lado do celular (disposição do exemplo do
  orientador, docs/exemplos/exemplo_orientador.html).

  No celular, a frase vai para baixo do título; a partir do tablet, os três
  ficam em linha (ícone | título | frase).
-->
<template>
  <div class="card-sinal">
    <span class="card-sinal__icone" aria-hidden="true">
      <q-icon :name="icone" />
    </span>

    <!-- Não é título (h3): os cards vêm antes do h1 da página -->
    <strong class="card-sinal__titulo">{{ titulo }}</strong>

    <p class="card-sinal__texto">
      <TextoRico :texto="texto" />
    </p>
  </div>
</template>

<script>
import TextoRico from '@/components/TextoRico.vue'

export default {
  name: 'CardSinal',

  components: { TextoRico },

  props: {
    // Nome do ícone Material
    icone: {
      type: String,
      required: true
    },

    // Nome curto do sinal (ex.: "Pressa")
    titulo: {
      type: String,
      required: true
    },

    // Frase curta; aceita a marcação do TextoRico
    texto: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card-sinal {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 1rem;
  row-gap: 0.25rem;
  padding: 1rem 1.25rem;
  border-radius: 20px;
  border: 2px solid var(--cor-laranja-claro);
  background: #fff;

  @media (min-width: $breakpoint-sm-min) {
    grid-template-columns: auto minmax(0, 12rem) 1fr;
  }
}

.card-sinal__icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--cor-laranja-claro);
  color: var(--cor-destaque-texto);
  font-size: 28px;

  // No celular, o ícone ocupa as duas linhas (título e frase)
  grid-row: span 2;

  @media (min-width: $breakpoint-sm-min) {
    grid-row: auto;
  }
}

.card-sinal__titulo {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
}

.card-sinal__texto {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.4;
}
</style>
