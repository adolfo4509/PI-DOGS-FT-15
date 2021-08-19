import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBreads, getDogs } from "../../actions";
import "./breads.css";

export default function DogsCreate() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_spead: "",
    image: "",
    temperament: "",
  });
  useEffect(() => {
    dispatch(getDogs()); //se hace un dispatch con la accion como parametro
  }, [dispatch]);
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBreads(input));
  };
  return (
    <div className="contenedor seccion ">
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <h3>Create Dog Breads </h3>
          <label>Breads</label>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            value={input.name}
            placeholder="Breads"
          ></input>
          <label for="cantidad">Height</label>
          <input
            type="text"
            onChange={handleChange}
            value={input.height}
            placeholder="Min - Max"
          />

          <label>weight</label>
          <input
            type="text"
            onChange={handleChange}
            value={input.weight}
            placeholder="Min - max"
          />

          <label>Years of life</label>
          <input
            type="text"
            onChange={handleChange}
            value={input.life_spead}
            placeholder="Min - max"
          />

          <label>Add temperament</label>
          <input
            type="text"
            onChange={handleChange}
            value={input.temperament}
          ></input>

          <label>image</label>
          <input
            type="text"
            value="https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59bbb29c5bafe878503c9872/husky-siberiano-bosque.jpg"
            disabled
          />

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
