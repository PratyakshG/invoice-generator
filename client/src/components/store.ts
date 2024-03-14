import { configureStore } from "@reduxjs/toolkit";
import products from "./products.slice";

const store = configureStore({
  reducer: {
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
