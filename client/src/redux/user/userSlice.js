import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  listings: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    signUpStart: (state) => {
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
    signOutSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
    },
    updateStart: (state) => {
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteUserStart: (state, action) => {
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.currentUser = null;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
    },
    setListings: (state, action) => {
      state.listings = action.payload;
      state.error = null;
    },
    setTripList: (state, action) => {
      state.currentUser.tripList = action.payload;
      state.error = null;
    },
    setWishList: (state, action) => {
      state.currentUser.wishList = action.payload;
      state.error = null;
    },
    setPropertyList: (state, action) => {
      state.currentUser.propertyList = action.payload;
      state.error = null;
    },
    setReservationList: (state, action) => {
      state.currentUser.reservationList = action.payload;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  setListings,
  setWishList,
  setTripList,
  setPropertyList,
  setReservationList,
} = userSlice.actions;

export default userSlice.reducer;
