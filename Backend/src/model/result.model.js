import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            default: null,
        },

        contest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
            default: null,
        },

        totalQuestions: {
            type: Number,
            required: true,
        },

        attemptedQuestions: {
            type: Number,
            default: 0,
        },

        correctAnswers: {
            type: Number,
            default: 0,
        },

        wrongAnswers: {
            type: Number,
            default: 0,
        },

        score: {
            type: Number,
            required: true,
        },

        maxScore: {
            type: Number,
            required: true,
        },

        percentage: {
            type: Number,
            default: 0,
        },

        timeTaken: {
            type: Number, // in seconds
        },

        rank: {
            type: Number,
            default: null,
        },

        // 🔥 Detailed question-wise performance
        answers: [
            {
                question: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question",
                },
                selectedOption: String,
                correctOption: String,
                isCorrect: Boolean,
                marksObtained: Number,
            },
        ],

        // 🧠 ML / Analytics fields
        weakTopics: [
            {
                type: String,
            },
        ],

        strongTopics: [
            {
                type: String,
            },
        ],

        improvementSuggestion: {
            type: String,
        },

        // Metadata
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        accuracy: Number,
        predictedScore: Number
    },
    { timestamps: true }
);


resultSchema.index({ user: 1 });
resultSchema.index({ exam: 1 });
resultSchema.index({ contest: 1 });

export const Result = mongoose.model("Result", resultSchema);