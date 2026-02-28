import Appointment from "../models/appointmentmodel.js";

export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      patientId: req.body.patientId,
      doctorId: req.body.doctorId,
      date: req.body.date,
      status: "pending",
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId")
      .populate("doctorId", "name role");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};