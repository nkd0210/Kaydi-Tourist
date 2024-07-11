import express from "express";
import {
  createListing,
  getRecentListing,
  getListing,
  getDetailListing,
  updateListing,
  getListingBySearch,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/createlisting", verifyToken, createListing);
router.get("/getrecentlisting/:limitNumber", getRecentListing);
router.get("/getlisting", getListing);
router.get("/getdetailplace/:listingId", getDetailListing);
router.put("/updatelisting/:userId/:listingId", verifyToken, updateListing);
router.get("/search/:searchKeyWord", getListingBySearch);

export default router;
