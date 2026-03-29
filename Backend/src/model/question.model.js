import mongoose from "mongoose";
const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },
        testCases: [
            {
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: ["mcq", "coding"],
            required: true
        },

        options: [String],     // for MCQ
        answer: String         // for MCQ
    },
    { timestamps: true }
);
export const Question = mongoose.model("Question", questionSchema);