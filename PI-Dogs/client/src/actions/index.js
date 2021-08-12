import axios from "axios";

export const GET_DOGS = "GET_DOGS";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get(" http://localhost:3001/Dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}
