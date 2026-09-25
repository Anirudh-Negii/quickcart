import express from "express";
import authRoutes from "../routes/auth.route.js";
import cookieParser from "cookie-parser";
import imageKitRoutes from "../routes/imagekit.routes.js";
import productRoutes from "../routes/product.routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/imagekit", imageKitRoutes);

app.use("/api/products", productRoutes);

export default app;
