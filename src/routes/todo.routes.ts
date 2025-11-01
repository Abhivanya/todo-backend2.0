import { Router } from "express";
import {
  createTodo,
  deleteTodoById,
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
router.delete("/:id", requestValidator(todoIdSchema, "params"), deleteTodoById);
export default router;
