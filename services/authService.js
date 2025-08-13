import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const registerUser = async ({
  username,
  email,
  password,
  role = "user",
}) => {
  // Remove the manual checks - let Sequelize unique constraints handle it
  const newUser = await User.create({ username, email, password, role });
  const token = generateToken(newUser.id);

  return { token, user: newUser };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.checkPassword(password))) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user.id);
  return { token, user };
};

export const refreshAuthToken = (userId) => {
  return generateToken(userId);
};
