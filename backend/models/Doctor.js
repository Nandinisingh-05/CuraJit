import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  specialization: String,
  location: String,
  experience: Number,
  rating: Number,
  image: String
});

export default mongoose.model("Doctor", doctorSchema);