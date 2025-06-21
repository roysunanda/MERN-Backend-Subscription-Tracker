import { User } from "../models/user.model.js";

// get all user
const getUsers = async (req, res, next) => {
  try {
    // 1. find all users
    const users = await User.find();
    // 2. Response data
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// get single user
const getUser = async (req, res, next) => {
  try {
    // 1. get single user without the password
    const user = await User.findById(req.params.id).select("-password");
    // 2. throw error 404 if user not found
    if (!user) {
      const error = new Error("User not found!");
      error.statusCode = 404;
      throw error;
    }
    // 3. response the data
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser };
