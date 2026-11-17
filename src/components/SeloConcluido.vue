<!--
  Selo "Concluído".

  Mostra ícone e texto juntos: a cor nunca é o único sinal de conclusão
  (regra de acessibilidade em docs/plataforma.md).
-->
<template>
  <span class="selo-concluido">
    <q-icon name="check_circle" size="1.25em" aria-hidden="true" />
    <span>Concluído</span>
  </span>
</template>

<script>
export default {
  name: 'SeloConcluido'
}
</script>

<style lang="scss" scoped>
.selo-concluido {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--cor-concluido);
  // Branco sobre o verde tem contraste de 5,0:1.
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  white-space: nowrap;
}
</style>
