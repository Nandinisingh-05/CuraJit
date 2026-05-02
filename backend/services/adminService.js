const User = require('../models/User');
const Appointment = require('../models/Appointment');
const bcrypt = require('bcryptjs');

class AdminService {
  async getDashboardStats() {
    // 1. Optimize User counts using aggregation
    const userStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    let doctors = 0;
    let patients = 0;
    userStats.forEach(stat => {
      if (stat._id === 'doctor') doctors = stat.count;
      if (stat._id === 'patient') patients = stat.count;
    });

    // 2. Optimize Appointment stats (totals, revenue, and daily counts) using $facet
    const appointmentStats = await Appointment.aggregate([
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          revenue: [
            { $match: { status: 'Completed' } },
            {
              $lookup: {
                from: 'users',
                localField: 'doctorId',
                foreignField: '_id',
                as: 'doctor'
              }
            },
            { $unwind: '$doctor' },
            { $group: { _id: null, totalRevenue: { $sum: '$doctor.consultationFee' } } }
          ],
          dailyCounts: [
            { $group: { _id: '$date', count: { $sum: 1 } } },
            { $sort: { _id: -1 } },
            { $limit: 7 }
          ]
        }
      }
    ]);

    const stats = appointmentStats[0];
    const appointments = stats.totalCount[0] ? stats.totalCount[0].count : 0;
    const revenue = stats.revenue[0] ? stats.revenue[0].totalRevenue : 0;
    const dailyCounts = stats.dailyCounts;

    return { doctors, patients, appointments, revenue, dailyCounts };
  }

  async getAllUsers() {
    return await User.find({ role: 'patient' }).select('-password');
  }

  async getUserDetails(id) {
    return await User.findById(id).select('-password');
  }

  async getAllDoctors() {
    return await User.find({ role: 'doctor' }).select('-password');
  }

  async addDoctor(doctorData) {
    const { name, email, password, specialization, experience, hospital, consultationFee } = doctorData;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'doctor',
      specialization,
      experience,
      hospital,
      consultationFee
    });

    return {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
    };
  }

  async deleteDoctor(id) {
    const doctor = await User.findById(id);
    if (doctor && doctor.role === 'doctor') {
      await doctor.deleteOne();
      return true;
    }
    return false;
  }

  async getAllAppointments() {
    const appointments = await Appointment.find()
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name email');

    return appointments.map(appt => ({
      ...appt.toObject(),
      patientName: appt.patientId?.name || 'Unknown Patient',
      doctorName: appt.doctorId?.name || 'Unknown Doctor'
    }));
  }

  async updateAppointmentStatus(id, status) {
    const appointment = await Appointment.findById(id);
    if (appointment) {
      appointment.status = status;
      return await appointment.save();
    }
    return null;
  }

  async blockUser(id) {
    const user = await User.findById(id);
    if (user && user.role === 'patient') {
      user.isBlocked = !user.isBlocked;
      await user.save();
      return user;
    }
    return null;
  }

  async deleteUser(id) {
    const user = await User.findById(id);
    if (user && user.role === 'patient') {
      await user.deleteOne();
      return true;
    }
    return false;
  }

  async updateDoctorStatus(id, status) {
    const doctor = await User.findById(id);
    if (doctor && doctor.role === 'doctor') {
      doctor.verificationStatus = status;
      await doctor.save();
      return doctor;
    }
    return null;
  }

  async rescheduleAppointment(id, date, time) {
    const appointment = await Appointment.findById(id);
    if (appointment) {
      appointment.date = date;
      appointment.time = time;
      return await appointment.save();
    }
    return null;
  }
}

module.exports = new AdminService();
