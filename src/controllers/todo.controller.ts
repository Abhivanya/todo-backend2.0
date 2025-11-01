import { Request, Response } from "express";
import Todo from "../model/todo.modal.js";

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      message: "Todos fetched successfully",
      success: true,
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
  }
};
