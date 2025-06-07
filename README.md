# Beer Recommendation Service

Este projeto é um microserviço desenvolvido em Node.js que recomenda estilos de cerveja com base na temperatura fornecida, integrando com a API do Spotify para sugerir playlists associadas ao estilo retornado.

## Funcionalidades

- Microserviço para CRUD completo de estilos de cerveja (nome, temperatura mínima e máxima);

- Consumo de eventos via RabbitMQ para manter o cache dos estilos atualizado;

- Microserviço para recomendação de cerveja: Endpoint REST que recebe uma temperatura e retorna:
  - O estilo de cerveja ideal para aquela temperatura;
  - Uma playlist do Spotify relacionada ao nome do estilo;

## Tecnologias Utilizadas

- Node.js + Express

- TypeScript

- RabbitMQ

- MongoDB

- Spotify Web API

- Axios

- Dotenv

## Lógica de Recomendação

1. Calcula a média entre a temperatura mínima e máxima de cada estilo.

2. Compara com a temperatura recebida e seleciona o estilo com a média mais próxima.

3. Em caso de empate, retorna o estilo em ordem alfabética.

## Exemplo de Estilos

| Estilo          | Temperatura Ideal |
| --------------- | ----------------- |
| Weissbier       | -1° a 3°          |
| Pilsens         | -2° a 4°          |
| Weizenbier      | -4° a 6°          |
| Red ale         | -5° a 5°          |
| India pale ale  | -6° a 7°          |
| IPA             | -7° a 10°         |
| Dunkel          | -8° a 2°          |
| Imperial Stouts | -10° a 13°        |
| Brown ale       | 0° a 14°          |

# Como rodar o projeto

### 1. Clone o repositório

`git clone https://github.com/DaviSisnando/beer-recommendation.git`

### 2. Instale as dependências

2.1 Para recommendation-service:

```markdown
cd recommendation-service
npm install
```

2.2 Para beer-style-service:

```markdown
cd beer-style-service
npm install
```

### 3. Configure o arquivo .env

Na base de cada microserviço, temos um .env.example para você criar o seu arquivo .env

### 4. Rodando o projeto

4.1 Inicie o Docker

Utilizei o Docker para facilitar a execução do MongoDB e RabbitMQ. Na raiz do projeto, você pode iniciar os containers com o comando abaixo

```markdown
docker-compose up
```

4.2 recommendation-service

```markdown
cd recommendation-service
npm run dev
```

4.3 beer-style-service

```markdown
cd beer-style-service
npm run dev
```
