import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import carbonReducer from "./carbonSlice";
import vehicleReducer from "./vehicleSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    carbon:carbonReducer,
    vehicle:vehicleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;