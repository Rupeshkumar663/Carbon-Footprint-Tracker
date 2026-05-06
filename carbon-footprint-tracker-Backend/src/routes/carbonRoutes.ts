import { Router } from "express"
import {createCarbon,getAllCarbons,getCarbonById,updateCarbon,deleteCarbon, getcarbonMonthlyChart, getcarbonWeeklyChart, getcarbonTodayCO2, getcarbonHistory, getcarbonEmissionBreakdown, getcarbonMonthlyReport, getcarbonSmartEmission, getcarbonTotalCO2} from "../controllers/carbonController"
import authMiddleware from "../middleware/AuthMiddleware"


const router=Router()

router.post("/",authMiddleware,createCarbon)
router.get("/",authMiddleware,getAllCarbons)
router.get("/vehiclemonthly",authMiddleware,getcarbonMonthlyChart)
router.get("/carbonweekly",authMiddleware,getcarbonWeeklyChart)
router.get("/carbontoday",authMiddleware,getcarbonTodayCO2)
router.get("/carbonhistory",authMiddleware,getcarbonHistory)
router.get("/carbonbreakdown",authMiddleware,getcarbonEmissionBreakdown)
router.get("/carbonreport",authMiddleware,getcarbonMonthlyReport)
router.get("/carbonsmartemission",authMiddleware,getcarbonSmartEmission)
router.get("/carbontotal",authMiddleware,getcarbonTotalCO2)
router.get("/:id",authMiddleware,getCarbonById)
router.put("/:id",authMiddleware,updateCarbon)
router.delete("/:id",authMiddleware,deleteCarbon)
export default router