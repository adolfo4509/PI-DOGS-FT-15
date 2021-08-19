import {
  GET_DOGS,
  FILTER_BY_TEMPERAMENTS,
  ADD_DOGS,
  FILTER_CREATE,
  ORDER_BY_NAME,
  GET_NAME_BREADS_DOGS,
  FILTER_BY_TEMPERAMENTNEO,
  SEARCH_DOGS,
} from "../actions/index";

const initialState = {
  dogsLoaded: [],
  allTemperament: [],
  createBreadsDog: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogsLoaded: action.payload,
      };
    case ADD_DOGS:
      return {
        ...state,
        createBreadsDog: state.createBreadsDog.concat(action.payload),
      };

    // eslint-disable-next-line no-fallthrough
    case FILTER_BY_TEMPERAMENTS:
      return {
        ...state,
        allTemperament: action.payload,
      };
    case FILTER_CREATE:
      const allTemperament2 = state.dogsLoaded;
      const createdFilter =
        action.payload === "created"
          ? allTemperament2.filter((el) => el.createdInDb)
          : allTemperament2.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogsLoaded: action.payload === "All" ? state.dogsLoaded : createdFilter,
      };
    case ORDER_BY_NAME:
      let sortArr =
        action.payload === "asc"
          ? state.dogsLoaded.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              } else if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogsLoaded.sort((a, b) => {
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
    case GET_NAME_BREADS_DOGS:
      return {
        ...state,
        allTemperament: action.payload,
      };
    case FILTER_BY_TEMPERAMENTNEO:
      let filterT = state.dogsLoaded.filter((e) =>
        [e.temperament].join(" ").includes(action.payload)
      );
      // console.log("=====", filterT);
      return {
        ...state,
        dogsLoaded: filterT,
      };
    case SEARCH_DOGS:
      let search = state.dogsLoaded.map((e) =>
        [e.name, e.temperament, e.image].includes(action.payload)
      );

      return { ...state, dogsLoaded: search };
    default:
      return state;
  }
}

export default rootReducer;
