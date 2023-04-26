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
			const mutateArray: Kitchen[] = [...state.kitchens];
			const { kitchenId, grocery, expiryType } = action.payload;
			console.log(grocery);
			const kitchenIndex = mutateArray.findIndex(
				(kitchen) => kitchen.kitchen_id === kitchenId
			);
			if (kitchenIndex !== -1) {
				mutateArray[kitchenIndex].groceries[expiryType].push(grocery);
			}
			state.kitchens = mutateArray;
			state.loading = false;
			state.error = null;
		},
		postGroceryFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
			console.log(state.error);
		},
		deleteGroceryStart(state) {
			state.loading = true;
			state.error = null;
		},
		deleteGrocerySuccess(
			state,
			action: PayloadAction<{
				has_id: string;
				kitchenId: string;
				expiryType: number;
			}>
		) {
			const copy: Kitchen[] = [...state.kitchens];
			const { has_id, kitchenId, expiryType } = action.payload;
			const index = copy.findIndex(
				(kitchen) => kitchen.kitchen_id === kitchenId
			);
			if (index !== -1) {
				const groceryIndex = copy[index].groceries[
					expiryType
				].findIndex((grocery) => grocery.has_id === has_id);
				if (groceryIndex !== -1) {
					copy[index].groceries[expiryType].splice(groceryIndex, 1);
					state.kitchens = copy;
					console.log(state.kitchens);
					console.log(copy);
				}
			}
			state.loading = false;
			state.error = null;
		},
		deleteGroceryFailure(state, action: PayloadAction<string>) {
			console.log(action.payload);
			state.loading = false;
			state.error = action.payload;
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
	deleteGroceryFailure,
	deleteGrocerySuccess,
	deleteGroceryStart,
} = kitchenSlice.actions;

export default kitchenSlice.reducer;
