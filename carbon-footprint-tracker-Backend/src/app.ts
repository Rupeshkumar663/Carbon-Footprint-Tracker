import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import carbonRoutes from "./routes/carbonRoutes"
import flightRoutes from "./routes/flight.routes"
import fighterRoutes from "./routes/fighterjet.routes"
const app=express();
 app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,              
  })
 );
 app.use(express.json());
 app.use("/api/auth",authRoutes);
 app.use("/api/carbon",carbonRoutes);
 app.use("/api/flight",flightRoutes)
 app.use("/api/fighter",fighterRoutes)
export default app;