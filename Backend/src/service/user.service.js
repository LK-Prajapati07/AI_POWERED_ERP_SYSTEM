import { userModel } from "../model/auth.model";
import { Submission } from "../model/submission.model";
import { Result } from "../model/result.model";
export const GetUserByFirebaseUID=async(firebaseUID)=>{
    try {
    const user=await userModel.findOne({firebaseUID});
    if(!user){
        throw new Error("User not found");
    }
    return user;

    } catch (error) {
        throw error;
    }
}
export const UpdateUserProfile=async(firebaseUID,updateData)=>{
    try {
        const user=await userModel.findOne({firebaseUID});
        if(!user){
            throw new Error("User not found");
        }
        if(updateData.name){
            user.name=updateData.name;
        }
        if(updateData.avater){
            user.avater=updateData.avater;
        }
        await user.save();
        return user;

    } catch (error) {
        throw error;
    }
}
import { userModel } from "../models/user.model.js";
import { Submission } from "../models/submission.model.js";
import { Result } from "../models/result.model.js";

export const getUserDashboard = async (userId) => {
  try {
    // ✅ Validate input
    if (!userId) {
      throw new Error("User ID is required");
    }

    // 🔍 Check user exists
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // 📊 Total submissions
    const totalSubmissions = await Submission.countDocuments({
      userId: userId,
    });

    // ✅ Accepted submissions
    const acceptedSubmissions = await Submission.countDocuments({
      userId: userId,
      status: "accepted",
    });

    // 🧾 Fetch results
    const results = await Result.find({ user: userId });

    // 📊 Calculate total score
    const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);

    // 📊 Average score
    const averageScore =
      results.length > 0 ? totalScore / results.length : 0;

    // 📊 Accuracy
    const accuracy =
      totalSubmissions > 0
        ? (acceptedSubmissions / totalSubmissions) * 100
        : 0;

    // 🏆 Best score
    const bestScore =
      results.length > 0
        ? Math.max(...results.map((r) => r.score || 0))
        : 0;

    // 📦 Final response
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      stats: {
        totalSubmissions,
        acceptedSubmissions,
        accuracy: Number(accuracy.toFixed(2)),
        totalScore,
        averageScore: Number(averageScore.toFixed(2)),
        bestScore,
      },
      totalExamsOrContests: results.length,
    };
  } catch (error) {
    throw error;
  }
};

export const getUserResults=async(userId)=>{
 const results=await Result.find({user:userId}).populate("exam").populate("contest").populate("user");
    return results;   
}

// Admin function to toggle user active status
export const toggleUserStatus=async(userId)=>{
    const user=await userModel.findById(userId);
    if(!user){
        throw new Error("User not found");
    }
    user.isActive=!user.isActive;
    await user.save();
    return user;
}

