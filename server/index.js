import express from "express";
const server = express();
const port = process.env.PORT;
import loadRouter from "./routes/loads.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import asyncErrorHandler from "./middleware/errorHandler.js";
import bookingRouter from "./routes/booking.js";
import bidsController from "./routes/bid.js";
import adminRouter from "./routes/admin.js";
import path from "path";
import { fileURLToPath } from "url";
import heroRouter from "./routes/hero.js";
import serviceRoutes from "./routes/service.js";
import mongoose from "mongoose";
import contactRouter from "./routes/contact.js";
import dotenv from "dotenv";
dotenv.config();
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(`Error in connecting with database ${err}`);
  }
}

connectDb();
server.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:4173",
      "http://localhost:5173",
      "https://centralbrokerage.net",
    ],
  })
);
server.use(express.json());
server.use(cookieParser());
server.use("/api", userRouter);
server.use("/api", loadRouter);
server.use("/api", bookingRouter);
server.use("/api", bidsController);
server.use("/api", adminRouter);
server.use("/api", heroRouter);
server.use("/api", serviceRoutes);
server.use("/api", contactRouter);
server.use(asyncErrorHandler);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.resolve(__dirname, "dist")));

// server.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

server.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

server.listen(port, () => console.log(`Server is running on ${port}`));
