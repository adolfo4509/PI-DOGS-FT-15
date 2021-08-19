import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchDogs } from "../../actions/index";

import "./search.css";

function Buscador({ name, temperament, image }) {
  const dispatch = useDispatch();
  const [namer, setNamer] = useState(name, temperament, image);

  useEffect(() => {
    dispatch(searchDogs()); //se hace un dispatch con la accion como parametro
  }, []);
  const handleInputChange = (e) => {
    e.preventDefault();
    dispatch(searchDogs());
    setNamer(e.target.value);

    //console.log("========>");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("===>", name);
  };
  return (
    <div>
      <h2>Buscador</h2>
      <form onChange={(e) => handleInputChange(e)}>
        <fieldset>
          <div className="buscar">
            <input
              className="input-search"
              type="text"
              value={name}
              placeholder="Name Dogs"
            ></input>

            <button
              className="button"
              type="submit"
              onSubmit={(e) => handleSubmit(e)}
            >
              Search
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
export default Buscador;
