import request from "supertest";
import app from "../app";

describe("Auth API", () => {
  it("deve autenticar com credenciais válidas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@admin.com", password: "123456" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("deve rejeitar credenciais inválidas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@admin.com", password: "senhaerrada" });
    expect(res.status).toBe(401);
  });
});
