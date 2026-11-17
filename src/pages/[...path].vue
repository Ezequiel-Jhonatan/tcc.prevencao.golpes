<!-- Página 404: qualquer rota que não existe. -->
<template>
  <div class="pagina-404 fullscreen column flex-center q-pa-md text-center">
    <q-icon name="explore_off" size="96px" aria-hidden="true" />

    <h1 class="q-mt-md">Página não encontrada</h1>

    <p class="q-mt-md q-mb-xl">
      O endereço que você abriu não existe. Não se preocupe, é só voltar para o
      início.
    </p>

    <q-btn
      to="/"
      color="primary"
      icon="home"
      label="Voltar para o início"
      no-caps
      unelevated
      class="botao-principal"
    />
  </div>
</template>

<script>
export default {
  name: 'PaginaNaoEncontrada'
}
</script>

<style lang="scss" scoped>
.pagina-404 {
  background: var(--cor-fundo);
  color: var(--cor-texto);
}
</style>
