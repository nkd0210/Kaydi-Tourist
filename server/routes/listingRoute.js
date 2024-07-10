import express from 'express';
import { createListing, getAllListing, getListing, getDetailListing, updateListing } from '../controllers/listingController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createlisting', verifyToken, createListing);
router.get('/getalllisting', verifyToken, getAllListing);
router.get('/getlisting', getListing);
router.get('/getdetailplace/:listingId', getDetailListing);
router.put('/updatelisting/:userId/:listingId', verifyToken, updateListing);

export default router;