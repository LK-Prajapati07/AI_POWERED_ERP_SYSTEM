import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["CA", "GATE", "COLLEGE"],
      required: true,
    },

    subjects: [
      {
        type: String,
      },
    ],

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
   questions: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  }
],
},
  { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);