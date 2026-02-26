import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl?: string;
  description?: string;
}

interface AuthState {
  token: string | null;
  userData: User | null;
}

/* ================================
   🔥 SAFE LOCALSTORAGE LOADER
================================ */

const loadUserFromStorage = (): User | null => {
  try {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || savedUser === "undefined") {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error(`Invalid user in localStorage ${error}`);
    return null;
  }
};

const loadTokenFromStorage = (): string | null => {
  const savedToken = localStorage.getItem("token");

  if (!savedToken || savedToken === "undefined") {
    return null;
  }

  return savedToken;
};

const initialState: AuthState = {
  token: loadTokenFromStorage(),
  userData: loadUserFromStorage(),
};

/* ================================
   🔥 SLICE
================================ */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;
      state.userData = action.payload.user;

      // Safe persist
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }

      if (action.payload.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      }
    },

    logout: (state) => {
      state.token = null;
      state.userData = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUserData, logout } = authSlice.actions;
export default authSlice.reducer;