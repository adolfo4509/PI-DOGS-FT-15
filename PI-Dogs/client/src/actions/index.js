import axios from "axios";

import { DOGS_BREADS_URL } from "../constantes/constants";
export const GET_DOGS = "GET_DOGS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const ADD_DOGS = "ADD_DOGS";
export const FILTER_CREATE = "FILTER_CREATE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";

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
  console.log("==========>", payload);
  return {
    type: ADD_DOGS,
    payload: payload,
  };
};
export function selectDogsTemp(payload) {
  console.log(payload);
  return { type: FILTER_BY_TEMPERAMENTS, payload };
}
export function filterCeate(payload) {
  return { type: FILTER_CREATE, payload };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}
