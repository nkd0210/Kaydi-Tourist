import express from 'express';

import {createBooking, cancelBooking} from '../controllers/bookingController.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createbooking', verifyToken, createBooking);
router.delete('/cancelbooking/:userId/:bookingId', verifyToken, cancelBooking);

export default router;