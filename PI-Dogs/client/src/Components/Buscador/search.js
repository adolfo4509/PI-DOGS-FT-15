import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDogsTemp } from "../../actions/index";
function Buscador() {
  const dispatch = useDispatch();
  const [temperament, setTemperament] = useState();
  var allTemperament = useSelector((state) => state.dogsTemperament);
  function handleClick(e) {
    e.preventDefault();
    dispatch(selectDogsTemp(e));
  }
  useEffect(() => {
    dispatch(selectDogsTemp());
  }, []);

  return (
    <div>
      <h2>Buscador</h2>
      <form className="App">
        <fieldset>
          <div>
            <label className="label" htmlFor="title">
              breeds
            </label>
            <input
              className="input-search"
              type="text"
              placeholder="Name Dogs"
            ></input>
          </div>
          <button
            className="search"
            type="submit"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Search
          </button>
        </fieldset>
      </form>
    </div>
  );
}
export default Buscador;
