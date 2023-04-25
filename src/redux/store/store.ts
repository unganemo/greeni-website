import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

// Reducers
import kitchensReducer from "../reducers/kitchensReducer";
import groceryReducer from "../reducers/groceryReducer";

// Create store
const store = configureStore({
	reducer: {
		kitchens: kitchensReducer,
		groceries: groceryReducer,
	},
	middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
