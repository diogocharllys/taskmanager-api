import request from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/lib/prisma/client";
import bcrypt from "bcryptjs";

let token: string;
let cardId: string;

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "hist@test.com",
      password: hashedPassword,
    },
  });

  const login = await request(app).post("/auth/login").send({
    email: "hist@test.com",
    password: "123456",
  });

  token = login.body.token;

  const list = await prisma.list.create({
    data: {
      title: "Lista História",
      board: {
        create: {
          name: "Quadro História",
          project: {
            create: {
              name: "Projeto História",
              team: {
                create: {
                  name: "Time História",
                },
              },
            },
          },
        },
      },
    },
  });

  const res = await request(app)
    .post("/projects/:projectId/boards/:boardId/lists/:listId/cards")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Card Histórico",
      description: "Descrição inicial",
      listId: list.id,
    });

  cardId = res.body.id;

  await request(app)
    .put(`/projects/:projectId/boards/:boardId/lists/:listId/cards/${cardId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Card Atualizado",
    });
});

describe("Histories - Integração", () => {
  it("deve listar históricos de um card", async () => {
    const res = await request(app)
      .get(
        `/projects/:projectId/boards/:boardId/lists/:listId/cards/:cardId/histories?cardId=${cardId}`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty("action");
    expect(res.body[0]).toHaveProperty("timestamp");
  });

  it("deve retornar erro ao tentar acessar histórico de card inexistente", async () => {
    const res = await request(app)
      .get(
        "/projects/:projectId/boards/:boardId/lists/:listId/cards/:cardId/histories?cardId=999"
      )
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});
