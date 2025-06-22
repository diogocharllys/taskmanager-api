# Task Manager API

API RESTful para gerenciamento de tarefas, projetos e usuários. Este projeto foi desenvolvido utilizando Node.js, TypeScript, Prisma ORM e autenticação JWT. Inclui funcionalidades como criação de times, projetos, quadros, listas, cartões, comentários e históricos.

---

## Funcionalidades

- Cadastro e autenticação de usuários
- Gerenciamento de times
- Criação e listagem de projetos
- CRUD de quadros, listas e cartões
- Adição de comentários aos cartões
- Registro de históricos de ações nos cartões
- Proteção de rotas com autenticação JWT
- Validação de dados com Zod
- Documentação interativa com Swagger

---

## Tecnologias Utilizadas

- Node.js e Express para o back-end
- TypeScript para tipagem estática
- Prisma ORM para manipulação do banco de dados MySQL
- JWT para autenticação
- Zod para validação de dados
- Swagger para documentação da API
- Jest e Supertest para testes automatizados

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 20 ou superior)
- MySQL
- Docker (opcional)

### Configuração

1. Clone o repositório:

   ```sh
   git clone https://github.com/diogocharllys/taskmanager-api.git
   cd taskmanager-api
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:

   ```env
   DATABASE_URL=mysql://root:senha@localhost:3306/taskmanagerdb
   JWT_SECRET=sua-chave-secreta
   ```

4. Rode as migrations do Prisma:
   ```sh
   npx prisma migrate deploy
   ```

### Executando o Projeto

- **Modo de Desenvolvimento**:

  ```sh
  npm run dev
  ```

- **Modo de Produção**:
  ```sh
  npm run build
  npm start
  ```

### Usando Docker

1. Suba os serviços com Docker Compose:

   ```sh
   docker-compose up
   ```

2. Acesse a API em `http://localhost:3000`.

---

## Documentação da API

Acesse a documentação interativa do Swagger em:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Testes

Execute os testes automatizados com:

```sh
npm test
```

---

## Estrutura do Projeto

```
prisma/                # Arquivos do Prisma (schema e migrations)
src/
├── @types/            # Tipos globais
├── docs/              # Configuração do Swagger
├── lib/               # Configurações de bibliotecas (ex.: Prisma)
├── middlewares/       # Middlewares (ex.: autenticação e validação)
├── modules/           # Módulos do sistema (ex.: times, projetos)
├── routes/            # Definição das rotas
└── tests/             # Testes automatizados
```

---

## Segurança

- Hash de senhas com **bcrypt**
- Autenticação via **JWT**
- Validação de dados com **Zod**

---

## Melhorias Futuras

- Recuperação de senha
- Internacionalização (i18n)
- Relatórios de tarefas e projetos
- Integração com serviços externos (ex.: notificações)

---

> Projeto desenvolvido para fins de estudo e demonstração de boas práticas no desenvolvimento de APIs modernas.
