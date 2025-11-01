import { Document } from "mongoose";

export interface todoType extends Document {
  title: string;
  isComplete: boolean;
  createdAt: Date;
}
