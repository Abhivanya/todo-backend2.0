import { Router } from "express";
import {
  createTodo,
  getAllTodo,
  getTodoById,
  updateTodoById,
} from "../controllers/todo.controller.js";
import { requestValidator } from "../middelware/requestValidator.middelware.js";
import {
  createTodoSchema,
  todoIdSchema,
  updateTodoSchema,
} from "../validation/schemaValidation.js";

const router = Router();

router.get("/", getAllTodo);
router.post("/", requestValidator(createTodoSchema), createTodo);
router.get("/:id", requestValidator(todoIdSchema, "params"), getTodoById);
router.put(
  "/:id",
  requestValidator(todoIdSchema, "params"),
  requestValidator(updateTodoSchema),
  updateTodoById
);
export default router;
