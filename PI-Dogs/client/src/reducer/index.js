import { GET_DOGS } from "../actions/index";

const initialState = {
  dogsLoaded: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogsLoaded: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
