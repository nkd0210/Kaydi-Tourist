import express from 'express';

import {createBooking} from '../controllers/bookingController.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createbooking', verifyToken, createBooking);

export default router;