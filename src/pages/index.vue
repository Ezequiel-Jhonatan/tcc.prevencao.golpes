<!--
  Layout principal: cabeçalho simples e área das páginas.
  Envolve todas as rotas em src/pages/index/.
-->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="cabecalho">
      <q-toolbar class="conteudo-limitado cabecalho__barra">
        <router-link to="/" class="cabecalho__marca">
          <q-icon name="shield" size="36px" aria-hidden="true" />
          <span>{{ nomePlataforma }}</span>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutPrincipal',

  data() {
    return {
      // Nome provisório (questão em aberto em docs/planos/01-home.md)
      nomePlataforma: 'Proteja-se dos Golpes'
    }
  }
}
</script>

<style lang="scss" scoped>
.cabecalho {
  background: $laranja-pastel;
  // Texto marrom: branco sobre o laranja pastel não tem contraste suficiente.
  color: var(--cor-texto);
  box-shadow: 0 2px 6px rgba(74, 46, 31, 0.15);
}

.cabecalho__barra {
  min-height: 72px;
  padding: 0 1rem;
}

.cabecalho__marca {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 48px;
  color: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
}
</style>
