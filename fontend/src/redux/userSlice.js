import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    login: (state, action) => {
      state.user.name = action.payload.name;
      state.user.phone = action.payload.phone;
      state.user.id = action.payload._id;
      state.user.role = action.payload.role;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
