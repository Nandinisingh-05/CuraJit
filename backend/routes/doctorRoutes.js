import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;

  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ]
    };
  }

  const doctors = await Doctor.find(query);

  res.json(doctors);
});

export default router;