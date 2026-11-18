<!--
  Página do Glossário. Rota: /glossario
  Plano: docs/planos/06-glossario.md

  Lista os termos de src/data/glossario.js, a mesma fonte das lupas dos
  conteúdos: a explicação de um termo é sempre igual nos dois lugares.
  Um termo novo no arquivo aparece aqui sem mudar a página.
-->
<template>
  <q-page class="q-pa-md">
    <div class="conteudo-limitado pilha pilha--grande">
      <q-btn
        to="/"
        flat
        no-caps
        icon="arrow_back"
        label="Voltar para o início"
        class="botao-principal self-start"
      />

      <header class="pilha">
        <h1>Glossário</h1>
        <p class="glossario__introducao">
          O significado das palavras difíceis que aparecem nos conteúdos.
        </p>
        <p class="q-ma-none">
          Nos textos, essas palavras ficam sublinhadas e com uma lupa
          <q-icon name="search" class="glossario__lupa" aria-hidden="true" />.
          Toque nelas para ver a explicação sem sair da página.
        </p>
      </header>

      <!-- 1 coluna no celular e no tablet, 2 no desktop -->
      <ul class="glossario__lista">
        <li v-for="item in termos" :key="item.id">
          <CardTermo :termo="item.termo" :explicacao="item.explicacao" />
        </li>
      </ul>

      <q-btn
        to="/"
        outline
        icon="home"
        label="Voltar para o início"
        no-caps
        class="botao-principal glossario__voltar"
      />
    </div>
  </q-page>
</template>

<script>
import CardTermo from '@/components/CardTermo.vue'
import { glossario } from '@/data/glossario'

export default {
  name: 'PaginaGlossario',

  components: { CardTermo },

  computed: {
    // Ordem alfabética calculada aqui, e não no arquivo de dados, para um
    // termo novo entrar no lugar certo. O 'pt-BR' põe "Código" junto do "C".
    termos() {
      return [...glossario].sort((a, b) =>
        a.termo.localeCompare(b.termo, 'pt-BR')
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.glossario__introducao {
  margin: 0;
  font-size: 1.375rem;
}

.glossario__lupa {
  font-size: 1.1em;
  vertical-align: -0.15em;
  color: var(--cor-destaque-texto);
}

// Lista semântica (o leitor de tela anuncia "lista" e o número de itens), sem os
// marcadores visuais.
.glossario__lista {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: $breakpoint-md-min) {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

// No celular, o botão ocupa a largura toda (alvo de toque maior).
.glossario__voltar {
  width: 100%;
  max-width: 360px;
  align-self: center;
}
</style>
