import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createBooking = async (req, res, next) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;

    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (error) {
    next(error);
    res.status(400).json({ message: "Booking failed", error: error.message });
  }
};

export const cancelBooking = async (req, res, next) => {
  const { userId, bookingId } = req.params;
  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to cancel this booking" });
  }
  try {
    const deleteBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deleteBooking) {
      return res.status(400).json({ message: "The booking is not available" });
    }
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    next(error);
  }
};

export const getEachBooking = async (req, res, next) => {
  const { userId, tripId } = req.params;
  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to view this booking" });
  }
  try {
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const oneWeekAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );
    const oneDayAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const eachTripBooking = await Booking.find({ listingId: tripId }).populate(
      "listingId customerId"
    );

    const todayBooking = await Booking.find({
      listingId: tripId,
      createdAt: { $gte: today },
    });

    const lastDayBooking = await Booking.find({
      listingId: tripId,
      createdAt: { $gte: oneDayAgo },
    });

    const lastWeekBooking = await Booking.find({
      listingId: tripId,
      createdAt: { $gte: oneWeekAgo },
    });

    const lastMonthBooking = await Booking.find({
      listingId: tripId,
      createdAt: { $gte: oneMonthAgo },
    });

    if (eachTripBooking.length === 0) {
      return res.status(400).json({ message: "No one have book this trip !" });
    } else {
      res.status(200).json({
        eachTripBooking,
        lastMonthBooked: lastMonthBooking.length,
        lastWeekBooked: lastWeekBooking.length,
        yesterdayBooked: lastDayBooking.length,
        todayBook: todayBooking.length,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const payment = async (req, res, next) => {
  const { title, image, totalPrice } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
            images: [image],
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  });

  res.status(200).json({ id: session.id });
};

export const findBooking = async (req, res, next) => {
  const { bookingId } = req.params;
  try {
    const findBooking = await Booking.findById(bookingId).populate(
      "listingId hostId"
    );
    if (findBooking.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      res.status(200).json(findBooking);
    }
  } catch (error) {
    next(error);
  }
};
