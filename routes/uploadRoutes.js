import express from "express";

import uploadCoverImage from "../middleware/uploadMiddleware.js";
import handleCoverImageUpload from "../controllers/uploadController.js";
const router = express.Router();

router.post("/upload-cover", uploadCoverImage, handleCoverImageUpload);

export default router;
