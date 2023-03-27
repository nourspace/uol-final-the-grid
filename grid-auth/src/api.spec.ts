import bcrypt from "bcrypt";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";

import app from "./index";

const graphRes = vi.fn();

vi.mock("./client", () => ({
  client: { request: vi.fn(() => graphRes()) },
}));

describe("GET /unknown", () => {
  it("should return 404", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /auth/register", () => {
  it("should return 400 on wrong input", async () => {
    const res1 = await request(app).post("/auth/register");
    expect(res1.statusCode).toBe(400);
    const res2 = await request(app)
      .post("/auth/register")
      .send({ username: "a", password: "b" });
    expect(res2.statusCode).toBe(400);
  });
  it("should return 200 with correct data", async () => {
    graphRes.mockReturnValue({ user: { id: 1 } });
    const res = await request(app).post("/auth/register").send({
      username: "myuser",
      password: "mypass",
    });
    expect(res.statusCode).toBe(200);
  });
});
describe("POST /auth/login", () => {
  it("should return 4xx on wrong input", async () => {
    const res1 = await request(app).post("/auth/login");
    expect(res1.statusCode).toBe(400);
    graphRes.mockReturnValue({
      users: [
        { id: 1, username: "john", password: await bcrypt.hash("correct", 10) },
      ],
    });
    const res2 = await request(app)
      .post("/auth/login")
      .send({ username: "john", password: "wrong" });
    expect(res2.statusCode).toBe(401);
  });

  it("should return 200 with correct data", async () => {
    graphRes.mockReturnValue({
      users: [
        { id: 1, username: "john", password: await bcrypt.hash("correct", 10) },
      ],
    });
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "john", password: "correct" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toStrictEqual({ id: 1, username: "john" });
  });
});
