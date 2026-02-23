import express from "express";
const router = express.Router();
import { placeOrder, getOrders, getOrderById } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";

router.use(protect);

router.post("/place", placeOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;
