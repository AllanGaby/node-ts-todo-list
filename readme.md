# **Todo List**

> ## Como subir a Web API

#### 1. Instalar as dependências
`
npm install
`
ou
`
yarn
`

#### 2. Build da aplicação para JavaScript
`
npm run build
`
ou
`
yarn build
`

O comando build, durante o desenvolvimento, pode ser usado com a flag `watch` para que rode no build novamente a cada alteração de arquivo Typescript. O comando com a flag ficaria `build:watch`.

#### 3. Configurações necessárias

Antes de rodar a Web API, algumas configurações são necessárias:

##### 3.1 Arquivo .env

Muitas das configurações necessárias para a aplicação rodar estão dentro do arquivo `.env`. Por questão de segurança, o arquivo `.env` não é comitado no projeto, mas existe um arquivo `.env.example` com o exemplo de todas as configurações necessárias. 

##### 3.2 Conexão com o banco de dados (ormconfig.env)

Assim como o arquivo `.env`, o `ormconfig.env` não é comitado no projeto, mas existe um `ormconfig.env.example` com as variáveis necessárias para a comunicação com o banco de dados. A estrutura desse arquivo é definida pelo TypeORM e a descrição de cada variável pode ser conferida na [documentação](https://typeorm.io/#/using-ormconfig) da biblioteca

#### 4. Rodar as migrations

Com a conexão com o banco de dados definida, é preciso rodar as migrations para qua a aplicação funcione corretamente.

`
npm run typeorm migration:run
`
ou
`
yarn typeorm migration:run
`

#### 5. Rodar a aplicação
`
npm run build:server
`
ou
`
yarn build:server
`

Lembrando que a aplicação irá rodar na porta definida no arquivo `.env`