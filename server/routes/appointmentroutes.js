import express from "express";
import {
  createAppointment,
  getAllAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentcontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolecheckmiddleware.js";

const appointmentrouter = express.Router();

appointmentrouter.post(
  "/createappointment",
  authMiddleware,
  authorizeRoles("admin", "receptionist"),
  createAppointment
);

appointmentrouter.get(
  "/getappointment",
  authMiddleware,
  authorizeRoles("admin", "doctor", "receptionist"),
  getAllAppointments
);

appointmentrouter.put(
  "/:id",
  authMiddleware,
  updateAppointmentStatus
);

export default appointmentrouter;