# APOD Viewer

Aplicacao web estatica para consultar o APOD (Astronomy Picture of the Day) da NASA por data.

## Funcionalidades

- Busca APOD por data selecionada
- Carregamento automatico do APOD do dia ao abrir a pagina
- Exibicao de:
  - titulo
  - data
  - descricao
  - copyright (quando disponivel)
  - midia (imagem ou video)
- Tratamento de estados da interface:
  - sem data
  - carregando
  - sucesso
  - erro
- Bloqueio de datas futuras
- Layout responsivo para desktop e mobile

## Tecnologias

- HTML
- CSS
- JavaScript puro (sem framework, sem backend)
- GitHub Actions (CI/CD)
- GitHub Pages

## Como executar localmente

1. Clone este repositorio:

```bash
git clone https://github.com/ravelnogueira/APOD_PUCPR.git
```

2. Entre na pasta do projeto:

```bash
cd APOD-PUCPPR
```

3. Abra `index.html` no navegador.

Observacao: o projeto usa chave da API da NASA no arquivo `script.js`.

## Testes unitarios

Este projeto possui testes unitarios para utilitarios de regra de negocio APOD.

Arquivos relacionados:

- `apod-utils.js`
- `tests/apod-utils.test.js`
- `package.json`

Rodar testes localmente:

```bash
npm test
```

No CI, os testes rodam automaticamente em Pull Requests para `main`.

## Deploy (GitHub Pages)

Depois do merge na branch `main`, o workflow de deploy publica o site no GitHub Pages.

## Alertas no Discord (GitHub Actions)

O workflow `.github/workflows/discord-alert.yml` envia alerta para Discord em cada `push` na branch `main`.

Para habilitar:

1. Crie um webhook no canal do Discord.
2. No GitHub, acesse:

```text
Settings > Secrets and variables > Actions > New repository secret
```

3. Crie o secret:

```text
Name: DISCORD_WEBHOOK_URL
Value: <URL do webhook do Discord>
```

## API utilizada

Este projeto consome a API publica APOD da NASA:

- https://api.nasa.gov/
