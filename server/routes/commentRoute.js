import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  getPostComments,
  likeComment,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/create/:userId/:postId", verifyToken, createComment);
router.get("/getpostcomment/:postId", getPostComments);
router.put("/update/:userId/:commentId", verifyToken, updateComment);
router.delete("/delete/:userId/:commentId", verifyToken, deleteComment);
router.put("/like/:commentId", verifyToken, likeComment);
export default router;
