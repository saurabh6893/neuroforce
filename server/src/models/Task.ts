import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  status: "New" | "Accepted" | "Completed" | "Failed";
  assignedTo?: string; // Employee ID
  createdBy: string; // Admin ID
  createdAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["New", "Accepted", "Completed", "Failed"],
    default: "New",
  },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITask>("Task", TaskSchema);
