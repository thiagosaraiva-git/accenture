# Aplicativo de Análise de Logs
O Aplicativo de Análise de Logs é uma solução desenvolvida para extrair, identificar e analisar logs de servidores após um possível ataque. A aplicação fornece uma interface web para exibir logs categorizados e oferece recursos de filtragem por período e conteúdo da mensagem.

## Tecnologias Utilizadas

- **Back-end:**
  - Linguagem: [Node.js](https://nodejs.org/)
  - Framework: [Express.js](https://expressjs.com/)
  - Banco de Dados: [MongoDB](https://www.mongodb.com/)

- **Front-end:**
  - Biblioteca: [React](https://reactjs.org/)

- **Documentação:**
  - [Swagger](https://swagger.io/)

- **Contêineres:**
  - [Docker](https://www.docker.com/)

## Configuração Local

### Pré-requisitos

- Certifique-se de ter o Node.js instalado em sua máquina.

### Passos

1. **Clone o repositório;**

2. **Navegue até o diretório do projeto;**

3. **Instale as dependências do back-end:**

    ```bash
    cd api
    npm install
    ```
    
4. **Instale as dependências do front-end:**

    ```bash
    cd ../app
    npm install
    ```

5. **Inicie o servidor back-end:**

    ```bash
    cd api
    npm start
    ```

6. **Inicie o servidor front-end:**

    ```bash
    cd ../app
    npm start
    ```
    
## Executando com Docker Compose

### Pré-requisitos

- Certifique-se de ter o Docker e o Docker Compose instalados.

### Passos

1. **Clone o repositório;**

2. **Navegue até o diretório do projeto;**

3. **Execute o aplicativo usando Docker Compose:**

    ```bash
    docker compose up
    ```

## Documentação da API

A documentação da API está disponível em [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
