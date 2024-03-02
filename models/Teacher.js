import mongoose from "mongoose";

const { Schema, model } = mongoose;

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    photo: String,
    lang: String,
  },
  { timestamps: true }
);

const Teacher = model("Teacher", teacherSchema);

export default Teacher;
