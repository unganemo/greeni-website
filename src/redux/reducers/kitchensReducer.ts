import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: KitchensState = {
  kitchens: [],
  loading: false,
  error: null,
};

const kitchenSlice = createSlice({
  name: "kitchens",
  initialState,
  reducers: {
    getKitchensStart(state) {
      state.loading = true;
      state.error = null;
    },
    getKitchensSuccess(state, action: PayloadAction<Kitchen[]>) {
      state.kitchens = action.payload;
      state.loading = false;
      state.error = null;
    },
    getKitchensFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add more reducers here for adding, updating, and deleting Kitchens
  },
});

export const { getKitchensStart, getKitchensSuccess, getKitchensFailure } =
  kitchenSlice.actions;

export default kitchenSlice.reducer;
