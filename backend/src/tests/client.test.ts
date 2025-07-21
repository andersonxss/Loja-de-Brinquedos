import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";

let token: string;

beforeAll(async () => {
  await AppDataSource.initialize();
  // Cria usuário de teste se não existir
  await request(app).post("/api/users").send({
    nome: "Usuário Teste",
    email: "user21@gmail.com",
    password: "123456",
  });
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: "user21@gmail.com", password: "123456" });
  token = res.body.token;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Client API", () => {
  let clientId: number;

  it("deve criar um cliente", async () => {
    const res = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Cliente Teste",
        email: "cliente@teste.com",
        dataNascimento: "2000-01-01",
      });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    clientId = res.body.id;
  });

  it("deve listar clientes", async () => {
    const res = await request(app)
      .get("/api/clients")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve atualizar um cliente", async () => {
    const res = await request(app)
      .put(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Cliente Atualizado" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Cliente Atualizado");
  });

  it("deve deletar um cliente", async () => {
    const res = await request(app)
      .delete(`/api/clients/${clientId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
