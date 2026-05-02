import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import doctorRoutes from "./routes/doctorRoutes.js";
import chatRoutes from "./routes/chat.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ✅ START SERVER ONLY AFTER DB CONNECTS
const startServer = async () => {
    try {
        await connectDB(); // 🔥 WAIT here

        app.listen(5000, () => {
            console.log("🚀 Server running on port 5000");
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
};

startServer();