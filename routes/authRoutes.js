import { Router } from "express";
import {
  signUp,
  logIn,
  refreshToken,
  me,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  signUpValidator,
  logInValidator,
} from "../validators/authValidators.js";
const router = Router();

router.post("/signup", signUpValidator, signUp);
router.post("/login", logInValidator, logIn);
router.get("/me", authenticateToken, me);
router.post("/refresh", authenticateToken, refreshToken);

export default router;
