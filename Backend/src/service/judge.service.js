import { evaluateCode } from "../services/ai.service.js";

// 🔥 Main Judge Function
export const judgeSubmission = async ({ code, language, testcases, score }) => {
  try {
    // ✅ Validation
    if (!code) throw new Error("Code is required");
    if (!language) throw new Error("Language is required");
    if (!testcases || !Array.isArray(testcases)) {
      throw new Error("Testcases are required");
    }

    // 📤 Send to AI service (FastAPI)
    const result = await evaluateCode({
      code,
      language,
      testcases,
    });

    // 🧠 Expected result from AI:
    // {
    //   status: "accepted" | "wrong_answer" | "error",
    //   output: "...",
    //   error: "...",
    //   passedTestCases,
    //   totalTestCases
    // }

    let finalScore = 0;

    // 🎯 Score logic
    if (result.status === "accepted") {
      finalScore = score || 100;
    } else {
      finalScore = 0;
    }

    return {
      status: result.status,
      output: result.output,
      error: result.error,
      passedTestCases: result.passedTestCases,
      totalTestCases: result.totalTestCases,
      score: finalScore,
    };

  } catch (error) {
    throw error;
  }
};