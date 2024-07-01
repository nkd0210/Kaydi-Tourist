import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

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
