<!--
  Texto com marcação mínima, usado em todos os textos de conteúdo.

  Marcação aceita:
  - **negrito**
  - [[id-do-termo|texto exibido]] → palavra com a lupa do glossário

  A marcação vira elementos Vue (strong e TermoGlossario), sem v-html:
  nenhum HTML dos dados é injetado na página.
  Renderiza só elementos em linha, então pode ir dentro de <p> ou <li>.
-->
<template>
  <span>
    <template v-for="(parte, indice) in partes" :key="indice">
      <component :is="parte.negrito ? 'strong' : 'span'">
        <TermoGlossario
          v-if="parte.termoId"
          :termo-id="parte.termoId"
          :texto="parte.texto"
        />
        <template v-else>{{ parte.texto }}</template>
      </component>
    </template>
  </span>
</template>

<script>
import TermoGlossario from '@/components/TermoGlossario.vue'

// Separa os trechos em negrito: "a **b** c" → ["a ", "**b**", " c"]
const REGEX_NEGRITO = /(\*\*.+?\*\*)/g

// Separa os termos do glossário: "o [[sms|SMS]]" → ["o ", "[[sms|SMS]]", ""]
const REGEX_TERMO = /(\[\[[^\]|]+\|[^\]]+\]\])/g

export default {
  name: 'TextoRico',

  components: { TermoGlossario },

  props: {
    // Texto com a marcação descrita no topo do arquivo
    texto: {
      type: String,
      required: true
    }
  },

  computed: {
    /**
     * Lista de partes do texto, na ordem, no formato
     * { texto, negrito, termoId }. termoId só existe nos termos do glossário.
     * O negrito é processado primeiro para permitir **[[termo|texto]]**.
     */
    partes() {
      const partes = []

      for (const trecho of this.texto.split(REGEX_NEGRITO)) {
        if (!trecho) continue

        const negrito = trecho.startsWith('**') && trecho.endsWith('**')
        const conteudo = negrito ? trecho.slice(2, -2) : trecho

        for (const pedaco of conteudo.split(REGEX_TERMO)) {
          if (!pedaco) continue

          if (pedaco.startsWith('[[')) {
            const [termoId, texto] = pedaco.slice(2, -2).split('|')
            partes.push({ texto, negrito, termoId })
          } else {
            partes.push({ texto: pedaco, negrito })
          }
        }
      }

      return partes
    }
  }
}
</script>
