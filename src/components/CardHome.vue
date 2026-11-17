<!--
  Card da Home.

  Único componente de card da tela inicial. Atende duas variantes:
  - "conteudo": card de um golpe, vertical, com mancha colorida atrás do
    ícone e selo "Concluído" quando o conteúdo já foi concluído;
  - "especial": cards de ajuda (Glossário, Caí num golpe), horizontais e
    sem selo, porque não contam no progresso.

  Estados (orientação de 16/11/2026): enquanto o conteúdo não foi
  concluído, o card fica claro e a cor de identidade aparece só na mancha
  do ícone. Só o card concluído ganha a cor cheia, então "colorido"
  significa "feito". Os cards de ajuda nunca são concluídos e por isso
  ficam sempre claros.

  O card inteiro é um único link (router-link), e não um botão dentro do
  card: a área de toque fica grande e a navegação por teclado é direta.
-->
<template>
  <router-link
    :to="para"
    class="card-home"
    :class="[`card-home--${variante}`, { 'card-home--concluido': concluido }]"
    :style="{ '--cor-card': corIdentidade }"
    :aria-label="rotuloAcessivel"
  >
    <span class="card-home__mancha" aria-hidden="true">
      <q-icon :name="icone" class="card-home__icone" />
    </span>

    <span class="card-home__textos">
      <span class="card-home__titulo">{{ titulo }}</span>
      <span v-if="descricao" class="card-home__descricao">
        {{ descricao }}
      </span>
    </span>

    <SeloConcluido v-if="concluido" class="card-home__selo" />

    <!-- Convite visível em quem ainda não fez o conteúdo -->
    <span
      v-else-if="variante === 'conteudo'"
      class="card-home__comecar"
      aria-hidden="true"
    >
      Começar ›
    </span>
  </router-link>
</template>

<script>
import SeloConcluido from '@/components/SeloConcluido.vue'

// Cores de identidade aceitas (definidas como variáveis CSS em app.scss).
const CORES = ['laranja', 'salvia', 'lilas', 'azul', 'rosa', 'amarelo']

export default {
  name: 'CardHome',

  components: { SeloConcluido },

  props: {
    // Título exibido em destaque
    titulo: {
      type: String,
      required: true
    },

    // Frase curta abaixo do título
    descricao: {
      type: String,
      default: ''
    },

    // Nome do ícone Material
    icone: {
      type: String,
      required: true
    },

    // Cor de identidade do card
    cor: {
      type: String,
      default: 'laranja',
      validator: valor => CORES.includes(valor)
    },

    // Rota de destino (string ou objeto aceito pelo router-link)
    para: {
      type: [String, Object],
      required: true
    },

    // Exibe o selo "Concluído" (só faz sentido na variante "conteudo")
    concluido: {
      type: Boolean,
      default: false
    },

    // "conteudo" (card vertical da grade) ou "especial" (card horizontal)
    variante: {
      type: String,
      default: 'conteudo',
      validator: valor => ['conteudo', 'especial'].includes(valor)
    }
  },

  computed: {
    corIdentidade() {
      return `var(--identidade-${this.cor})`
    },

    // O leitor de tela anuncia o estado junto com o título,
    // ex.: "Mensagem de Gerente do Banco, ..., concluído".
    // A pontuação final da descrição é removida para não ler ". ,".
    rotuloAcessivel() {
      const partes = [this.titulo]
      if (this.descricao) partes.push(this.descricao.replace(/[.!?]+$/, ''))
      if (this.concluido) partes.push('concluído')
      return partes.join(', ')
    }
  }
}
</script>

<style lang="scss" scoped>
// Card ainda não concluído: cinza quente bem claro (contraste no plano 03)
$card-claro: #f3eeea;
$borda-clara: #e3d8cf;

.card-home {
  position: relative;
  display: flex;
  gap: 1rem;
  height: 100%;
  padding: 1.5rem;
  border-radius: 24px;
  // Claro até concluir (ver bloco no topo do arquivo)
  border: 2px solid $borda-clara;
  background: $card-claro;
  color: var(--cor-texto);
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(74, 46, 31, 0.12);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  // Pequeno destaque ao passar o mouse; nada depende disso para funcionar.
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(74, 46, 31, 0.18);
  }

  // Concluído: o card inteiro ganha a cor de identidade.
  &--concluido {
    border-color: var(--cor-card);
    background: var(--cor-card);

    .card-home__mancha {
      background: rgba(255, 255, 255, 0.6);
    }
  }

  // Sem animação para quem pediu movimento reduzido no sistema.
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
}

// Variante "conteudo": vertical, ícone grande em cima
.card-home--conteudo {
  flex-direction: column;
  align-items: flex-start;
  min-height: 220px;

  .card-home__mancha {
    width: 88px;
    height: 88px;
    font-size: 48px;
  }
}

// Variante "especial": horizontal, ícone à esquerda
.card-home--especial {
  flex-direction: row;
  align-items: center;
  min-height: 112px;

  .card-home__mancha {
    flex-shrink: 0;
    width: 72px;
    height: 72px;
    font-size: 40px;
  }
}

// "Mancha" orgânica atrás do ícone, inspirada em docs/referencia_visual.png.
// Feita com border-radius irregular, sem imagem.
.card-home__mancha {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 58% 42% 55% 45% / 48% 60% 40% 52%;
  // Cor de identidade: mantém cada card diferente mesmo antes de concluir.
  background: var(--cor-card);
}

.card-home__textos {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.card-home__titulo {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.card-home__descricao {
  line-height: 1.5;
}

// "Começar ›" no rodapé, à direita
.card-home__comecar {
  margin-top: auto;
  align-self: flex-end;
  font-weight: 700;
  color: var(--cor-destaque-texto);
}

// Selo no canto superior direito
.card-home__selo {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
