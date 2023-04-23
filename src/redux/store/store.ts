import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

// Reducers
import kitchensReducer from "../reducers/kitchensReducer";

// Create store
const store = configureStore({
  reducer: {
    kitchens: kitchensReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
