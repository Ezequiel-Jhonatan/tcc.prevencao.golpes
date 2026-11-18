<!--
  Card de um termo do glossário: lupa, nome do termo e explicação.
  Usado na página Glossário. A lupa é o mesmo ícone das palavras marcadas
  nos conteúdos, para a pessoa ligar uma coisa à outra.
-->
<template>
  <div class="card-termo">
    <!-- Título (h2) para o leitor de tela pular de um termo para outro -->
    <h2 class="card-termo__termo titulo-secao">
      <span class="card-termo__lupa" aria-hidden="true">
        <q-icon name="search" />
      </span>
      {{ termo }}
    </h2>

    <p class="card-termo__explicacao">{{ explicacao }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardTermo',

  props: {
    // Nome do termo (ex.: "Código de verificação")
    termo: {
      type: String,
      required: true
    },

    // Explicação em linguagem simples, vinda de src/data/glossario.js
    explicacao: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card-termo {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  // Na grade de 2 colunas, os cards da mesma linha ficam da mesma altura.
  height: 100%;
  padding: 1.25rem 1.5rem;
  border-radius: 20px;
  border: 2px solid var(--cor-laranja-claro);
  background: #fff;
}

.card-termo__termo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-termo__lupa {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--cor-laranja-claro);
  color: var(--cor-destaque-texto);
  font-size: 26px;
}

.card-termo__explicacao {
  margin: 0;
}
</style>
