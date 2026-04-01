import { Submission } from "../models/submission.model.js";
import { Result } from "../models/result.model.js";
import { contestModel } from "../models/contest.model.js";


// 📊 1. User Analytics (Dashboard)
export const getUserAnalytics = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // 📊 Total submissions
    const totalSubmissions = await Submission.countDocuments({
      userId,
      isDeleted: false,
    });

    // ✅ Accepted submissions
    const acceptedSubmissions = await Submission.countDocuments({
      userId,
      status: "accepted",
      isDeleted: false,
    });

    // 🧾 Results
    const results = await Result.find({ user: userId });

    const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);

    const averageScore =
      results.length > 0 ? totalScore / results.length : 0;

    const bestScore =
      results.length > 0
        ? Math.max(...results.map((r) => r.score || 0))
        : 0;

    const accuracy =
      totalSubmissions > 0
        ? (acceptedSubmissions / totalSubmissions) * 100
        : 0;

    return {
      totalSubmissions,
      acceptedSubmissions,
      accuracy: Number(accuracy.toFixed(2)),
      totalScore,
      averageScore: Number(averageScore.toFixed(2)),
      bestScore,
    };

  } catch (error) {
    throw error;
  }
};



// 🏆 2. Contest Analytics
export const getContestAnalytics = async (contestId) => {
  try {
    if (!contestId) {
      throw new Error("Contest ID is required");
    }

    const contest = await contestModel.findById(contestId);

    if (!contest || contest.isDeleted) {
      throw new Error("Contest not found");
    }

    // 👥 Participants
    const totalParticipants = contest.participants.length;

    // 🧾 Results
    const results = await Result.find({ contest: contestId });

    const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);

    const averageScore =
      results.length > 0 ? totalScore / results.length : 0;

    const highestScore =
      results.length > 0
        ? Math.max(...results.map((r) => r.score || 0))
        : 0;

    return {
      totalParticipants,
      totalSubmissions: results.length,
      averageScore: Number(averageScore.toFixed(2)),
      highestScore,
    };

  } catch (error) {
    throw error;
  }
};



// 📈 3. Progress Analytics (Daily / Weekly)
export const getProgressAnalytics = async (userId, range = "daily") => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const submissions = await Submission.find({
      userId,
      isDeleted: false,
    }).sort({ createdAt: 1 });

    const dataMap = {};

    submissions.forEach((sub) => {
      const date = new Date(sub.createdAt);

      let key;

      if (range === "weekly") {
        const week = `${date.getFullYear()}-W${Math.ceil(
          date.getDate() / 7
        )}`;
        key = week;
      } else {
        key = date.toISOString().split("T")[0]; // YYYY-MM-DD
      }

      dataMap[key] = (dataMap[key] || 0) + 1;
    });

    const result = Object.keys(dataMap).map((key) => ({
      period: key,
      submissions: dataMap[key],
    }));

    return result;

  } catch (error) {
    throw error;
  }
};