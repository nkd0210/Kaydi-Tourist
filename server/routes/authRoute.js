import express from 'express';
import {signIn, signOut, signUp, google} from '../controllers/authController.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/signout', signOut);
router.post('/google', google)

export default router;