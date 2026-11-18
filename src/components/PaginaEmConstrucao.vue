<!--
  Página provisória "Em construção".

  Usada pelas páginas que ainda não foram implementadas (conteúdos sem
  texto, simulado, Caí num golpe), para que a navegação já
  funcione.
-->
<template>
  <q-page class="q-pa-md">
    <div class="conteudo-limitado pilha items-start">
      <h1>{{ titulo }}</h1>

      <p class="q-ma-none">
        Esta página ainda está em construção. Em breve, o conteúdo estará
        disponível aqui.
      </p>

      <q-btn
        :to="voltarPara"
        color="primary"
        icon="arrow_back"
        :label="textoVoltar"
        no-caps
        unelevated
        class="botao-principal"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PaginaEmConstrucao',

  props: {
    // Título da página que será construída
    titulo: {
      type: String,
      required: true
    },

    // Rota do botão de voltar
    voltarPara: {
      type: [String, Object],
      default: '/'
    },

    // Texto do botão de voltar
    textoVoltar: {
      type: String,
      default: 'Voltar para o início'
    }
  }
}
</script>
