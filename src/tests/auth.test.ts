import request from "supertest";
import app from "../../src/app";

describe("Autenticação - Integração", () => {
  const userData = {
    name: "Usuário Teste",
    email: "teste@auth.com",
    password: "123456",
  };

  it("deve registrar um novo usuário", async () => {
    const res = await request(app).post("/auth/register").send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe(userData.email);
  });

  it("deve impedir registro com e-mail já existente", async () => {
    const res = await request(app).post("/auth/register").send(userData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email já cadastrado");
  });

  it("deve permitir login com e-mail e senha válidos", async () => {
    const res = await request(app).post("/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("deve recusar login com senha incorreta", async () => {
    const res = await request(app).post("/auth/login").send({
      email: userData.email,
      password: "senhaerrada",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Credenciais inválidas");
  });

  it("deve recusar login com e-mail inexistente", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "naoexiste@teste.com",
      password: "123456",
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Credenciais inválidas");
  });
});
