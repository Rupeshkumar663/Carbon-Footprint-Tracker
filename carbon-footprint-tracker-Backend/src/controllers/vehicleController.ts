import { Request, Response } from "express";
import Vehicle from "../models/vehicle.model";

/* ===============================
   GET ALL VEHICLES
================================ */

export const getVehicles = async (
  req: Request,
  res: Response
) => {
  try {
    const vehicles = await Vehicle.find({ isActive: true });

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};