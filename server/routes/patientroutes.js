import express from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
} from "../controllers/patientcontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolecheckmiddleware.js";

const patientrouter = express.Router();

patientrouter.post(
  "/createpatient",
  authMiddleware,
  authorizeRoles("admin", "receptionist"),
  createPatient
);

patientrouter.get(
  "/showpatient",
  authMiddleware,
  authorizeRoles("admin", "doctor", "receptionist"),
  getAllPatients
);

patientrouter.get("/:id", authMiddleware, getPatientById);

patientrouter.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "receptionist"),
  updatePatient
);

export default patientrouter;