import {
  getUserAnalytics,
  getContestAnalytics,
  getProgressAnalytics,
} from "../services/analytics.service.js";


// 📊 1. User Dashboard Analytics
export const getUserAnalyticsController = async (req, res) => {
  try {
    const userId = req.user.uid;

    const data = await getUserAnalytics(userId);

    return res.status(200).json({
      success: true,
      message: "User analytics fetched successfully",
      data,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// 🏆 2. Contest Analytics
export const getContestAnalyticsController = async (req, res) => {
  try {
    const { contestId } = req.params;

    if (!contestId) {
      throw new Error("Contest ID is required");
    }

    const data = await getContestAnalytics(contestId);

    return res.status(200).json({
      success: true,
      message: "Contest analytics fetched successfully",
      data,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



// 📈 3. Progress Analytics (Time-based)
export const getProgressAnalyticsController = async (req, res) => {
  try {
    const userId = req.user.uid;

    const { range } = req.query; // e.g. daily, weekly

    const data = await getProgressAnalytics(userId, range);

    return res.status(200).json({
      success: true,
      message: "Progress analytics fetched successfully",
      data,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};