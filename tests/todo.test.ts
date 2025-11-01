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
    const res = await request(app).get("/api/todo");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });
});

describe("GET /api/todos - Url not found", () => {
  it("should return 404 for non-existent route", async () => {
    const res = await request(app).get("/api/todos");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Route Not Found");
  });
});

describe("POST /api/todo - Create a new todo", () => {
  it("should create a new todo", async () => {
    const newTodo = {
      title: "Test Todo",
      completed: false,
    };

    const res = await request(app).post("/api/todo").send(newTodo);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe(newTodo.title);
  });

  it("should not create a todo with duplicate title", async () => {
    const newTodo = {
      title: "Test Todo",
      completed: false,
    };

    await request(app).post("/api/todo").send(newTodo);
    const res = await request(app).post("/api/todo").send(newTodo);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Todo with this title already exists");
  });

  it("should handle failure to create todo", async () => {
    const newTodo = {
      title: "Test Todo",
      completed: false,
    };
    const res = await request(app).post("/api/todo").send(newTodo);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe(newTodo.title);
  });
});

describe("GET /api/todo/:id - Get todo by ID", () => {
  it("should return a todo by ID", async () => {
    const newTodo = new Todo({ title: "Test Todo" });
    const savedTodo = await newTodo.save();

    const res = await request(app).get(`/api/todo/${savedTodo._id}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe(savedTodo.title);
  });

  it("should return 404 for non-existent todo", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/todo/${nonExistentId}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Todo not found");
  });
});

describe("GET /api/todo/:id - Invalid ID format", () => {
  it("should return 400 for invalid ID format", async () => {
    const invalidId = "12345";
    const res = await request(app).get(`/api/todo/${invalidId}`);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("id => Invalid todo ID format");
  });
});

describe("PUT /api/todo/:id - Update todo by ID", () => {
  it("should update a todo by ID", async () => {
    const newTodo = new Todo({ title: "Test Todo" });
    const savedTodo = await newTodo.save();

    const updates = { title: "Updated Test Todo", isComplete: true };
    const res = await request(app)
      .put(`/api/todo/${savedTodo._id}`)
      .send(updates);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe(updates.title);
    expect(res.body.data.isComplete).toBe(updates.isComplete);
  });

  it("should return 404 for updating non-existent todo", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const updates = { title: "Updated Test Todo", isComplete: true };
    const res = await request(app)
      .put(`/api/todo/${nonExistentId}`)
      .send(updates);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Todo not found");
  });
});

describe("PUT /api/todo/:id - Invalid ID format for update", () => {
  it("should return 400 for invalid ID format during update", async () => {
    const invalidId = "12345";
    const updates = { title: "Updated Test Todo", isComplete: true };
    const res = await request(app).put(`/api/todo/${invalidId}`).send(updates);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("id => Invalid todo ID format");
  });
});
