import mongoose from "mongoose";
const notesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        fileUrl: String,
        subject: String,
        tags: [String]
    },
    { timestamps: true }
);
export const Notes = mongoose.model("Notes", notesSchema);