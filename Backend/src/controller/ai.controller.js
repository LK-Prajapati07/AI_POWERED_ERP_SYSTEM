import { generateMCQs } from "../services/ai/question.service.js";

export const getQuestions = async (req, res) => {
  try {
    const { context, difficulty } = req.body;

    const questions = await generateMCQs(context, difficulty);

    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};