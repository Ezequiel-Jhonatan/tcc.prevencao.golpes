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
-->
<template>
  <figure class="celular-conversa">
    <div class="celular-conversa__aparelho">
      <span class="celular-conversa__camera" aria-hidden="true" />

      <div class="celular-conversa__tela">
        <div class="celular-conversa__contato">
          <span class="celular-conversa__avatar" aria-hidden="true">
            <q-icon name="account_balance" size="22px" />
          </span>
          <span>
            <span class="celular-conversa__nome">{{ contato.nome }}</span>
            <span class="celular-conversa__status">
              {{ contato.status }}
            </span>
          </span>
        </div>

        <ol class="celular-conversa__mensagens">
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
    // Contato no topo da conversa: { nome, status }
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
    }
  },

  methods: {
    rotuloRemetente(de) {
      return de === 'vitima' ? 'Você' : this.contato.nome
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

// Moldura do aparelho. A proporção 1:2 dá o formato de celular; se o
// texto crescer (zoom), o aparelho cresce junto em vez de cortar.
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
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 1rem 0.75rem;
  list-style: none;
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
</style>
