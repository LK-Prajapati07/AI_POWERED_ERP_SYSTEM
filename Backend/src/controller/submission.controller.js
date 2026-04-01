import { createSubmission, getUserSubmissions } from "../services/submission.service.js";

export const createSubmissionController = async (req, res) => {
  try {
    const userId = req.user.uid; // from auth middleware

    const { problemId, code, language, contestId } = req.body;

    const submission = await createSubmission({
      userId,
      problemId,
      code,
      language,
      contestId,
    });

    return res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: submission,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserSubmissionsController = async (req, res) => {
  try {
    const userId = req.user.uid;

    const submissions = await getUserSubmissions(userId);

    return res.status(200).json({
      success: true,
      data: submissions,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
