import express from "express";
import {
  getSitesValidator,
  bulkDeleteValidator,
  siteValidator,
} from "../validators/siteValidators.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  getSites,
  getCategories,
  addSite,
  updateSite,
  deleteSite,
  bulkDeleteSite,
} from "../controllers/siteController.js";

const router = express.Router();

router.get("/", getSitesValidator, validateRequest, getSites);
router.get("/categories", getCategories);
router.post("/", siteValidator, validateRequest, addSite);
router.put("/:id", siteValidator, validateRequest, updateSite);
router.delete("/:id", deleteSite);
router.post(
  "/bulk-delete",
  bulkDeleteValidator,
  validateRequest,
  bulkDeleteSite
);

export default router;
