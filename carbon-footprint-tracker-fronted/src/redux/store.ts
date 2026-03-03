import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import carbonReducer from "./carbonSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
     carbon:carbonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;