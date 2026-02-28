import mongoose from "mongoose";

const diagnosisLogSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },

    symptoms: {
      type: String,
    },

    aiResponse: {
      type: String,
    },

    riskLevel: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DiagnosisLog", diagnosisLogSchema);