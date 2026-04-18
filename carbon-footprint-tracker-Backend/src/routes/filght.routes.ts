import express from "express";
import { FlightCarbon, getFlightHistory, getMonthlyChart, getTodayCO2, getTotalCO2, getWeeklyChart } from "../controllers/flight.controller";
import { rateLimiter } from "../middleware/ratelimiter.middleware";
import  verifyUser  from "../middleware/AuthMiddleware";

const router=express.Router();
router.get("/calculateflightcarbon",rateLimiter,FlightCarbon);
router.get("/gettotalco2",verifyUser,getTotalCO2);
router.get("/gettodayco2",verifyUser,getTodayCO2);
router.get("/getflighthistory",verifyUser,getFlightHistory);
router.get("/getmonthlychart",verifyUser,getMonthlyChart);
router.get("/getdailychart",verifyUser,getWeeklyChart);
export default router;