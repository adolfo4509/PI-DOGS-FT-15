import React from "react";
import { ADD_DOGS } from "../../actions";
import "./breads.css";

export default function DogsCreate() {
  const [input, setInput] = React.useState({
    name: "",
    height: "",
    weight: "",
    life_spead: "",
    image: "",
  });
  return (
    <div className="contenedor seccion contenido-centrado">
      <h3>Create Dog Breads </h3>
      <form className="contacto">
        <fieldset>
          <label>Breads</label>
          <input type="text" placeholder="Breads"></input>

          <label for="cantidad">Height</label>
          <input type="number" min="0" max="20" placeholder="Min-Kg" />
          <input type="number" min="0" max="20" placeholder="Max-Kg" />
          <div>
            <label>weight</label>
            <input type="number" min="0" max="20" placeholder="Min-" />
            <input type="number" min="0" max="50" placeholder="Max-" />
          </div>
          <div>
            <label>Years of life</label>
            <input type="number" min="0" max="20" placeholder="Min" />
            <input type="number" min="0" max="20" placeholder="Max" />
          </div>
          <div>
            <label for="">Add temperament</label>
            <select>
              <input type="text" name="" value="" />
            </select>
          </div>

          <label>image</label>
          <input type="url" placeholder="insert Url" />
          <input
            type="submit"
            value="Crear Breads"
            className="boton boton-amarillo"
          ></input>
        </fieldset>
      </form>
    </div>
  );
}
