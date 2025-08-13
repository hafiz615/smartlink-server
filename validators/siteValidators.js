import { body, query } from "express-validator";
export const siteValidator = [
  body("siteUrl")
    .isURL()
    .withMessage("Please provide a valid URL")
    .notEmpty()
    .withMessage("Site URL is required"),
  body("title")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
  body("category")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Category must be between 1 and 100 characters"),
  body("coverImage")
    .optional()
    .custom((value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch (error) {
        throw new Error("Cover image must be a valid URL");
      }
    }),
];

export const bulkDeleteValidator = [
  body("ids")
    .isArray({ min: 1 })
    .withMessage("IDs must be a non-empty array")
    .custom((ids) => {
      if (!ids.every((id) => Number.isInteger(id) && id > 0)) {
        throw new Error("All IDs must be positive integers");
      }
      return true;
    }),
];

export const getSitesValidator = [
  query("search").optional().isString(),
  query("category").optional().isString(),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];
