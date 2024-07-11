import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create/:userId", verifyToken, createComment);
router.get("/getpostcomment/:postId", getPostComments);

export default router;
