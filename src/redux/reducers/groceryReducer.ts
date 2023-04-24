import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GroceryState = {
  groceries: [],
  loading: false,
  error: null,
};

const grocerySlice = createSlice({
  name: "grocery",
  initialState,
  reducers: {
    getGroceryStart(state) {
      state.loading = true;
      state.error = null;
    },
    getGrocerySuccess(state, action: PayloadAction<PureGrocery[]>) {
      state.groceries = action.payload;
      state.loading = false;
      state.error = null;
    },
    getGroceryFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more reducers here for adding, updating, and deleting Kitchens
  },
});

export const { getGroceryStart, getGrocerySuccess, getGroceryFailure } =
  grocerySlice.actions;

export default grocerySlice.reducer;
