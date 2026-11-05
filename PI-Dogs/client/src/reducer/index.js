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
  allDogs: [],
  allTemperament: [],
  createBreadsDog: [],
  dogsByName: [],
};

const getDogs = (dogs) =>
  Array.isArray(dogs) ? dogs : Array.isArray(dogs?.data) ? dogs.data : [];

const withDogs = (response, dogs) =>
  Array.isArray(response) ? dogs : { ...response, data: dogs };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogsLoaded: action.payload,
        allDogs: action.payload,
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
      const allTemperament2 = getDogs(state.allDogs);
      const createdFilter =
        action.payload === "created"
          ? allTemperament2.filter((el) => el.createdInDb)
          : allTemperament2.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogsLoaded: withDogs(
          state.allDogs,
          action.payload === "All" ? allTemperament2 : createdFilter
        ),
      };
    case ORDER_BY_NAME:
      const dogsToSort = getDogs(state.dogsLoaded).slice();
      const sortArr =
        action.payload === "asc"
          ? dogsToSort.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          : dogsToSort.sort((a, b) => {
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
        dogsLoaded: withDogs(state.dogsLoaded, sortArr),
      };
    case GET_NAME_BREADS_DOGS:
      return {
        ...state,
        allTemperament: action.payload,
      };
    case FILTER_BY_TEMPERAMENTNEO:
      const dogsByTemperament = getDogs(state.allDogs);
      const filterT =
        action.payload === "All"
          ? dogsByTemperament
          : dogsByTemperament.filter((e) =>
            [e.temperament].join(" ").includes(action.payload)
          );
      return {
        ...state,
        dogsLoaded: withDogs(state.allDogs, filterT),
      };
    case SEARCH_DOGS:
      return {
        ...state,
        dogsByName: action.payload
      };
    default:
      return state;
  }
}

export default rootReducer;
