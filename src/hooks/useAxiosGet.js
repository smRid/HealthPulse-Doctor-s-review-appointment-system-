import { useEffect, useReducer } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isError: false,
  data: null
};

const reducerHandler = (state, action) => {
  switch (action.type) {
    case `INIT`:
      return { ...state, isLoading: true, error: null };
    case `SUCCESS`:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload
      };
    case `ERROR`:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: null
      };
    case `EMPTY`:
      return {
        ...state,
        isLoading: false,
        error: false,
        data: null
      };
    default:
      return;
  }
};

export default function UseAxiosGet(url) {
  const [state, dispatch] = useReducer(reducerHandler, initialState);

  useEffect(() => {
    if (!url) return dispatch({ type: `EMPTY` });
    const fetchData = () => {
      dispatch({ type: `INIT` });
      axios
        .get(url, {
          headers: {
            Authorization: "JWT " + Cookies.get("accessToken")
          }
        })
        .then((res) => {
          dispatch({ type: `SUCCESS`, payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: `ERROR`, payload: error });
        });
    };

    fetchData();
  }, [url]);

  return state;
}
