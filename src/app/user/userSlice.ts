import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IState {
  image: string;
  email: string;
  name: string;
  role: string;
}

const initialState: IState = {
  image: "",
  email: "",
  name: "",
  role: "",
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
    },
    userLogout: (state) => {
      state.image = "";
      state.email = "";
      state.name = "";
      state.role = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogout, getUser } = userSlice.actions;

export default userSlice.reducer;
