import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserData: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUserData, logout } = authSlice.actions;

export default authSlice.reducer;