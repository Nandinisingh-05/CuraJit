const adminService = require('../services/adminService');

const getStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await adminService.getUserDetails(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await adminService.getAllDoctors();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const doctor = await adminService.addDoctor(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const success = await adminService.deleteDoctor(req.params.id);
    if (success) {
      res.json({ message: 'Doctor removed' });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await adminService.getAllAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedAppointment = await adminService.updateAppointmentStatus(req.params.id, status);
    
    if (updatedAppointment) {
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blockUser = async (req, res) => {
  try {
    const user = await adminService.blockUser(req.params.id);
    if (user) {
      res.json({ message: user.isBlocked ? 'User blocked' : 'User unblocked', isBlocked: user.isBlocked });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const success = await adminService.deleteUser(req.params.id);
    if (success) {
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDoctorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const doctor = await adminService.updateDoctorStatus(req.params.id, status);

    if (doctor) {
      res.json({ message: `Doctor ${status.toLowerCase()}`, verificationStatus: status });
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rescheduleAppointment = async (req, res) => {
  try {
    const { date, time } = req.body;
    const updatedAppointment = await adminService.rescheduleAppointment(req.params.id, date, time);

    if (updatedAppointment) {
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStats,
  getUsers,
  getUserDetails,
  getDoctors,
  addDoctor,
  deleteDoctor,
  getAppointments,
  updateAppointmentStatus,
  blockUser,
  deleteUser,
  updateDoctorStatus,
  rescheduleAppointment
};
