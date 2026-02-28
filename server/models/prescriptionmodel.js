import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    medicines: [
      {
        name: String,
        dosage: String,
      },
    ],

    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Prescription", prescriptionSchema);