import express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  getTripList,
  favoriteTrip,
  propertyList
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getallusers", verifyToken, getAllUsers);
router.get("/getuser/:userId", verifyToken, getUser);
router.put("/updateuser/:userId", verifyToken, updateUser);
router.delete("/deleteuser/:userId", verifyToken, deleteUser);
router.get('/trip/:userId', verifyToken, getTripList); // all trip that the user booked
router.put('/trip/:userId/:listingId', verifyToken, favoriteTrip); // all trip that the user liked
router.get('/property/:userId', verifyToken, propertyList); // all trip that the user created

export default router;
