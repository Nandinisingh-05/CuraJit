import mongoose from 'mongoose';


const medicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { type: String },
  allergies: [{ type: String }],
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  medications: [{
    name: String,
    dosage: String,
    duration: String
  }],
  testReports: [{
    name: String,
    date: String
  }],
  diagnoses: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('MedicalRecord', medicalRecordSchema);

