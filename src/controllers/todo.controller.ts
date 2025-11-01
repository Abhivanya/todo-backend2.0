import { Request, Response } from "express";
import Todo from "../model/todo.modal.js";
import sendResponse from "../util/sendresponse.utils.js";

export const getAllTodo = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    sendResponse(res, 200, true, "Todos fetched successfully", todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const existingTodo = await Todo.findOne({
      title: { $regex: new RegExp(`^${req.body.title}$`, "i") },
    });

    if (existingTodo) {
      return sendResponse(
        res,
        400,
        false,
        "Todo with this title already exists",
        null
      );
    }
    const todoData = {
      title: req.body.title,
      isComplete: req.body.isComplete || false,
    };
    const newTodo = new Todo(todoData);
    const savedTodo = await newTodo.save();
    if (!savedTodo) {
      return sendResponse(res, 400, false, "Failed to create todo", null);
    }
    const { __v, ...todoRes } = savedTodo.toObject();
    sendResponse(res, 201, true, "Todo created successfully", todoRes);
  } catch (error) {
    console.error("Error creating todo:", error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return sendResponse(res, 404, false, "Todo not found", null);
    }
    sendResponse(res, 200, true, "Todo fetched successfully", todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

export const updateTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;
    // prepare update if its in the body otherwise keep existing value
    // for update both fields are optional

    const updateData: { title?: string; isComplete?: boolean } = {};
    if (req.body.title !== undefined) {
      updateData.title = req.body.title;
    }
    if (req.body.isComplete !== undefined) {
      updateData.isComplete = req.body.isComplete;
    }

    const updateTodo = await Todo.findByIdAndUpdate(todoId, updateData, {
      new: true,
    });
    if (!updateTodo) {
      return sendResponse(res, 404, false, "Todo not found", null);
    }
    sendResponse(res, 200, true, "Todo updated successfully", updateTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

export const deleteTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return sendResponse(res, 404, false, "Todo not found", null);
    }
    sendResponse(res, 200, true, "Todo deleted successfully", deletedTodo);
  } catch (error) {
    console.error("Error deleting todo:", error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};
