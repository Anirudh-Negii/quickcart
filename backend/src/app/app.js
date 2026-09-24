import express from "express";
import authRoutes from "../routes/auth.route.js";
import cookieParser from "cookie-parser";
import imageKitRoutes from "../routes/imagekit.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/imagekit", imageKitRoutes);

export default app;
