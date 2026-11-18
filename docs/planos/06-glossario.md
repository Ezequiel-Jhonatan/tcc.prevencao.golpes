# Plano de implementação: Página Glossário

> **Status:** implementado e validado (18/11/2026) · **Especificação:** [plataforma.md](../plataforma.md)

## 1. Objetivo

Trocar a página provisória "Em construção" de `/glossario` pela lista de termos, com **todas as palavras marcadas com a lupa** em "Mensagem de Gerente do Banco" e "SMS da Operadora".

## 2. Escopo

**Dentro do escopo**

- Página `src/pages/index/glossario.vue`, montada a partir de `src/data/glossario.js`.
- Componente `CardTermo` (lupa, nome do termo e explicação).

**Fora do escopo**

- Busca ou filtro: com poucos termos, a lista inteira cabe numa rolagem curta.
- Termos novos: todas as palavras marcadas nos dois conteúdos já estão no glossário.
- Ligar cada termo ao conteúdo onde ele aparece.

## 3. Termos

| Termo                  | id                    | Onde tem lupa                                                         |
| ---------------------- | --------------------- | --------------------------------------------------------------------- |
| Aplicativo oficial     | `aplicativo-oficial`  | SMS da Operadora ("Como se proteger")                                 |
| Boletim de ocorrência  | `boletim-ocorrencia`  | Simulados do gerente do banco e do SMS (explicação da certa)          |
| Código de verificação  | `codigo-verificacao`  | Gerente do banco (sinal e simulado)                                   |
| Dados vazados          | `dados-vazados`       | Nenhum texto atual; mantido pelo [plano 03](03-ajustes-orientador.md) |
| Link                   | `link`                | Gerente do banco e SMS da Operadora                                   |
| Pix                    | `pix`                 | Gerente do banco                                                      |
| Programa de fidelidade | `programa-fidelidade` | SMS da Operadora (sinal "Pressa")                                     |
| SMS                    | `sms`                 | SMS da Operadora                                                      |

## 4. Página

```
← Voltar para o início

Glossário
O significado das palavras difíceis que aparecem nos conteúdos.
Nos textos, essas palavras ficam sublinhadas e com uma lupa 🔍. Toque
nelas para ver a explicação sem sair da página.

┌───────────────────────────┐ ┌───────────────────────────┐
│ (🔍) Aplicativo oficial    │ │ (🔍) Boletim de ocorrência │
│ O aplicativo verdadeiro…  │ │ Registro que você faz…    │
└───────────────────────────┘ └───────────────────────────┘
            … (2 colunas no desktop, 1 no celular) …

               [ ⌂ Voltar para o início ]
```

- **Ordem alfabética** calculada na página (`localeCompare` com `pt-BR`), não no arquivo de dados: um termo novo entra no lugar certo sozinho.
- **Mesma fonte das lupas**: o card mostra o mesmo `termo` e a mesma `explicacao` da janela da lupa.
- Cada termo é um **título `h2`**, para o leitor de tela pular de um termo para outro, dentro de uma lista `ul` ("lista, 8 itens").
- O ícone da lupa no card é o mesmo das palavras marcadas, para a pessoa ligar uma coisa à outra.
- Um botão "Voltar para o início" no topo (igual à página de conteúdo) e outro no fim da lista, para quem rolou até o final não precisar subir.

## 5. Arquivos

| Arquivo                         | Ação       | Descrição                                    |
| ------------------------------- | ---------- | -------------------------------------------- |
| `src/pages/index/glossario.vue` | reescrever | Lista dos termos no lugar do "Em construção" |
| `src/components/CardTermo.vue`  | criar      | Card de um termo                             |
| `src/data/glossario.js`         | ajustar    | Comentário do topo (a página já existe)      |

## 6. Critérios de aceite

- [x] `/glossario` mostra os 8 termos em ordem alfabética, cada um com a lupa, o nome e a explicação.
- [x] Estão na lista todas as palavras com lupa de "Mensagem de Gerente do Banco" e "SMS da Operadora".
- [x] A explicação de um termo na página é igual à da janela da lupa no conteúdo.
- [x] O card "Glossário" da Home abre a página, e os dois botões voltam para o início.
- [x] 2 colunas em 1280px e 1 coluna em 390px.
- [x] Sem erros no console e sem rolagem horizontal em 1280px e 390px.

## 7. Validação (18/11/2026)

Feita com o Playwright em 1280×800 e 390×844, num navegador isolado: o navegador do Playwright MCP estava em uso por outra sessão.

**Primeira rodada: sem problemas**

- Os ids marcados nos dois conteúdos (`codigo-verificacao`, `pix`, `link`, `boletim-ocorrencia`, `sms`, `programa-fidelidade`, `aplicativo-oficial`) estão todos no glossário.
- A página lista os 8 termos de "Aplicativo oficial" a "SMS"; o leitor de tela anuncia "lista, 8 itens" e um título `h2` por termo.
- A explicação de "Programa de fidelidade" no card é igual à da janela da lupa em `/conteudo/sms-operadora`.
- Desktop: 2 colunas, cards da mesma linha com a mesma altura. Celular: 1 coluna, botão do fim com a largura da tela.
- Botões com 48px de altura; os dois levam para `/`.
- Console sem erros nem avisos, sem rolagem horizontal nos dois tamanhos.
