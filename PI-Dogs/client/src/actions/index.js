import axios from "axios";

import { DOGS_BREADS_URL, TEMPERAMENT_URL } from "../constantes/constants";
export const GET_DOGS = "GET_DOGS";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const ADD_DOGS = "ADD_DOGS";
export const FILTER_CREATE = "FILTER_CREATE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_NAME_BREADS_DOGS = "GET_NAME_BREADS_DOGS";
export const FILTER_BY_TEMPERAMENTNEO = "FILTER_BY_TEMPERAMENTNEO";
export const SEARCH_DOGS = "SEARCH_DOGS";

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

export const getNameBreadsDogs = (name) => {
  return async function (dispatch) {
    try {
      var json = await axios.get(DOGS_BREADS_URL + name);
      return dispatch({
        type: GET_NAME_BREADS_DOGS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addBreads = (payload) => {
  // payload = { ...payload };
  return {
    type: ADD_DOGS,
    payload: payload,
  };
};
export function selectDogsTemp() {
  return function (dispatch) {
    return axios.get(TEMPERAMENT_URL).then((dogs) => {
      dispatch({
        type: FILTER_BY_TEMPERAMENTS,
        payload: dogs.data,
      });
    });
  };
}
export function filterCreate(payload) {
  return { type: FILTER_CREATE, payload };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}
export function llevarBreadsByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTNEO,
    payload,
  };
}
export function searchDogs(name) {
  return function (dispatch) {
    return axios.get(DOGS_BREADS_URL + name).then((dogs) => {
      dispatch({
        type: SEARCH_DOGS,
        payload: dogs.data,
      });
    });
  };
}
