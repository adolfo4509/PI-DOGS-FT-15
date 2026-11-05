import React, { useState, useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { addBreads, getDogs } from "../../actions";
import "./breads.css";

export default function DogsCreate() {
  const dispatch = useDispatch();
  var allTemperament = useSelector((state) => state.allTemperament);
  console.log("allTemperament", allTemperament);
  const [input, setInput] = useState({
    name: "",
    height: {imperial: "", metric: "" },
    weight: {imperial: "", metric: "" },
    life_span: "",
    image: "",
    temperament: "",
  });
  console.log(input);
  useEffect(() => {
    dispatch(getDogs()); //se hace un dispatch con la accion como parametro
  }, [dispatch]);
  const handleChange = (e) => {
    e.preventDefault();
   const { name, value } = e.target;
  
    if (name === "temperament") {
      const selectedIds = Array.from(e.target.selectedOptions, (option) => option.innerHTML);
      console.log("selectedIds", selectedIds[0]);
      setInput((prevInput) => ({
        ...prevInput,
        temperament: selectedIds[0] ? [...prevInput.temperament, selectedIds[0]] : prevInput.temperament,
      }));
    } else if (name === "height" || name === "weight") {
      const [imperial, metric] = value.split("-");
      setInput((prevInput) => ({
        ...prevInput,
        [name]: { imperial, metric },
      }));
    } else {
      setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    
   
    const dataRequest = {name:input.name,
      height: input.height,
      weight:input.weight,
      life_span: input.life_span,
      image : input.image,
      temperament:input.temperament.join(", ")
    }
    console.log("handleSubmit", dataRequest);
    e.preventDefault();
    dispatch(addBreads(dataRequest));
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
            value={input.height.imperial + " - " + input.height.metric}
            placeholder="Min - Max"
            name="height"
          />

          <label>weight</label>
          <input
            type="text"
            onChange={handleChange}
            value={input.weight.imperial + " - " + input.weight.metric}
            placeholder="Min - Max"
            name="weight"
          />

          <label>Years of life</label>
          <input
            type="text"
            onChange={handleChange}
            value={input.life_span}
            placeholder="Min - Max"
            name="life_span"
          />

          <label>Add temperament</label>
          {allTemperament.length > 0 && (
            <select
              onChange={handleChange}
              name="temperament"
              value={input.temperament}
              multiple
            >
              {allTemperament.map((temperament) => (
                <option key={temperament.id} value={temperament.id}>
                  {temperament.temperament}
                </option>
              ))}
            </select>
          )}

          <label>image</label>
          <input
            type="text"
            value={input.image}
             onChange={handleChange}
            name="image"
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
