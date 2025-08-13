import { validationResult } from "express-validator";
import {
  registerUser,
  loginUser,
  refreshAuthToken,
} from "../services/authService.js";
import { handleSequelizeError } from "../utils/errorHandler.js";

export const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { token, user } = await registerUser(req.body);
    res.status(201).json({ token, user: user.toJSON() });
  } catch (error) {
    console.error(error);
    const errResponse = handleSequelizeError(error);
    res.status(errResponse.status).json(errResponse);
  }
};

export const logIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { token, user } = await loginUser(req.body);
    res.json({ token, user: user.toJSON() });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message || "Server error" });
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user.toJSON() });
};

export const refreshToken = async (req, res) => {
  try {
    const token = refreshAuthToken(req.user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
