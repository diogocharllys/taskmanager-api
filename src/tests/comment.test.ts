import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/lib/prisma/client";
import bcrypt from "bcryptjs";

let token: string;
let cardId: string;
let commentId: string;
let authorId: string;

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const user = await prisma.user.create({
    data: {
      name: "Comment User",
      email: "comment@test.com",
      password: hashedPassword,
    },
  });
  
  authorId = user.id;

  const login = await request(app).post("/auth/login").send({
    email: "comment@test.com",
    password: "123456",
  });

  token = login.body.token;

  const list = await prisma.list.create({
    data: {
      title: "Lista p/ Comentários",
      board: {
        create: {
          name: "Quadro p/ Comentários",
          project: {
            create: {
              name: "Projeto p/ Comentários",
              team: {
                create: {
                  name: "Time Comentários",
                },
              },
            },
          },
        },
      },
    },
  });

  const card = await prisma.card.create({
    data: {
      title: "Card p/ Comentários",
      listId: list.id,
    },
  });

  cardId = card.id;
});

describe("Comments - Integração", () => {
  it("deve criar um comentário em um card", async () => {
    const res = await request(app)
      .post("/projects/:projectId/boards/:boardId/lists/:listId/cards/:cardId/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cardId,
        authorId,
        content: "Comentário de teste",
      });

    expect(res.status).toBe(201);
    expect(res.body.content).toBe("Comentário de teste");
    commentId = res.body.id;
  });

  it("deve listar comentários de um card", async () => {
    const res = await request(app)
      .get(`/projects/:projectId/boards/:boardId/lists/:listId/cards/:cardId/comments?cardId=${cardId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("deve retornar erro ao listar comentários de card inexistente", async () => {
    const res = await request(app)
      .get(`/projects/:projectId/boards/:boardId/lists/:listId/cards/:cardId/comments?cardId=nonexistentCardId`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});