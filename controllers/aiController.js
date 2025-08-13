import { validationResult } from "express-validator";
import {
  getDescription,
  getMultipleDescriptions,
  getTitleSuggestions,
} from "../services/aiService.js";
import parseNumberedList from "../utils/aiParser.js";

export const generateDescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const description = await getDescription(req.body);
    res.json({ description });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: getAIErrorMessage(error) });
  }
};

export const generateMultipleDescription = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const text = await getMultipleDescriptions(req.body);
    const descriptions = parseNumberedList(text);
    res.json({ descriptions });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: getAIErrorMessage(error) });
  }
};

export const generateTitleSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const text = await getTitleSuggestions(req.body);
    const suggestions = parseNumberedList(text).filter(
      (title) => title.length <= 60
    );
    res.json({ suggestions });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: getAIErrorMessage(error) });
  }
};

const getAIErrorMessage = (error) => {
  if (error.message?.includes("API key")) return "Invalid OpenAI API key";
  if (error.message?.includes("quota") || error.message?.includes("limit"))
    return "AI service quota exceeded. Please try again later.";
  return "Failed to generate content";
};
