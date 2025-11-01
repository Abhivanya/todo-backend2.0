import { Router } from "express";
import { getAllTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getAllTodo);

export default router;
