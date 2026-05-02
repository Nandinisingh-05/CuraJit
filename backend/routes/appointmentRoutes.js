import express from "express";

const router = express.Router();

// ✅ Book appointment
router.post("/", (req, res) => {
  res.json({ message: "Appointment booked (dummy for now)" });
});

// ✅ Get all appointments
router.get("/", (req, res) => {
  res.json({ message: "All appointments (dummy)" });
});

export default router;