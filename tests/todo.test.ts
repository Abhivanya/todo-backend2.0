import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../src/app.js";
import Todo from "../src/model/todo.modal.js";
import request from "supertest";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
});

beforeEach(async () => {
  await Todo.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/todo - GET all todos", () => {
  it("should return all todos", async () => {
    const response = await request(app).get("/api/todo");
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });
});
