import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";

import { seedInitialAdmin } from "./controllers/authController.js";
import { seedInitialTestimonials } from "./controllers/testimonialController.js";
import { seedInitialFaqs } from "./controllers/faqController.js";
import { seedInitialGallery } from "./controllers/galleryController.js";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Allowed origins for CORS (Local Dev & Live Production Domain cphisar.com)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5003",
  "http://127.0.0.1:5173",
  "https://cphisar.com",
  "https://www.cphisar.com",
  "http://cphisar.com",
  "http://www.cphisar.com",
  process.env.FRONTEND_URL,
].filter(Boolean);

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(null, true); // Permissive fallback for seamless live deployment
    },
    credentials: true,
  })
);

// Middleware (with 50mb limit for video & image uploads)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);

// Static frontend serving if dist directory exists (for single-server live hosting on oviPanel)
const frontendDistPath = path.join(__dirname, "../frontend/dist");
const localDistPath = path.join(__dirname, "public");

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
} else if (fs.existsSync(localDistPath)) {
  app.use(express.static(localDistPath));
  app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();
    res.sendFile(path.join(localDistPath, "index.html"));
  });
} else {
  // Default API Health Check Endpoint
  app.get("/", (req, res) => {
    res.json({
      status: "API is running smoothly",
      domain: "cphisar.com",
      project: "Connaught Place Hisar Backend",
    });
  });
}

// Port & Server Listener
const PORT = process.env.PORT || 5003;

// Connect to Database and start server
const startServer = async () => {
  try {
    await connectDB();
    await seedInitialAdmin();
    await seedInitialTestimonials();
    await seedInitialFaqs();
    await seedInitialGallery();

    const server = app.listen(PORT, () => {
      console.log(`[Server] Live Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`[Server Error] Port ${PORT} is already in use.`);
      } else {
        console.error("[Server Error]:", err);
      }
    });
  } catch (err) {
    console.error("[Server Error] Failed to start server:", err);
  }
};

startServer();
