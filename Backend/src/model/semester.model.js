import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // e.g. "Semester 1"
    },
    number: {
      type: Number,
      required: true, // 1,2,3...
      min: 1,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Semester = mongoose.model("Semester", semesterSchema);