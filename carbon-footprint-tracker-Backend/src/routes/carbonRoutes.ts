import { Router } from "express";
import {createCarbon,getAllCarbons,getCarbonById,updateCarbon,deleteCarbon,} from "../controllers/carbonController";
import authMiddleware from "../middleware/AuthMiddleware";

const router=Router();
router.post("/predict",authMiddleware,createCarbon);
router.get("/",authMiddleware,getAllCarbons);
router.get("/:id", authMiddleware,getCarbonById);
router.put("/:id", authMiddleware,updateCarbon);
router.delete("/:id",authMiddleware,deleteCarbon);

export default router;