<!--
  Caixa "Onde pedir ajuda", igual em todos os conteúdos e na página
  "Caí num golpe, e agora?" (regra em docs/plataforma.md).

  Os contatos são links: no celular, um toque já liga ou abre o WhatsApp.
-->
<template>
  <CaixaDestaque titulo="Onde pedir ajuda" icone="support">
    <p class="q-mt-none q-mb-md">
      Caiu no golpe? <strong>Ligue para o seu banco</strong> na hora, pelo
      número do verso do cartão.
    </p>

    <ul class="caixa-ajuda__contatos">
      <li v-for="contato in contatos" :key="contato.link">
        <a
          :href="contato.link"
          class="caixa-ajuda__contato"
          :target="contato.externo ? '_blank' : undefined"
          :rel="contato.externo ? 'noopener' : undefined"
        >
          <q-icon :name="contato.icone" size="28px" aria-hidden="true" />
          <span>
            <strong>{{ contato.nome }}</strong>
            <span class="caixa-ajuda__detalhe">{{ contato.detalhe }}</span>
          </span>
        </a>
      </li>
    </ul>
  </CaixaDestaque>
</template>

<script>
import CaixaDestaque from '@/components/CaixaDestaque.vue'

export default {
  name: 'CaixaAjuda',

  components: { CaixaDestaque },

  data() {
    return {
      // Fonte: Cartilha de Apoio à Pessoa Idosa (MDH, 2024)
      contatos: [
        {
          nome: 'Disque 100',
          detalhe: 'Ligação gratuita, de qualquer telefone',
          icone: 'call',
          link: 'tel:100'
        },
        {
          nome: 'WhatsApp do Disque Direitos Humanos',
          detalhe: '(61) 99611-0100',
          icone: 'chat',
          link: 'https://wa.me/5561996110100',
          externo: true
        },
        {
          nome: 'Polícia: 190',
          detalhe: 'Ou vá à delegacia mais próxima para registrar o boletim',
          icone: 'local_police',
          link: 'tel:190'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.caixa-ajuda__contatos {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.caixa-ajuda__contato {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 48px;
  padding: 0.75rem 1rem;
  border-radius: 16px;
  background: var(--cor-fundo);
  color: var(--cor-texto);
  text-decoration: none;
}

.caixa-ajuda__detalhe {
  display: block;
  font-size: 1.05rem;
}
</style>
