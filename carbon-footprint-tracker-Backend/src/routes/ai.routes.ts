import express from "express";
import { getAIInsights }from "../controllers/ai.controller";
const router=express.Router();
router.post("/insight",getAIInsights);
export default router;