import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  image: string;
  email: string;
  name: string;
  role: string;
  verified: "";
  accessToken?: string;
  refreshToken?: string;
}

const initialState: IState = {
  image: "",
  email: "",
  name: "",
  role: "",
  verified: "",
  accessToken: "",
  refreshToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IState>) => {
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.verified = action.payload.verified;
    },
    logInUser: (state, action: PayloadAction<IState>) => {
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.verified = action.payload.verified;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    register: (state, action: PayloadAction<IState>) => {
      state.image = action.payload.image;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    userLogout: (state) => {
      state.image = "";
      state.email = "";
      state.name = "";
      state.role = "";
      state.verified = "";
      state.accessToken = "";
      state.refreshToken = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogout, getUser, logInUser, register } = userSlice.actions;

export default userSlice.reducer;
