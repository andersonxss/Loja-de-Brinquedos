import request from "supertest";
import app from "../app";
import { AppDataSource } from "../data-source";

let token: string;
let clientId: number;
let saleId: number;

beforeAll(async () => {
  await AppDataSource.initialize();
  // Cria usuário admin de teste se não existir
  await request(app)
    .post("/api/users")
    .send({ nome: "Admin", email: "admin@admin.com", password: "123456" });
  const authRes = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@admin.com", password: "123456" });
  token = authRes.body.token;
  // Cria um cliente para associar vendas
  const clientRes = await request(app)
    .post("/api/clients")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Cliente Venda",
      email: "venda@teste.com",
      dataNascimento: "1990-01-01",
    });

  clientId = clientRes.body.id;
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Sale API", () => {
  it("deve criar uma venda", async () => {
    const res = await request(app)
      .post("/api/sales")
      .set("Authorization", `Bearer ${token}`)
      .send({
        clientId: Number(clientId),
        value: 100,
        saleDate: "2024-01-01",
      });

    console.log(res.body); // <-- Adicionado para debug
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    saleId = res.body.id;
  });

  it("deve listar vendas", async () => {
    const res = await request(app)
      .get("/api/sales")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("deve retornar estatísticas de vendas", async () => {
    const res = await request(app)
      .get("/api/sales/stats")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.salesByDay).toBeDefined();
  });
});
