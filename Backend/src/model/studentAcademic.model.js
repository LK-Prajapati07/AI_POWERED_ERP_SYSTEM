import mongoose from "mongoose";

const studentAcademicSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    enrollmentYear: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate mapping
studentAcademicSchema.index({ user: 1, course: 1 }, { unique: true });

export const StudentAcademic = mongoose.model(
  "StudentAcademic",
  studentAcademicSchema
);