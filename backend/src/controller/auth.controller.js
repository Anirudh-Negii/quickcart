import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/auth.util.js";
import config from "../config/config.js";

// Register a new user
export async function register(req, res) {
  const { name, email, password } = req.body;
  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(409).json({
      message: "User with this email already exists",
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await userModel.create({
    name,
    email,
    passwordHash,
  });

  return res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
}

// Login an existing user
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({ userId: user._id });
  const refreshToken = createRefreshToken({ userId: user._id });

  await userModel.findByIdAndUpdate(user._id, { refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  return res.status(200).json({
    message: "User logged in successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
}
