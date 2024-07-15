import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import listingRoute from "./routes/listingRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // allow json as the input of the BE
app.use(cookieParser());
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const frontendUrl = "https://kaydi-tourist-fe.onrender.com";

// app.use("/api/auth", authRoute);
// app.use("/api/user", userRoute);
// app.use("/api/listing", listingRoute);
// app.use("/api/booking", bookingRoute);
// app.use("/api/post", postRoute);
// app.use("/api/comment", commentRoute);

app.use(`${frontendUrl}/api/auth`, authRoute);
app.use(`${frontendUrl}/api/user`, userRoute);
app.use(`${frontendUrl}/api/listing`, listingRoute);
app.use(`${frontendUrl}/api/booking`, bookingRoute);
app.use(`${frontendUrl}/api/post`, postRoute);
app.use(`${frontendUrl}/api/comment`, commentRoute);
