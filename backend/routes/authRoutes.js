import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import { registerUser, loginUser } from "../controllers/authController.js";



const router = express.Router();

// ✅ REGISTER PATIENT OR ADMIN
router.post("/register", registerUser);


// ✅ REGISTER DOCTOR
router.post("/register-doctor", async (req, res) => {
  try {
    const { name, email, password, specialization, location, experience } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User record
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor"
    });
    await user.save();

    // Create Doctor record
    const doctor = new Doctor({
      name,
      email,
      specialization,
      location,
      experience,
      rating: 0 // default
    });
    await doctor.save();

    res.json({ message: "Doctor registered successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ LOGIN
router.post("/login", loginUser);


export default router;