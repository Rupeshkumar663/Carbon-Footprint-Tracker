import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import carbonRoutes from "./routes/carbonRoutes"
import flightRoutes from "./routes/flight.routes"
import fighterRoutes from "./routes/fighterjet.routes"
import aiRoute from "./routes/ai.routes"
import dotenv from "dotenv"
dotenv.config()
const app=express();
const frontend_url=process.env.FRONTEND_URL ||"http://localhost:5173"
 app.use(cors({
    origin:frontend_url,
    credentials:true,              
  })
 );
 app.use(express.json());
 app.use("/api/auth",authRoutes);
 app.use("/api/carbon",carbonRoutes);
 app.use("/api/flight",flightRoutes)
 app.use("/api/fighter",fighterRoutes)
 app.use("/api/ai",aiRoute);
 
export default app;