<!--
  Tela Home: saudação, instrução, grade de conteúdos e cards de ajuda.
  Planos: docs/planos/01-home.md e docs/planos/03-ajustes-orientador.md

  A barra de progresso (BarraProgresso) foi retirada por orientação do
  orientador (16/11/2026). O componente continua no projeto para voltar
  depois, se necessário.
-->
<template>
  <q-page class="q-pa-md">
    <div class="conteudo-limitado pilha pilha--grande">
      <section class="pilha">
        <h1 class="home__titulo">Olá!</h1>
        <p class="home__texto">
          Aqui você aprende a reconhecer e evitar golpes no WhatsApp e em outros
          aplicativos de mensagem.
        </p>
      </section>

      <section aria-labelledby="titulo-conteudos" class="pilha">
        <div>
          <h2 id="titulo-conteudos">Escolha um golpe para aprender</h2>
          <p class="home__instrucao">
            Cada card abaixo é um tipo de golpe. Toque ou clique em um deles
            para começar.
          </p>
        </div>

        <!-- 1 coluna no celular, 2 no tablet e 3 no desktop -->
        <ul class="grade row q-col-gutter-lg">
          <li
            v-for="conteudo in conteudos"
            :key="conteudo.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <CardHome
              :titulo="conteudo.titulo"
              :descricao="conteudo.resumo"
              :icone="conteudo.icone"
              :cor="conteudo.cor"
              :para="`/conteudo/${conteudo.id}`"
              :concluido="estaConcluido(conteudo.id)"
            />
          </li>
        </ul>
      </section>

      <section aria-labelledby="titulo-ajuda">
        <h2 id="titulo-ajuda" class="q-mb-md">Ajuda</h2>

        <ul class="grade row q-col-gutter-lg">
          <li
            v-for="card in cardsAjuda"
            :key="card.para"
            class="col-12 col-md-6"
          >
            <CardHome v-bind="card" variante="especial" />
          </li>
        </ul>
      </section>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'pinia'
import CardHome from '@/components/CardHome.vue'
import { conteudos } from '@/data/conteudos'
import { useProgressoStore } from '@/stores/progresso'

export default {
  name: 'PaginaHome',

  components: { CardHome },

  data() {
    return {
      conteudos,

      // Cards de ajuda: não são conteúdos e não contam no progresso.
      cardsAjuda: [
        {
          titulo: 'Glossário',
          descricao: 'O significado de palavras difíceis.',
          icone: 'menu_book',
          cor: 'lilas',
          para: '/glossario'
        },
        {
          titulo: 'Caí num golpe, e agora?',
          descricao: 'Saiba o que fazer e onde pedir ajuda.',
          icone: 'support',
          cor: 'rosa',
          para: '/cai-num-golpe'
        }
      ]
    }
  },

  computed: {
    ...mapState(useProgressoStore, ['estaConcluido'])
  }
}
</script>

<style lang="scss" scoped>
// Saudação e texto maiores que o padrão (orientação de 16/11/2026).
.home__titulo {
  font-size: 2.5rem;

  @media (min-width: $breakpoint-md-min) {
    font-size: 3rem;
  }
}

.home__texto {
  margin: 0;
  font-size: 1.5rem;
}

.home__instrucao {
  margin: 0.25rem 0 0;
}

// Listas semânticas (o leitor de tela anuncia "lista, 3 itens"),
// sem os marcadores visuais.
// Não zere margin-top: o q-col-gutter usa margem negativa nela.
.grade {
  margin-bottom: 0;
  padding: 0;
  list-style: none;
}
</style>
