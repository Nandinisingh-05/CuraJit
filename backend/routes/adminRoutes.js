import express from "express";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

// Apply admin protection to all routes in this file
router.use(authMiddleware);
router.use(adminMiddleware);

// --- DOCTOR MANAGEMENT ---

// GET /api/admin/doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/add-doctor
router.post("/add-doctor", async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.json({ message: "Doctor added successfully", doctor: newDoctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/update-doctor/:id
router.put("/update-doctor/:id", async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/delete-doctor/:id
router.delete("/delete-doctor/:id", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- APPOINTMENT MANAGEMENT ---

// GET /api/admin/appointments
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/update-status/:id
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json({ message: `Appointment ${status}`, appointment: updatedAppointment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- USER MANAGEMENT ---

// GET /api/admin/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "patient" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DASHBOARD STATS ---

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const [doctorsCount, patientsCount, appointmentsCount] = await Promise.all([
      Doctor.countDocuments(),
      User.countDocuments({ role: "patient" }),
      Appointment.countDocuments()
    ]);

    res.json({
      doctors: doctorsCount,
      patients: patientsCount,
      appointments: appointmentsCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
