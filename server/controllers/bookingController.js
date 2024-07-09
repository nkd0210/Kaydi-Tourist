import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

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

    const eachTripBooking = await Booking.find({ listingId: tripId }).populate(
      "listingId customerId"
    );

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
      res
        .status(200)
        .json({
          eachTripBooking,
          lastMonthBooked: lastMonthBooking.length,
          lastWeekBooked: lastWeekBooking.length,
        });
    }
  } catch (error) {
    next(error);
  }
};
