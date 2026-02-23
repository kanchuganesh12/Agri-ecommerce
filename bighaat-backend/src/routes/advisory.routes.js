import express from "express";
const router = express.Router();
import { getAdvisory, getCropStages, getPestAlerts } from "../controllers/advisory.controller.js";

router.get("/", getAdvisory);
router.get("/stages/:crop", getCropStages);
router.get("/pests/:crop", getPestAlerts);

export default router;
