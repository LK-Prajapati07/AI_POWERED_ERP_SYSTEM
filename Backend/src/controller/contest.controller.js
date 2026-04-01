import { createContest } from "../services/contest.service.js";

export const createContestController = async (req, res) => {
  try {
    const userId = req.user.uid;

    const contest = await createContest({
      ...req.body,
      createdBy: userId,
    });

    return res.status(201).json({
      success: true,
      data: contest,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};