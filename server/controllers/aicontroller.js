import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

export const adminStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalAppointments = await Appointment.countDocuments();

    res.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};