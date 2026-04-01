import { createProblem, getAllProblems } from "../services/problem.service.js";

export const createProblemController = async (req, res) => {
  try {
    const userId = req.user.uid;

    const problem = await createProblem({
      ...req.body,
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      data: problem,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllProblemsController = async (req, res) => {
  try {
    const problems = await getAllProblems();

    return res.status(200).json({
      success: true,
      data: problems,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};