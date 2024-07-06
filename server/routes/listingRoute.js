import express from 'express';
import { createListing, getAllListing, getListing, getDetailListing } from '../controllers/listingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createlisting', verifyToken, createListing);
router.get('/getalllisting', verifyToken, getAllListing);
router.get('/getlisting', getListing);
router.get('/getdetailplace/:listingId', getDetailListing);
export default router;