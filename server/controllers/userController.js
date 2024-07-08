import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import Booking from '../models/bookingModel.js';
import List from '../models/listingModel.js';

export const getAllUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res
            .status(400)
            .json({ message: "You must be an admin to view this" });
    }
    const userList = await User.find();
    const userCount = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
    });

    if (!userList) {
        res.json({ message: "No users found" });
    }

    res.status(200).json({
        message: "Get all users successfully",
        userCount,
        lastMonthUsers,
        userList,
    });
};

export const getUser = async (req, res, next) => {
    const findUser = await User.findById(req.params.userId);

    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const { password: pass, ...rest } = findUser._doc;
    res.status(200).json({ rest });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return res
            .status(400)
            .json({ message: "You are not allowed to update this user" });
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters long" });
        }
        req.body.password = bcryptjs.hashSync(req.body.password);
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePic: req.body.profilePic,
                },
            },
            { new: true }
        );
        const { password: pass, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return res
            .status(400)
            .json({ message: "You are not allowed to delete this user" });
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const getTripList = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const trip = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")

        if (!trip) {
            return res.status(404).json({ message: "No trips found for this user" });
        } else {
            res.status(200).json(trip);
        }

    } catch (error) {
        next(error);
    }
}

export const favoriteTrip = async (req, res, next) => {
    try {
        const { userId, listingId } = req.params;
        const user = await User.findById(userId);
        const listing = await List.findById(listingId).populate("creator");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);

        if (favoriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
            await user.save();
            res.status(200).json({ message: "Remove favourite listing from wishlist", wishList: user.wishList });
        } else {
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({ message: "Add favourite listing to wishlist", wishList: user.wishList });
        }

    } catch (error) {
        next(error);
        res.status(400).json({message: "Add to wishlist failed"})
    }
}

export const propertyList = async(req,res,next) => {
    try {
        const userId = req.params.userId;
        const properties = await List.find({creator: userId}).populate("creator");
        if(!properties) {
            return res.status(404).json({message: "This user dont have any property list"});
        }else {
            res.status(200).json(properties);
        }
    } catch (error) {
        next(error);
    }
}
