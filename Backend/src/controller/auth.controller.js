import admin from "../config/firebase-admin.js";
import { User } from "../model/auth.model.js";

export const firebaseLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, firebase, email_verified } = decodedToken;

    const provider = firebase?.sign_in_provider;

    if (!email) {
      return res.status(400).json({ message: "Email not found in token" });
    }


    if (provider === "password" && !email_verified) {
      return res.status(403).json({
        message: "Please verify your email before login",
      });
    }


    const expiresIn = 7 * 24 * 60 * 60 * 1000;

    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("session", sessionCookie, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: expiresIn,
    });

    let user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        firebaseUID: uid,
  
        provider,
      });
    } else {
      user.name = name || user.name;
      user.email = email;
      user.lastLogin = new Date();
      await user.save();
    }

    return res.status(200).json({
      message: "Authenticated successfully",
      user,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("session");
  return res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const uid = req.user?.uid;

    if (!uid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ firebaseUID: uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);

  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};