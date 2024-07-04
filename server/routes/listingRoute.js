import express from 'express';
import { createListing, getAllListing, getListing } from '../controllers/listingController.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createlisting', verifyToken, createListing);
router.get('/getalllisting',verifyToken, getAllListing);
router.get('/getlisting', verifyToken, getListing);
export default router;