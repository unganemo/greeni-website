import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kitchens from "./pages/user/Kitchens";
import Home from "./pages/Home";
import NavigationBar from "./components/custom-elements/navbar/NavigationBar";
import ShoppingLists from "./pages/user/ShoppingLists";
import Recipes from "./pages/user/Recipes";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { RootState } from "./redux/store/store";
import { ThunkDispatch } from "redux-thunk";
import { useEffect } from "react";
import useApi from "./hooks/useApi";
import kitchensReducer, {
  getKitchensStart,
} from "./redux/reducers/kitchensReducer";
import { fetchKitchens } from "./redux/actions/kitchenActions";
import { AnyAction } from "@reduxjs/toolkit";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className={styles.App}>
          <NavigationBar />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kitchens/:user_id" element={<Kitchens />} />
              <Route
                path="/shopping-lists/:user_id"
                element={<ShoppingLists />}
              />
              <Route path="/recipes/:user_id" element={<Recipes />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
