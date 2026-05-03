import { Router } from "express";
import { calculateFighterCarbonController, getfighterjetEmissionBreakdown, getfighterjetHistory, getfighterjetMonthlyChart, getfighterjetTodayCO2, getfighterjetTotalCO2, getfighterjetWeeklyChart,getfighterjetMonthlyReport, getfighterjetSmartEmission} from "../controllers/fighterjet.controller";
import authMiddleware from "../middleware/AuthMiddleware";

const router=Router()

router.post("/fighterjetcarbon",calculateFighterCarbonController)
router.get("/fighterjettotal",authMiddleware,getfighterjetTotalCO2)
router.get("/fighterjettoday",authMiddleware,getfighterjetTodayCO2)
router.get("/fighterjethistory",authMiddleware,getfighterjetHistory)
router.get("/fighterjetmonthly",authMiddleware,getfighterjetMonthlyChart)
router.get("/fighterjetweekly",authMiddleware,getfighterjetWeeklyChart)
router.get("/fighterjetbreakdown",authMiddleware,getfighterjetEmissionBreakdown)
router.get("/fighterjetreport",authMiddleware,getfighterjetMonthlyReport)
router.get("/fighterjetsmartemission",authMiddleware,getfighterjetSmartEmission)
router.get("/fighterjet",authMiddleware,getfighterjetTotalCO2)

export default router