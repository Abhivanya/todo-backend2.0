import mongoose from "mongoose";
import { z } from "zod";

// Schema for validating a new task
export const createTodoSchema = z.object({
  title: z
    .string({
      error: "Title must be a string",
    })
    .min(3, "Title is too short")
    .max(100, "Title is too long"),
  isComplete: z
    .boolean("Is Complete must be a boolean value")
    .optional()
    .default(false),
});

// Schema for validating task updates
export const updateTodoSchema = z.object({
  title: z
    .string("Title must be a string")
    .min(3, "Title is too short")
    .max(100, "Title is too long")
    .optional(),
  isComplete: z.boolean("Is Complete must be a boolean value").optional(),
});

// Schema for validating task ID
export const todoIdSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid todo ID format",
  }),
});
