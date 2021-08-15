import axios from "axios";

import { DOGS_BREADS_URL, TEMPERAMENT_URL } from "../constantes/constants";
export const GET_DOGS = "GET_DOGS";
export const FILTER_BY_VALUES = "FILTER_BY_VALUES";
export const ADD_DOGS = "ADD_DOGS";

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
export const addBreads = (payload) => {
  // console.log("==========>", payload);
  return {
    type: ADD_DOGS,
    payload: payload,
  };
};
export function selectDogsTemp() {
  return function (dispatch) {
    return axios.get(TEMPERAMENT_URL).then((dogs) => {
      dispatch({
        type: FILTER_BY_VALUES,
        payload: dogs.data,
      });
    });
  };
}
