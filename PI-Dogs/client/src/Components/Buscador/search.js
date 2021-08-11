import React from "react";

function Buscador() {
  return (
    <div>
      <h2>Buscador</h2>
      <form className="App">
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
        <button className="search" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
export default Buscador;
