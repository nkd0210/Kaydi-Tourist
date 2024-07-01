import express from "express";
import {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getallusers", verifyToken, getAllUsers);
router.get("/getuser/:userId", verifyToken, getUser);
router.put("/updateuser/:userId", verifyToken, updateUser);
router.delete("/deleteuser/:userId", verifyToken, deleteUser);

export default router;
