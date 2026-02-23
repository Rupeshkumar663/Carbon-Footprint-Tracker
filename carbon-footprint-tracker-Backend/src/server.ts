import dotenv from "dotenv";
import connectDB from "./config/Db";
import app from "./app";

dotenv.config();

const PORT: number | string = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});