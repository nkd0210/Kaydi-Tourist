import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from './routes/authRoute.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("MongoDb is connected")
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();

app.use(express.json()); // allow json as the input of the BE
app.use(cookieParser());
app.use(cors());

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

app.use('/api/auth', authRoute)
