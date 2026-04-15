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
git clone https://github.com/ravelnogueira/ATV-PUCPR.git
```

2. Entre na pasta do projeto:

```bash
cd APOD-PUCPPR
```

3. Abra `index.html` no navegador.

Observacao: por padrao, o projeto usa `DEMO_KEY` da NASA no arquivo `script.js`. Se quiser, troque por uma chave propria na constante `API_KEY`.

## Deploy (GitHub Pages)

Depois do merge na branch `main`, o workflow de deploy publica o site no GitHub Pages.

## API utilizada

Este projeto consome a API publica APOD da NASA:

- https://api.nasa.gov/
