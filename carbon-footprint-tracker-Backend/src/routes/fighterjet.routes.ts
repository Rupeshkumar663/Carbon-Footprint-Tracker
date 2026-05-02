import { Router } from "express";
import { calculateFighterCarbonController, getFighterTotalCO2, } from "../controllers/fighterjet.controller";
import authMiddleware from "../middleware/AuthMiddleware";

const router=Router()

router.post("/fighterjetcarbon",calculateFighterCarbonController)
router.get("/fighterjettotal",authMiddleware,getFighterTotalCO2)

export default router