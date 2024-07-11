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
    res.status(200).json(savedListing);
  } catch (error) {
    res.status(400).json({ message: "Failed to create a new listing place" });
    next(error);
  }
};

export const getRecentListing = async (req, res, next) => {
  try {
    const { limitNumber } = req.params;
    const limitListing = parseInt(limitNumber);
    const listing = await Listing.find()
      .limit(limitListing)
      .sort({ createdAt: -1 });

    if (listing.length === 0) {
      return res.status(200).json({ message: "No listing found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getDetailListing = async (req, res, next) => {
  const findListing = await Listing.findById(req.params.listingId).populate(
    "creator"
  );
  if (!findListing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  res.status(200).json(findListing);
};

export const updateListing = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return res
      .status(400)
      .json({ message: "You do not have permission to update listing" });
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.listingId,
      {
        $set: {
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
        },
      },
      { new: true } // return the update document
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListingBySearch = async (req, res, next) => {
  const { searchKeyWord } = req.params;
  try {
    let searchListing = [];

    if (searchKeyWord === "all") {
      searchListing = await Listing.find().populate("creator");
    } else {
      searchListing = await Listing.find({
        $or: [
          {
            category: {
              $regex: searchKeyWord,
              $options: "i",
            },
          },
          {
            title: {
              $regex: searchKeyWord,
              $options: "i",
            },
          },
          {
            streetAddress: {
              $regex: searchKeyWord,
              $options: "i",
            },
          },
          {
            city: {
              $regex: searchKeyWord,
              $options: "i",
            },
          },
          {
            province: {
              $regex: searchKeyWord,
              $options: "i",
            },
          },
          {
            country: {
              $regex: searchKeyWord,
              $options: "i",
            },
          },
        ],
      }).populate("creator");
    }
    if (searchListing.length === 0) {
      return res.status(404).json({ message: "No listings found" });
    }
    res.status(200).json(searchListing);
  } catch (error) {
    next(error);
  }
};
