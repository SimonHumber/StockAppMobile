import { configureStore } from "@reduxjs/toolkit";
import jwtSlice from "./slice";

const store = configureStore({
  reducer: {
    jwt: jwtSlice,
  },
});

export default store;
