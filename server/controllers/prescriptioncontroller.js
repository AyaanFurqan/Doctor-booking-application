import Prescription from "../models/prescriptionmodel.js";

export const createPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.create({
      patientId: req.body.patientId,
      doctorId: req.user.id,
      medicines: req.body.medicines,
      instructions: req.body.instructions,
    });

    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patientId: req.params.patientId,
    });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};