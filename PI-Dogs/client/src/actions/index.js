import axios from "axios";
import { DOGS_BREADS_URL } from "../constantes/constants";

export const GET_DOGS = "GET_DOGS";
export const ORDER_ASCENDENT = "ORDER_ASCENDENT";

export function getDogs() {
  return function (dispatch) {
    return axios.get(DOGS_BREADS_URL).then((dogs) => {
      dispatch({
        type: GET_DOGS,
        payload: dogs.data,
      });
    });
  };
}
export function orderDogsAsc() {
  return async function (dispatch) {
    var json = await axios.get(" http://localhost:3001/api/");
    return dispatch({
      type: "ORDER_ASCENDENT",
      payload: json.data.short(),
    });
  };
}
