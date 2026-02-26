import { Router } from "express";
import {createRoute,getAllRoutes,getRouteById,updateRoute,deleteRoute,getUserAnalytic,
} from "../controllers/carbonController";

const router=Router();

router.post("/",createRoute);
router.get("/",getAllRoutes);
router.get("/analytics/:userId",getUserAnalytic);
router.get("/:id",getRouteById);
router.put("/:id",updateRoute);
router.delete("/:id",deleteRoute);

export default router;