import { ThunkAction } from "redux-thunk";
import { RootState } from "../store/store";
import {
  getKitchensStart,
  getKitchensSuccess,
  getKitchensFailure,
} from "../reducers/kitchensReducer";
import useApi from "../../hooks/useApi";
const token = "";
const user_id = "3029a1bf-b6fe-40e7-bc1f-46714f625725";

// Define thunk action to fetch todos
export const fetchKitchens = (): ThunkAction<
  void,
  RootState,
  null,
  ReturnType<typeof getKitchensSuccess | typeof getKitchensFailure>
> => {
  const [api, isLoading, error] = useApi<Kitchen[]>();
  return async (dispatch) => {
    try {
      const kitchens = await api(
        `http://localhost:3000/api/kitchen/get/${user_id}`,
        "GET",
        token
      );
      if (kitchens === undefined || kitchens.length === 0 || !kitchens[0])
        return;
      dispatch(getKitchensSuccess(kitchens));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(getKitchensFailure(error.message));
      } else {
        dispatch(getKitchensFailure("An unknown error occurred."));
      }
    }
  };
};
