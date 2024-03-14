import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  name: string;
  quantity: number;
  rate: number;
}

const initialState: Product[] = [{}];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      return [action.payload, ...state];
    },
  },
});

export const { addProduct } = productsSlice.actions;

export const getProductSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
