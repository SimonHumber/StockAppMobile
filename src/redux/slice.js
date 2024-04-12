import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const jwtSlice = createSlice({
  name: "jwt",
  initialState: "",
  reducers: {
    jwtUpdate(state, action) {
      return action.payload;
    },
    jwtDelete(state, action) {
      return "";
    },
  },
});

export const { jwtUpdate, jwtDelete } = jwtSlice.actions;
export default jwtSlice.reducer;
