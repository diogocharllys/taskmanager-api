import request from "supertest";
import app from "../app";
import { prisma } from "../lib/prisma/client";
import bcrypt from "bcryptjs";

let token: string;
let listId: string;
let cardId: string;

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    },
  });

  const loginRes = await request(app).post("/auth/login").send({
    email: "test@example.com",
    password: "123456",
  });

  token = loginRes.body.token;

  const list = await prisma.list.create({
    data: {
      title: "Lista de Teste",
      board: {
        create: {
          name: "Quadro Teste",
          project: {
            create: {
              name: "Projeto Teste",
              team: {
                create: {
                  name: "Time Teste",
                },
              },
            },
          },
        },
      },
    },
  });

  listId = list.id;
});

describe("Cards - Integração", () => {
  it("deve criar um card com sucesso", async () => {
    const res = await request(app)
      .post("/projects/:projectId/boards/:boardId/lists/:listId/cards")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Novo Card",
        description: "Descrição de teste",
        listId,
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Novo Card");
    cardId = res.body.id;
  });

  it("deve listar os cards de uma lista", async () => {
    const res = await request(app)
      .get(
        `/projects/:projectId/boards/:boardId/lists/:listId/cards?listId=${listId}`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("deve atualizar um card existente", async () => {
    const res = await request(app)
      .put(`/projects/:projectId/boards/:boardId/lists/:listId/cards/${cardId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Card Atualizado",
        description: "Descrição atualizada",
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Card Atualizado");
  });

  it("deve deletar um card", async () => {
    const res = await request(app)
      .delete(
        `/projects/:projectId/boards/:boardId/lists/:listId/cards/${cardId}`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
