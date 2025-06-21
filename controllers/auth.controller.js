import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRECT } from "../config/env.js";

const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRECT, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      msg: "user created successfully",
      data: { token, user: newUser[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    // 1. import email and password from req.body
    const { email, password } = req.body;
    // 2. find that user using email
    const user = await User.findOne({ email });
    // 3. throw error 404 if user not found
    if (!user) {
      const error = new Error("user not found!");
      error.statusCode = 404;
      throw error;
    }
    //  4. compare the hash password
    const isValidPassword = await bcrypt.compare(password, user.password);
    // 5. throw 401 error if password isn't valid
    if (!isValidPassword) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }
    // 6. create new token
    const token = jwt.sign({ userId: user._id }, JWT_SECRECT, {
      expiresIn: JWT_EXPIRES_IN,
    });
    // 7. Response token and user
    res.status(200).json({
      success: true,
      msg: "user signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res) => {
  res.send({ title: "Sign out" });
};

export { signIn, signOut, signUp };
