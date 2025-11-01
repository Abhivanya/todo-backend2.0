import { z } from "zod";

// Schema for validating a new task
export const createTodoSchema = z.object({
  title: z.string().min(3, "Title is required").max(100, "Title is too long"),
  isComplete: z.boolean().optional().default(false),
});

// Schema for validating task updates
export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required")
    .max(100, "Title is too long")
    .optional(),
  isComplete: z.boolean().optional(),
});

// Schema for validating task ID
export const todoIdSchema = z.object({
  id: z.string().uuid("Invalid task ID format"),
});
