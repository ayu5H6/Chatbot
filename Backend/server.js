import "dotenv/config"; 
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(5000))
  .catch(console.error);
