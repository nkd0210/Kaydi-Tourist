import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
  getPostBySearch,
  getAllPost,
  getRecentPost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create/:userId", verifyToken, createPost);
router.get("/getsinglepost/:postId", getSinglePost);
router.delete("/deletepost/:userId/:postId", verifyToken, deletePost);
router.put("/updatepost/:userId/:postId", verifyToken, updatePost);
router.get("/search/:postKeyWord", getPostBySearch);
router.get("/getallposts", getAllPost);
router.get("/getrecentpost/:limitPost", getRecentPost);

export default router;
