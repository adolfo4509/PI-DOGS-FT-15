import { GET_DOGS, FILTER_BY_VALUES } from "../actions/index";

const initialState = {
  dogsLoaded: [],
  dogsTemperament: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogsLoaded: action.payload,
      };
    case FILTER_BY_VALUES:
      return {
        ...state,
        dogsTemperament: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
