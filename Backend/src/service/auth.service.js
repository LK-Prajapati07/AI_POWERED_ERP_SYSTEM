export const createUser = async (userData) => {
  const { firebaseUID, email, name } = userData;

  try {
    
    if (!firebaseUID || !email || !name) {
      throw new Error("firebaseUID, email, and name are required");
    }

    
    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error("Invalid email format");
    }

    let user = await userModel.findOne({ firebaseUID });

    if (user) {
      if (user.isActive === false) {
        throw new Error("User account is disabled");
      }

      let isUpdated = false;

      if (user.email !== normalizedEmail) {
        user.email = normalizedEmail;
        isUpdated = true;
      }

      if (user.name !== name) {
        user.name = name;
        isUpdated = true;
      }

      if (isUpdated) {
        await user.save();
      }

      return user;
    }
    const newUser = new userModel({
      firebaseUID,
      email: normalizedEmail,
      name,
      role: "student",
    });

    await newUser.save();

    return newUser;

  } catch (error) {
    throw error; // preserve original error
  }
};