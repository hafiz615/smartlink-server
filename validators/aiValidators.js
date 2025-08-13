import { body } from "express-validator";

export const generateDescriptionValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title required")
    .isLength({ max: 255 })
    .withMessage("Title too long"),

  body("category")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ max: 100 })
    .withMessage("Category name too long"),

  body("siteUrl")
    .optional()
    .isURL()
    .withMessage("Site URL must be valid if provided"),

  body("additionalContext")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Additional context too long"),
];

export const generateMultipleDescriptionValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title required")
    .isLength({ max: 255 })
    .withMessage("Title too long"),

  body("category")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ max: 100 })
    .withMessage("Category name too long"),

  body("count")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Count must be between 1 and 5"),

  body("siteUrl")
    .optional()
    .isURL()
    .withMessage("Site URL must be valid if provided"),

  body("additionalContext")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Additional context too long"),
];

export const generateTitleSuggestionsValidator = [
  body("currentTitle").notEmpty().withMessage("Current title required"),

  body("category").notEmpty().withMessage("Category required"),

  body("count")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Count must be between 1 and 10"),
];
