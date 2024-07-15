import express from "express";

import {
  createBooking,
  cancelBooking,
  getEachBooking,
  payment,
  findBooking,
} from "../controllers/bookingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createbooking", verifyToken, createBooking);
router.delete("/cancelbooking/:userId/:bookingId", verifyToken, cancelBooking);
router.get("/getEachBooking/:userId/:tripId", verifyToken, getEachBooking);
router.post("/payment", verifyToken, payment);
router.get("/findbooking/:bookingId", verifyToken, findBooking);

export default router;
