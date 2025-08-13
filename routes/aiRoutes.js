import express from "express";
import {
  generateDescription,
  generateMultipleDescription,
  generateTitleSuggestions,
} from "../controllers/aiController.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";
import {
  generateDescriptionValidator,
  generateMultipleDescriptionValidator,
  generateTitleSuggestionsValidator,
} from "../validators/aiValidators.js";

const router = express.Router();

router.post(
  "/generate-description",
  authenticateToken,
  requireAdmin,
  generateDescriptionValidator,
  generateDescription
);
router.post(
  "/generate-multiple-descriptions",
  authenticateToken,
  requireAdmin,
  generateMultipleDescriptionValidator,
  generateMultipleDescription
);
router.post(
  "/generate-title-suggestions",
  authenticateToken,
  requireAdmin,
  generateTitleSuggestionsValidator,
  generateTitleSuggestions
);

export default router;
