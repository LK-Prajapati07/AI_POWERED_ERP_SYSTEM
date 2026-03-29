
import { problemModel } from "../model/problem.model";
export const createProblem = async (problemData) => {
    try {
        const {
            title,
            description,
            inputFormat,
            outputFormat,
            constraints,
            sampleInput,
            sampleOutput,
            testCases,
        } = problemData;
       
        if (
            !title ||
            !description ||
            !inputFormat ||
            !outputFormat ||
            !constraints ||
            !sampleInput ||
            !sampleOutput ||
            !testCases
        ) {
            throw new Error("All required fields must be provided");
        }
        const problem = new problemModel({
            title,
            description,
            inputFormat,
            outputFormat,
            constraints,
            sampleInput,
            sampleOutput,
            testCases,
        });
        await problem.save();
        return problem;


    } catch (error) {
        throw error;
    }
}

export const getAllProblems = async () => {
    try {
        const problems = await problemModel.find({ isDeleted: false });
        return problems;
    } catch (error) {
        throw error;
    }
}
export const getProblemById = async (problemId) => {
    try {
        const problem = await problemModel.findById(problemId);
        if (!problem || problem.isDeleted) {
            throw new Error("Problem not found");
        }
        return problem;
    }
    catch (error) {
        throw error;
    }
}
export const updateProblem = async (problemData, problemId) => {
    try {
        const problem = await problemModel.findById(problemId)
        if (!problem) {
            throw new Error("Problem not Found")
        }
        if (problemData.title !== undefined) {
            problem.title = problemData.title;
        }

        if (problemData.description !== undefined) {
            problem.description = problemData.description;
        }

        if (problemData.difficulty !== undefined) {
            problem.difficulty = problemData.difficulty;
        }

        if (problemData.memoryLimit !== undefined) {
            problem.memoryLimit = problemData.memoryLimit;
        }

        if (problemData.score !== undefined) {
            problem.score = problemData.score;
        }
        await problem.save()
        return problem
    } catch (error) {
        throw error
    }
}
export const deleteProblem = async (problemId) => {
    try {
        const problem = await problemModel.findOne({ _id: problemId, isDeleted: false })
        if (!problem) {
            throw new Error("Problem not deleted")
        }
        problem.isDeleted = true
        await problem.save()
        return problem

    } catch (error) {
        throw error
    }
}

export const getProblemsByDifficulty = async (difficulty) => {
    try {
        if (!difficulty) {
            throw new Error("Difficulty is required");
        }

        const validDifficulties = ["easy", "medium", "hard"];
        const normalizedDifficulty = difficulty.toLowerCase();

        if (!validDifficulties.includes(normalizedDifficulty)) {
            throw new Error("Invalid difficulty level");
        }

        const problems = await problemModel.find({
            difficulty: normalizedDifficulty,
            isDeleted: false,
        }).select("-testcases");

        return problems;

    } catch (error) {
        throw error;
    }
};