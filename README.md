<h1 align="center">Task Manager API</h1>

<p align="center">
  API REST para gestão de tarefas no estilo Kanban — times, projetos, quadros, listas, cartões e comentários — com autenticação JWT e documentação Swagger.
</p>

<p align="center">
  <a href="https://taskmanager-api-production-150f.up.railway.app/api-docs/"><img src="https://img.shields.io/badge/🔗_Live_Demo-Swagger-009688?style=for-the-badge" alt="Live Demo"/></a>
</p>

<p align="center">
  <a href="https://github.com/diogocharllys/taskmanager-api/actions/workflows/ci.yml"><img src="https://github.com/diogocharllys/taskmanager-api/actions/workflows/ci.yml/badge.svg" alt="CI"/></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white" alt="Node"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white" alt="Jest"/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License"/>
</p>

> 🔗 **Demo ao vivo:** a documentação interativa (Swagger) está disponível em
> **https://taskmanager-api-production-150f.up.railway.app/api-docs/**

---

## 📑 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Stack](#-stack)
- [Arquitetura](#-arquitetura)
- [Modelo de dados](#-modelo-de-dados)
- [Endpoints](#-endpoints)
- [Como rodar](#-como-rodar)
- [Testes](#-testes)
- [O que aprendi](#-o-que-aprendi)
- [Melhorias futuras](#-melhorias-futuras)

---

## 📋 Sobre

Esta API implementa o domínio de um gestor de tarefas no formato Kanban (inspirado em ferramentas como Trello). A hierarquia é:

```
Time → Projeto → Quadro → Lista → Cartão → Comentário
```

O projeto foi construído como estudo de **arquitetura modular**, **autenticação segura** e **testes automatizados** em uma API Node.js moderna.

---

## ✨ Funcionalidades

- 🔐 Cadastro e autenticação de usuários com JWT
- 👥 Gestão de times e membros
- 📁 Criação e listagem de projetos
- 🗂️ CRUD de quadros, listas e cartões
- 💬 Comentários nos cartões
- 🕓 Histórico de ações em cada cartão
- 🛡️ Proteção de rotas via middleware de autenticação
- ✅ Validação de dados de entrada com Zod
- 📖 Documentação interativa com Swagger

---

## 🛠️ Stack

| Camada | Tecnologias |
|--------|-------------|
| Runtime / Linguagem | Node.js 20+, TypeScript |
| Web | Express 5 |
| Banco de dados | MySQL via Prisma ORM 6 |
| Autenticação | JWT + bcryptjs |
| Validação | Zod |
| Documentação | Swagger (swagger-ui-express) |
| Testes | Jest + Supertest |
| Infra | Docker / Docker Compose |

---

## 🏗️ Arquitetura

O código segue uma organização **modular por domínio** — cada recurso é um módulo isolado com suas rotas, controller, service e validações:

```
prisma/                # Schema e migrations do Prisma
src/
├── @types/            # Tipos globais (ex.: extensão do Request com user)
├── docs/              # Configuração do Swagger
├── lib/               # Clientes de bibliotecas (ex.: Prisma)
├── middlewares/       # Autenticação JWT e validação de payload
├── modules/           # auth, team, project, board, list, card, comment, history
├── routes/            # Agregador de rotas (raiz + rotas aninhadas)
└── tests/             # Testes automatizados
```

As rotas refletem a hierarquia do domínio através de **rotas aninhadas**, por exemplo:
`/projects/:projectId/boards/:boardId/lists/:listId/cards`

---

## 🗃️ Modelo de dados

Entidades principais (Prisma):

`User` · `Team` · `TeamUser` · `Project` · `Board` · `List` · `Card` · `Comment` · `History`

`TeamUser` é a tabela de junção que representa a relação N:N entre usuários e times.

---

## 🔌 Endpoints

> Base URL local: `http://localhost:3000` · Demo: `https://taskmanager-api-production-150f.up.railway.app`

| Método | Rota | Descrição | Auth |
|--------|------|-----------|:----:|
| `POST` | `/auth/register` | Cadastra um usuário | — |
| `POST` | `/auth/login` | Autentica e retorna um JWT | — |
| `*` | `/teams` | Gestão de times | ✅ |
| `*` | `/projects` | Gestão de projetos | ✅ |
| `*` | `/projects/:projectId/boards` | Quadros de um projeto | ✅ |
| `*` | `/projects/:projectId/boards/:boardId/lists` | Listas de um quadro | ✅ |
| `*` | `.../lists/:listId/cards` | Cartões de uma lista | ✅ |
| `*` | `.../cards/:cardId/comments` | Comentários de um cartão | ✅ |
| `*` | `.../cards/:cardId/histories` | Histórico de um cartão | ✅ |

📖 A especificação completa e interativa está disponível no Swagger em **`/api-docs`** ao rodar o projeto.

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 20+
- MySQL (ou Docker)

### Local

```sh
# 1. Clone e instale
git clone https://github.com/diogocharllys/taskmanager-api.git
cd taskmanager-api
npm install

# 2. Configure o ambiente (.env)
DATABASE_URL="mysql://root:senha@localhost:3306/taskmanagerdb"
JWT_SECRET="sua-chave-secreta"

# 3. Aplique as migrations
npx prisma migrate deploy

# 4. Suba em modo desenvolvimento
npm run dev
```

### Com Docker

```sh
docker-compose up
```

A API fica disponível em `http://localhost:3000` e a documentação em `http://localhost:3000/api-docs`.

### Scripts

| Comando | Ação |
|---------|------|
| `npm run dev` | Desenvolvimento com hot-reload (ts-node-dev) |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm start` | Executa a build de produção |
| `npm test` | Roda a suíte de testes (Jest) |

---

## 🧪 Testes

```sh
npm test
```

Os testes usam **Jest + Supertest** para validar as rotas e regras de negócio dos módulos.

---

## 📚 O que aprendi

- Modelar um domínio hierárquico (time → projeto → quadro → lista → cartão) com **Prisma** e relações N:N.
- Estruturar uma API com **arquitetura modular por domínio**, mantendo cada recurso coeso e desacoplado.
- Implementar **autenticação JWT** e proteção de rotas via middleware reutilizável.
- Validar entradas de forma robusta com **Zod** antes de chegarem à camada de serviço.
- Documentar a API com **Swagger** e escrever **testes de integração** com Supertest.

---

## 🔭 Melhorias futuras

- [ ] Recuperação de senha
- [ ] Internacionalização (i18n)
- [ ] Relatórios de tarefas e projetos
- [ ] Integração com notificações externas
- [ ] Pipeline de CI (lint + testes no GitHub Actions)

---

<p align="center">
  <sub>Projeto desenvolvido para estudo e demonstração de boas práticas em APIs modernas · <a href="https://github.com/diogocharllys">@diogocharllys</a></sub>
</p>
