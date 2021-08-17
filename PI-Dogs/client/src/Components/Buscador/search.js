import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions/index";
import "./search.css";

function Buscador() {
  const dispatch = useDispatch();
  const [breads, setBreads] = useState();
  var allBreads = useSelector((state) => state.dogsLoaded);

  useEffect(() => {
    dispatch(getDogs(allBreads));
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs(e));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogs());
    console.log({
      name: "adolfo",
      email: "fafafaf@agagaga.com",
      password: "1234",
    });
  }
  return (
    <div>
      <h2>Buscador</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="buscar">
            <input
              className="input-search"
              type="text"
              placeholder="Name Dogs"
            ></input>

            <button className="button" type="submit">
              Search
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
export default Buscador;
