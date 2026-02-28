import Patient from "../models/patientmodel.js";
import Appointment from "../models/appointmentmodel.js";
import User from "../models/usermodel.js";

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