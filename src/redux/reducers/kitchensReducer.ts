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
		addGrocery(
			state,
			action: PayloadAction<{
				kitchenId: string;
				grocery: Grocery;
				expiryType: number;
			}>
		) {
			const { kitchenId, grocery, expiryType } = action.payload;
			const kitchenIndex = state.kitchens.findIndex(
				(kitchen) => kitchen.kitchen_id === kitchenId
			);
			if (kitchenIndex !== -1) {
				state.kitchens[kitchenIndex].groceries[expiryType].push(
					grocery
				);
			}
		},
		// Add more reducers here for adding, updating, and deleting Kitchens
	},
});

export const {
	getKitchensStart,
	getKitchensSuccess,
	getKitchensFailure,
	addGrocery,
} = kitchenSlice.actions;

export default kitchenSlice.reducer;
