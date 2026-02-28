import express from "express";
import { adminStats } from "../controllers/analyticscontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import { authorizeRoles } from "../middleware/rolecheckmiddleware.js";

const analyticsrouter = express.Router();

analyticsrouter.get(
  "/admin",
  authMiddleware,
  authorizeRoles("admin"),
  adminStats
);

export default analyticsrouter;