<!--
  Ilustração de um celular com uma conversa em um aplicativo de mensagens.

  Desenhada em HTML/CSS a partir de dados: as mensagens são texto de
  verdade, lidas pelo leitor de tela e nítidas com zoom.
  Reutilizável nos conteúdos e no simulado.

  Formato do celular igual ao exemplo do orientador
  (docs/exemplos/exemplo_orientador.html): moldura escura, "câmera" no
  topo e proporção de celular. O visual da conversa lembra um aplicativo
  de mensagens, mas é genérico de propósito: sem logotipo nem nome do
  WhatsApp e sem banco real.

  Variante `pagina` (simulado): mostra a página falsa que o link abriria,
  com a barra de endereço, o print do site imitado e o pedido do golpe
  (formulário) por cima, em texto de verdade.
-->
<template>
  <figure class="celular-conversa">
    <div class="celular-conversa__aparelho">
      <span class="celular-conversa__camera" aria-hidden="true" />

      <div v-if="pagina" class="celular-conversa__tela">
        <!-- Barra do navegador com o endereço falso -->
        <div class="celular-conversa__navegador">
          <span class="celular-conversa__endereco">
            <q-icon name="language" size="18px" aria-hidden="true" />
            <span class="sr-only">Endereço da página:</span>
            {{ pagina.endereco }}
          </span>
        </div>

        <div class="celular-conversa__pagina">
          <div class="celular-conversa__print">
            <img :src="pagina.imagem" :alt="pagina.descricaoImagem" />
          </div>

          <div v-if="pagina.formulario" class="celular-conversa__formulario">
            <strong class="celular-conversa__formulario-titulo">
              {{ pagina.formulario.titulo }}
            </strong>
            <p class="q-ma-none">{{ pagina.formulario.texto }}</p>

            <dl class="celular-conversa__campos">
              <div
                v-for="campo in pagina.formulario.campos"
                :key="campo.rotulo"
                class="celular-conversa__campo-site"
              >
                <dt>{{ campo.rotulo }}</dt>
                <dd>{{ campo.valor }}</dd>
              </div>
            </dl>

            <!-- Não é um botão de verdade: faz parte da ilustração -->
            <span class="celular-conversa__botao-site">
              {{ pagina.formulario.botao }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="celular-conversa__tela">
        <div class="celular-conversa__contato">
          <span class="celular-conversa__avatar" aria-hidden="true">
            <q-icon :name="contato.icone || 'account_balance'" size="22px" />
          </span>
          <span>
            <span class="celular-conversa__nome">{{ contato.nome }}</span>
            <span class="celular-conversa__status">
              {{ contato.status }}
            </span>
          </span>
        </div>

        <!-- Rolável como num aplicativo de mensagens. Quando a conversa
             passa da tela, vira parada do Tab para rolar pelo teclado. -->
        <ol
          ref="mensagens"
          class="celular-conversa__mensagens"
          aria-label="Mensagens da conversa"
          :tabindex="rolavel ? 0 : undefined"
        >
          <li
            v-for="(mensagem, indice) in mensagens"
            :key="indice"
            class="celular-conversa__balao"
            :class="`celular-conversa__balao--${mensagem.de}`"
          >
            <!-- Identifica quem fala para o leitor de tela -->
            <span class="sr-only">{{ rotuloRemetente(mensagem.de) }}:</span>
            {{ mensagem.texto }}
          </li>
        </ol>

        <!-- Barra de digitação falsa: só reforça que é um celular -->
        <div class="celular-conversa__digitacao" aria-hidden="true">
          <span class="celular-conversa__campo">Mensagem</span>
          <span class="celular-conversa__enviar">
            <q-icon name="send" size="18px" />
          </span>
        </div>
      </div>
    </div>

    <figcaption v-if="legenda" class="celular-conversa__legenda">
      {{ legenda }}
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'CelularConversa',

  props: {
    // Contato no topo da conversa: { nome, status, icone? }
    contato: {
      type: Object,
      required: true
    },

    // Mensagens em ordem: { de: 'golpista' | 'vitima', texto }
    mensagens: {
      type: Array,
      required: true
    },

    // Texto abaixo da ilustração (também descreve a figura)
    legenda: {
      type: String,
      default: ''
    },

    // Página aberta no lugar da conversa (formato em src/data/conteudos/index.js)
    pagina: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      // A conversa passa da altura da tela (precisa rolar)
      rolavel: false,
      // Quantas mensagens já estavam na tela, para achar a primeira nova
      quantidadeExibida: this.mensagens.length
    }
  },

  watch: {
    // O simulado acrescenta mensagens na mesma lista (push) e troca a
    // lista inteira ao reiniciar; por isso o watch é profundo.
    mensagens: {
      handler(novas, antigas) {
        const primeiraNova = novas === antigas ? this.quantidadeExibida : 0
        this.quantidadeExibida = novas.length
        this.$nextTick(() => this.rolarAte(primeiraNova))
      },
      deep: true
    }
  },

  mounted() {
    this.rolarAte(0)
  },

  methods: {
    rotuloRemetente(de) {
      return de === 'vitima' ? 'Você' : this.contato.nome
    },

    // Rola até o fim da conversa, como num aplicativo de mensagens, mas
    // sem deixar a primeira mensagem nova escondida acima: se as novas não
    // couberem, a leitura começa por ela. O navegador limita o valor ao
    // fim da lista.
    rolarAte(indice) {
      const lista = this.$refs.mensagens
      // Na variante `pagina` não há conversa
      if (!lista) return

      this.rolavel = lista.scrollHeight > lista.clientHeight

      const balao = lista.children[indice]
      if (!balao) return
      lista.scrollTop = balao.offsetTop - lista.firstElementChild.offsetTop
    }
  }
}
</script>

<style lang="scss" scoped>
// Cores do "aplicativo de mensagens" (contrastes em docs/planos/02-...md)
$cor-cabecalho: #1f6f5c; // texto branco: 6,0:1
$cor-fundo-conversa: #efe7dd;
$cor-balao-vitima: #dcf8c6; // texto marrom: 10,7:1

.celular-conversa {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

// Moldura do aparelho. A proporção 1:2 dá o formato de celular e mantém o
// tamanho fixo: a conversa rola dentro da tela. Se o cabeçalho, a barra de
// digitação ou a página falsa crescerem (zoom), o aparelho cresce junto em
// vez de cortar.
.celular-conversa__aparelho {
  position: relative;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1 / 2;
  padding: 10px;
  border: 6px solid #111;
  border-radius: 40px;
  background: #222;
  box-shadow: 0 16px 32px rgba(74, 46, 31, 0.25);
}

.celular-conversa__camera {
  position: absolute;
  top: 10px;
  left: 50%;
  z-index: 1;
  width: 90px;
  height: 20px;
  border-radius: 0 0 12px 12px;
  background: #111;
  transform: translateX(-50%);
}

.celular-conversa__tela {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 28px;
  background: $cor-fundo-conversa;
}

.celular-conversa__contato {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  // Espaço extra no topo para a "câmera"
  padding: 1.75rem 1rem 0.75rem;
  background: $cor-cabecalho;
  color: #fff;
  line-height: 1.2;
}

.celular-conversa__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #cfe0f2;
  color: #4a2e1f;
}

.celular-conversa__nome {
  display: block;
  font-size: 1.05rem;
  font-weight: 700;
}

.celular-conversa__status {
  display: block;
  font-size: 0.875rem;
}

.celular-conversa__mensagens {
  // Base para o offsetTop dos balões usado na rolagem automática
  position: relative;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 0;
  margin: 0;
  padding: 1rem 0.75rem;
  overflow-y: auto;
  // Fina, mas visível: avisa que há mais mensagens acima
  scrollbar-width: thin;
  // Sem isso, o tamanho das mensagens entra na altura mínima do aparelho e
  // o aspect-ratio deixa o celular esticar a cada mensagem nova.
  contain: size;
  list-style: none;

  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }

  // A tela corta o que passa da borda (overflow: hidden): contorno por dentro
  &:focus-visible {
    outline-offset: -3px;
  }
}

.celular-conversa__balao {
  max-width: 85%;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  color: #4a2e1f;
  font-size: 1rem;
  line-height: 1.4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);

  &--golpista {
    align-self: flex-start;
    background: #fff;
    border-top-left-radius: 2px;
  }

  &--vitima {
    align-self: flex-end;
    background: $cor-balao-vitima;
    border-top-right-radius: 2px;
  }
}

.celular-conversa__digitacao {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem 0.9rem;
}

.celular-conversa__campo {
  flex: 1;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: #fff;
  color: #7a5240;
  font-size: 0.95rem;
}

.celular-conversa__enviar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: $cor-cabecalho;
  color: #fff;
}

.celular-conversa__legenda {
  font-size: 1rem;
  font-style: italic;
  color: var(--cor-texto-secundario);
  text-align: center;
}

// ---- Variante `pagina`: navegador com a página falsa ----

// Cinza claro de navegador; o texto escuro fica acima de 12:1.
.celular-conversa__navegador {
  // Espaço extra no topo para a "câmera", como no cabeçalho da conversa
  padding: 1.75rem 0.75rem 0.6rem;
  background: #ececec;
}

.celular-conversa__endereco {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: #fff;
  color: #333;
  font-size: 0.875rem;
  // Endereço longo quebra em vez de vazar da tela
  overflow-wrap: anywhere;
}

// Print em cima e formulário embaixo, no fluxo normal: com zoom, o
// formulário cresce, o print encolhe até o mínimo e o aparelho cresce.
.celular-conversa__pagina {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: #fff;
}

.celular-conversa__print {
  position: relative;
  flex: 1 1 0;
  min-height: 150px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  // Véu escuro: o formulário parece uma janela aberta por cima do site
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }
}

.celular-conversa__formulario {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: -16px;
  padding: 0.75rem 0.75rem 1rem;
  border-radius: 16px 16px 0 0;
  background: #fff;
  color: #222;
  font-size: 1rem;
  line-height: 1.3;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
}

.celular-conversa__formulario-titulo {
  font-size: 1.05rem;
}

// O primeiro campo (número do cartão) ocupa a linha toda; os outros ficam
// em pares, para sobrar espaço para o print do site.
.celular-conversa__campos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
  margin: 0;
}

// Coluna com a caixa embaixo: se um rótulo quebrar em duas linhas
// ("Código de segurança"), as caixas do par continuam alinhadas.
.celular-conversa__campo-site {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 0;

  &:first-child {
    grid-column: 1 / -1;
  }

  dt {
    font-size: 0.875rem;
    color: #555; // 7,5:1 sobre o branco
  }

  dd {
    margin: 0;
    padding: 0.2rem 0.5rem;
    border: 1px solid #999;
    border-radius: 6px;
    white-space: nowrap;
  }
}

// Vermelho escuro, parecido com os botões do site imitado (branco: 6,5:1)
.celular-conversa__botao-site {
  padding: 0.4rem;
  border-radius: 999px;
  background: #b3261e;
  color: #fff;
  font-weight: 700;
  text-align: center;
}
</style>
