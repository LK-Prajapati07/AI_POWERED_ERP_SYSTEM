import axios from "axios";

// 🔧 Base URL of your FastAPI server
const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";


// 🔥 1. Evaluate Code (MAIN FUNCTION)
export const evaluateCode = async ({ code, language, testcases }) => {
  try {
    // ✅ Validation
    if (!code) throw new Error("Code is required");
    if (!language) throw new Error("Language is required");
    if (!testcases || !Array.isArray(testcases)) {
      throw new Error("Valid testcases are required");
    }

    // 📤 Send request to FastAPI
    const response = await axios.post(`${FASTAPI_URL}/run-code`, {
      code,
      language,
      testcases,
    });

    const data = response.data;

    // ✅ Expected response from FastAPI
    // {
    //   status: "accepted" | "wrong_answer" | "error",
    //   output: "...",
    //   error: "...",
    //   passedTestCases: number,
    //   totalTestCases: number
    // }

    return {
      status: data.status,
      output: data.output,
      error: data.error,
      passedTestCases: data.passedTestCases,
      totalTestCases: data.totalTestCases,
    };

  } catch (error) {
    // ⚠️ Handle API errors
    if (error.response) {
      throw new Error(error.response.data?.message || "AI service error");
    }
    throw new Error("Failed to connect to AI service");
  }
};



// 🤖 2. Ask Question from Notes (RAG)
export const askQuestionFromNotes = async ({ question, subjectId }) => {
  try {
    if (!question) throw new Error("Question is required");

    const response = await axios.post(`${FASTAPI_URL}/rag/query`, {
      question,
      subjectId,
    });

    return response.data;

  } catch (error) {
    throw new Error("RAG service failed");
  }
};




export const generateQuestions = async ({ text }) => {
  try {
    if (!text) throw new Error("Input text is required");

    const response = await axios.post(`${FASTAPI_URL}/generate-questions`, {
      text,
    });

    return response.data;

  } catch (error) {
    throw new Error("Question generation failed");
  }
};



// 💬 4. Chatbot Response
export const chatbotResponse = async ({ message }) => {
  try {
    if (!message) throw new Error("Message is required");

    const response = await axios.post(`${FASTAPI_URL}/chat`, {
      message,
    });

    return response.data;

  } catch (error) {
    throw new Error("Chatbot service failed");
  }
};