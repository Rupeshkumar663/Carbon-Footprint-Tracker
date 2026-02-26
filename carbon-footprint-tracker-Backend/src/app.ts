import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import routeRoutes from "./routes/carbonRoutes"
const app=express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,              
  })
);
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/routes", routeRoutes);

export default app;