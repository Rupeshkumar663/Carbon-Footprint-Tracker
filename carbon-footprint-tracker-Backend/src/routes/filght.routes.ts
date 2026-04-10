import express from "express";
import { FlightCarbon } from "../controllers/flight.controller";

const router=express.Router();
router.post("/calculateflightcarbon",FlightCarbon);
export default router;