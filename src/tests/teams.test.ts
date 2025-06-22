import request from "supertest";
import app from "../../src/app";

describe("Times - Integração", () => {
  let token: string;
  let teamId: string;

  beforeAll(async () => {
    const user = await request(app).post("/auth/register").send({
      name: "User Team",
      email: "team@test.com",
      password: "123456",
    });

    const res = await request(app).post("/auth/login").send({
      email: "team@test.com",
      password: "123456",
    });

    token = res.body.token;
  });

  it("deve criar um time", async () => {
    const res = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Equipe A" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Equipe A");

    teamId = res.body.id;
  });

  it("deve listar os times que o usuário pertence", async () => {
    const res = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("não deve criar time sem autenticação", async () => {
    const res = await request(app).post("/teams").send({ name: "Sem Token" });

    expect(res.status).toBe(401);
  });
});
