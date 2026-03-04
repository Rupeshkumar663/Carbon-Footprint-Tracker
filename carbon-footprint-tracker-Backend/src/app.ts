import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import carbonRoutes from "./routes/carbonRoutes"
import vehicleRoutes from "./routes/vehicleRoutes"
const app=express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,              
  })
);
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/carbon",carbonRoutes);
app.use("/api/vehicles",vehicleRoutes);

export default app;