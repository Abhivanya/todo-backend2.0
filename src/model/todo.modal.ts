import mongoose from "mongoose";
import { todoType } from "../types/types.js";

const todoSchema = new mongoose.Schema<todoType>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model<todoType>("Todo", todoSchema);
export default Todo;
