const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, patientInfo } = req.body;

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      date,
      time,
      patientInfo,
      status: 'Upcoming'
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') {
      query.patientId = req.user._id;
    } else if (req.user.role === 'doctor') {
      query.doctorId = req.user._id;
    }

    const appointments = await Appointment.find(query)
      .populate('doctorId', 'name specialization')
      .populate('patientId', 'name email');
      
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ensure the user owns the appointment
    if (appointment.patientId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await appointment.deleteOne();
    res.json({ message: 'Appointment removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAppointment, getAppointments, deleteAppointment };
