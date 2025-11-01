import { Router } from "express";
import { getAllTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/todo", getAllTodo);

export default router;
