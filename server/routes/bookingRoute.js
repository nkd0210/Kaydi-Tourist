import express from 'express';

import {createBooking, cancelBooking, getEachBooking} from '../controllers/bookingController.js';
import {verifyToken} from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createbooking', verifyToken, createBooking);
router.delete('/cancelbooking/:userId/:bookingId', verifyToken, cancelBooking);
router.get('/getEachBooking/:userId/:tripId', verifyToken, getEachBooking);

export default router;