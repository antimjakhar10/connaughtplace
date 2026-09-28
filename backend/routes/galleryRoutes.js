import express from "express";
import {
  getGalleryImages,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/galleryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getGalleryImages)
  .post(protect, admin, addGalleryImage);

router.route("/:id")
  .put(protect, admin, updateGalleryImage)
  .delete(protect, admin, deleteGalleryImage);

export default router;

