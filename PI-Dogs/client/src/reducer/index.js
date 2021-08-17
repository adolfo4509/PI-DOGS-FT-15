import {
  GET_DOGS,
  FILTER_BY_TEMPERAMENTS,
  ADD_DOGS,
  FILTER_CREATE,
  ORDER_BY_NAME,
} from "../actions/index";

const initialState = {
  dogsLoaded: [],
  allTemperament: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogsLoaded: action.payload,
        allTemperament: action.payload,
      };
    case ADD_DOGS:
      state.concat(action.payload);

    // eslint-disable-next-line no-fallthrough
    case FILTER_BY_TEMPERAMENTS:
      const allTemperaments = state.allTemperament;
      let temp = allTemperaments.map((e) => e.temperament);
      console.log(temp);

      return {
        ...state,
        allTemperament: allTemperaments,
      };
    case FILTER_CREATE:
      //const allTemperament = state.allTemperaments;
      const createdFilter =
        action.payload === "created"
          ? state.allTemperament.filter((el) => el.createdInDb)
          : state.allTemperament.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogsLoaded:
          action.payload === "All" ? state.allTemperament : createdFilter,
      };
    case ORDER_BY_NAME:
      let sortArr =
        action.payload === "asc"
          ? state.allTemperament.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return 0;
              }
              return 1;
            })
          : state.allTemperament.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogsLoaded: sortArr,
      };
    default:
      return state;
  }
}

export default rootReducer;
