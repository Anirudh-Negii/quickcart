import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
