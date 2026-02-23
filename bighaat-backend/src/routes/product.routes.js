import express from "express";
const router = express.Router();
import { getProducts, getFeatured, getTrending, getProductById, createProduct } from "../controllers/product.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

router.get("/", getProducts);
router.get("/featured", getFeatured);
router.get("/trending", getTrending);
router.get("/:id", getProductById);
router.post("/", protect, adminOnly, upload.single("image"), createProduct);

export default router;
