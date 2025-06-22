import request from "supertest";
import app from "../../src/app";

describe("Projetos - Integração", () => {
  let token: string;
  let teamId: string;

  beforeAll(async () => {
    const user = await request(app).post("/auth/register").send({
      name: "User Project",
      email: "project@test.com",
      password: "123456",
    });

    const resLogin = await request(app).post("/auth/login").send({
      email: "project@test.com",
      password: "123456",
    });

    token = resLogin.body.token;

    const teamRes = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Time do Projeto" });

    teamId = teamRes.body.id;
  });

  it("deve criar um projeto para o time", async () => {
    const res = await request(app)
      .post(`/projects`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Projeto 1", teamId });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Projeto 1");
  });

  it("deve listar os projetos de um time", async () => {
    const res = await request(app)
      .get(`/projects/projects?teamId=${teamId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("não deve criar projeto sem autenticação", async () => {
    const res = await request(app).post("/projects").send({
      name: "Projeto X",
      teamId,
    });

    expect(res.status).toBe(401);
  });
});
