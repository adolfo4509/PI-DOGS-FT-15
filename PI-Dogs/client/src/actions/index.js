export const GET_DOGS = "GET_DOGS";

export function getDogs(breeds) {
  return function (dispatch) {
    return fetch(" https://api.thedogapi.com/v1/breeds?api_key=${}" + breeds)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_DOGS, payload: json });
      });
  };
}
