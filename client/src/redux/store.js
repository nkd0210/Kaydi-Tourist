import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist'; // cau hinh tinh nang luu tru lau dai
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'kaydiTourist',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store);