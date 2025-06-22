import request from "supertest";
import app from "../../src/app";

describe("Lists - Integração", () => {
  let token: string;
  let boardId: string;

  beforeAll(async () => {
    await request(app).post("/auth/register").send({
      name: "User List",
      email: "list@test.com",
      password: "123456",
    });

    const loginRes = await request(app).post("/auth/login").send({
      email: "list@test.com",
      password: "123456",
    });

    token = loginRes.body.token;

    const teamRes = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Equipe Lists" });

    const projectRes = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Projeto Lists", teamId: teamRes.body.id });

    const boardRes = await request(app)
      .post(`/projects/:projectId/boards`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Board Listado", projectId: projectRes.body.id });

    boardId = boardRes.body.id;
  });

  it("deve criar uma lista em um board", async () => {
    const res = await request(app)
      .post(`/projects/:projectId/boards/:boardId/lists`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Lista 1", boardId });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Lista 1");
  });

  it("deve listar as listas de um board", async () => {
    const res = await request(app)
      .get(`/projects/:projectId/boards/:boardId/lists?boardId=${boardId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("não deve criar lista sem autenticação", async () => {
    const res = await request(app)
      .post(`/projects/:projectId/boards/:boardId/lists`)
      .send({ title: "Sem Token", boardId });

    expect(res.status).toBe(401);
  });
});
