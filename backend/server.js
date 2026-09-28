import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

// Load environment variables
dotenv.config();

const app = express();

// Middleware (with 50mb limit for video & image uploads)
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send({ status: "API is running", project: "Connaught Place Hisar Backend" });
});

// Port & Server Listener
const PORT = process.env.PORT || 5000;

// Connect to Database and start server
const startServer = async () => {
  try {
    await connectDB();
    await seedInitialAdmin();
    await seedInitialTestimonials();
    await seedInitialFaqs();
    await seedInitialGallery();


    const server = app.listen(PORT, () => {
      console.log(`[Server] Server running on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`[Server Error] Port ${PORT} is already in use. Please close existing process or task.`);
      } else {
        console.error("[Server Error]:", err);
      }
    });
  } catch (err) {
    console.error("[Server Error] Failed to start:", err);
  }
};

startServer();
