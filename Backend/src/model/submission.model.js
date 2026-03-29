import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      enum: ["python", "cpp", "java", "javascript"],
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "wrong_answer", "error"],
      default: "pending",
    },

    output: {
      type: String,
    },

    error: {
      type: String,
    },

    score: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    executionTime: Number,
    memoryUsed: Number
  },
  { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);