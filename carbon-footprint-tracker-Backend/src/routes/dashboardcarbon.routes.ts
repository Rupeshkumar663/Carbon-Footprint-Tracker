import express from "express";
import {getMonthlyCarbon,getWeeklyCarbon,getTotalCarbon} from "../controllers/dashboard.controller"
const router = express.Router();

router.get("/carbon/monthly",getMonthlyCarbon);
router.get("/carbon/weekly", getWeeklyCarbon);
router.get("/carbon/total", getTotalCarbon);

export default router;