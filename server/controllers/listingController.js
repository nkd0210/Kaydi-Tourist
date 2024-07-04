import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

export const createListing = async (req, res, next) => {

    const newListing = new Listing({
        userId: req.user.id,
        creator: req.body.creator,
        category: req.body.category,
        type: req.body.type,
        streetAddress: req.body.streetAddress,
        aptSuite: req.body.aptSuite,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        guestCount: req.body.guestCount,
        bedroomCount: req.body.bedroomCount,
        bedCount: req.body.bedCount,
        bathroomCount: req.body.bathroomCount,
        amenities: req.body.amenities,
        title: req.body.title,
        description: req.body.description,
        highlight: req.body.highlight,
        highlightDesc: req.body.highlightDesc,
        price: req.body.price,
        listingPhotoPaths: req.body.listingPhotoPaths,
    });

    try {
        const savedListing = await newListing.save();
        res.status(200).json(savedListing)

    } catch (error) {
        res.status(400).json({ message: "Failed to create a new listing place" })
        next(error);
    }
};

export const getAllListing = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res
            .status(400)
            .json({ message: "You must be an admin to view this" });
    }

    const listing = await Listing.find();
    const totalListing = await Listing.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    )

    const lastMonthListings = await Listing.countDocuments({
        createdAt: { $gte: oneMonthAgo }
    })

    res.status(200).json({
        message: "Get all listings successfully",
        totalListing,
        lastMonthListings,
        listing
    })
}

export const getListing = async (req, res, next) => {
    const qCategory = req.query.category;

    try {
        let listings;
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate(creator);
        } else {
            listings = await Listing.find();
        }

        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}

