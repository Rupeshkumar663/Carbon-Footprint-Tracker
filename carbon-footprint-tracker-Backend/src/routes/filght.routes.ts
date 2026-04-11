import express from "express";
import { FlightCarbon } from "../controllers/flight.controller";
import { rateLimiter } from "../middleware/ratelimiter.middleware";

const router=express.Router();
router.post("/calculateflightcarbon",rateLimiter,FlightCarbon);
export default router;