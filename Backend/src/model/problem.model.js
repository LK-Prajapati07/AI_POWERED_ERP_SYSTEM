import mongoose from "mongoose";
const problemSchema = new mongoose.Schema({
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
        enum: ['easy', 'medium', 'hard'],
        required: true,

    },

    memoryLimit: {
        type: Number,

    },
    timeLimit: Number,
    score: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    testcases: [
        {
            input: { type: String, required: true },
            expectedOutput: { type: String, required: true },
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false

    }

},
    { timestamps: true }
)
export const Problem = mongoose.model('Problem', problemSchema)




