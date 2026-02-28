import express from "express";
import {
  createPrescription,
  getPatientPrescriptions,
} from "../controllers/prescriptioncontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolecheckmiddleware.js";

const prescriptionrouter = express.Router();

prescriptionrouter.post(
  "/createprescription",
  authMiddleware,
  authorizeRoles("doctor"),
  createPrescription
);

prescriptionrouter.get(
  "/:patientId",
  authMiddleware,
  getPatientPrescriptions
);

export default prescriptionrouter;