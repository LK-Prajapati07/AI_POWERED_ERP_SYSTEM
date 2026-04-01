import { Submission } from "../models/submission.model.js";
import { problemModel } from "../models/problem.model.js";

export const createSubmission = async (submitData) => {
  try {
    const { userId, problemId, code, language, contestId } = submitData;

    // ✅ Validation
    if (!userId) throw new Error("User Id is required");
    if (!problemId) throw new Error("Problem Id is required");
    if (!code) throw new Error("Code is required");
    if (!language) throw new Error("Language is required");

    // ✅ Check problem exists
    const problem = await problemModel.findById(problemId);
    if (!problem || problem.isDeleted) {
      throw new Error("Problem not found");
    }

    // ✅ Create submission
    const submission = new Submission({
      userId,
      problemId,
      contestId,
      code,
      language,
      status: "pending",
    });

    await submission.save();

    // 🔥 Call evaluation (async flow)
    await evaluateSubmission(submission._id);

    return submission;

  } catch (error) {
    throw error;
  }
};

export const evaluateSubmission = async (submissionId) => {
  try {
    if (!submissionId) {
      throw new Error("Submission ID is required");
    }

    // 🔍 Fetch submission
    const submission = await Submission.findById(submissionId);
    if (!submission || submission.isDeleted) {
      throw new Error("Submission not found");
    }

    // 🔄 Update status → running
    submission.status = "running";
    await submission.save();

    // 🔍 Fetch problem (testcases)
    const problem = await problemModel.findById(submission.problemId);

    // ⚡ TEMP LOGIC (no FastAPI yet)
    // Assume always accepted (for now)
    submission.status = "accepted";
    submission.output = "Sample Output";
    submission.score = problem.score || 100;

    await submission.save();

    return submission;

  } catch (error) {
    throw error;
  }
};

export const getUserSubmissions = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const submissions = await Submission.find({
      userId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate("problemId", "title difficulty");

    return submissions;

  } catch (error) {
    throw error;
  }
};