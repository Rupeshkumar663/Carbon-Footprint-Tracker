// src/controllers/monthlyController.ts
import { Request, Response } from "express";
import Dashboardcarbon from "../models/dashboardCarbon.model";

// ================== Monthly Carbon ==================
export const getMonthlyCarbon = async (req: Request, res: Response) => {
  try {
    const data = await Dashboardcarbon.find();

    const monthlyMap: Record<string, number> = {};

    data.forEach((item) => {
      const date = new Date(item.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

      monthlyMap[key] = (monthlyMap[key] || 0) + item.carbon;
    });

    const result = Object.keys(monthlyMap).map((key) => ({
      month: key,
      carbon: Number(monthlyMap[key].toFixed(2)),
    }));

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ================== Weekly Carbon (FIXED 🔥) ==================
export const getWeeklyCarbon = async (req: Request, res: Response) => {
  try {
    const data = await Dashboardcarbon.find();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const today = new Date();

    // 🔥 start of current week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // 🔥 end = today
    const endOfWeek = new Date(today);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklyMap: Record<string, number> = {};

    data.forEach((item) => {
      const date = new Date(item.date);

      // ✅ IMPORTANT FIX (timezone issue solve)
      const localDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      if (localDate >= startOfWeek && localDate <= endOfWeek) {
        const dayName = days[localDate.getDay()];

        weeklyMap[dayName] =
          (weeklyMap[dayName] || 0) + item.carbon;
      }
    });

    const result = Object.keys(weeklyMap).map((day) => ({
      week: day,
      carbon: Number(weeklyMap[day].toFixed(2)),
    }));

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// ================== Total Carbon ==================
export const getTotalCarbon = async (req: Request, res: Response) => {
  try {
    const data = await Dashboardcarbon.find();

    const total = data.reduce((sum, item) => sum + item.carbon, 0);

    res.json({
      totalCarbon: Number(total.toFixed(2)),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};