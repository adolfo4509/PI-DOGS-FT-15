import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchDogs,getDogs } from "../../actions/index";

import "./search.css";

function Buscador({ onSearch }) {
  const dispatch = useDispatch();
  const [namer, setNamer] = useState("");
  
 
  const handleInputChange = (e) => {
   
    onSearch();
    setNamer(e.target.value);
    if (e.target.value.trim() !== "") {
      dispatch(searchDogs(e.target.value));
    }else {
      dispatch(getDogs());
     dispatch(searchDogs(e.target.value));
    }
    
  };
 
  return (
    <div>
      <h2>Buscador</h2>
      <form>
        <fieldset>
          <div className="buscar">
            <input
              className="input-search"
              type="text"
              value={namer}
              placeholder="Buscar Dogs"
              onChange={(e) => handleInputChange(e)}
            ></input>

            
          </div>
        </fieldset>
      </form>
    </div>
  );
}
export default Buscador;
