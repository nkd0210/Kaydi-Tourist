import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  tripList: {
    type: Array,
    default: [],
  },
  wishList: {
    type: Array,
    default: [],
  },
  propertyList: {
    type: Array,
    default: [],
  },
  reservationList: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
