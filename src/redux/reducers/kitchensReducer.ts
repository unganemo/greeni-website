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
		postGroceryStart(state) {
			state.loading = true;
			state.error = null;
		},
		postGrocerySuccess(
			state,
			action: PayloadAction<{
				kitchenId: string;
				grocery: Grocery;
				expiryType: number;
			}>
		) {
			const mutateArray: Kitchen[] = state.kitchens;
			const { kitchenId, grocery, expiryType } = action.payload;
			const kitchenIndex = mutateArray.findIndex(
				(kitchen) => kitchen.kitchen_id === kitchenId
			);
			if (kitchenIndex !== -1) {
				mutateArray[kitchenIndex].groceries[expiryType].push(grocery);
			}
			console.log(state.kitchens[kitchenIndex].groceries[expiryType]);
			state.kitchens = mutateArray;
		},
		postGroceryFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			console.log(state.error);
		},
		// Add more reducers here for adding, updating, and deleting Kitchens
	},
});

export const {
	getKitchensStart,
	getKitchensSuccess,
	getKitchensFailure,
	postGroceryFailure,
	postGroceryStart,
	postGrocerySuccess,
} = kitchenSlice.actions;

export default kitchenSlice.reducer;
