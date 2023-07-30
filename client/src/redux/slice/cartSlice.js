import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, userId, quantity } = action.payload;

      const existingItem = state.products.find(
        (item) => item.id === id && item.userId === userId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },

    resetCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.userId !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export const selectCartProducts = (state) => state.cart.products;

export default cartSlice.reducer;
