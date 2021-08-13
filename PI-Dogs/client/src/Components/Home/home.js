import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/card";
import { getDogs } from "../../actions/index";
import Search from "../Buscador/search";

export default function Home() {
  //utilizamos la constaente dispatch para ir actualizando las acciones
  const dispatch = useDispatch();
  //creamos una constante xxx para utilizar el hook useSelector para traernos todo lo que esta en el estado de dogs
  var allDogs = useSelector((state) => state.dogsLoaded);
  // Nos traemos del estado los personajes cuando el componente se monta utilizando  el hook useEffect
  useEffect(() => {
    dispatch(getDogs()); //se hace un dispatch con la acion como parametro
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <div>
      <Search />
      <div className="filtrar">
        <button
          className="cargar"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Cargar de nuevo
        </button>
        <div className="select">
          <select>
            <option value="temperamentos">Temperamento</option>
          </select>
          <select>
            <option value="asc">Ascendente</option>
            <option value="des">Descendente</option>
          </select>
          <select>
            <option value="all">Todos</option>
            <option value="exist">Breads exist</option>
            <option value="creat">created by we</option>
          </select>

          <footer className="botonesnex_prev">
            <button className="botonnext ">Preview</button>
            <button>previous</button>
          </footer>
        </div>
      </div>
      {allDogs &&
        allDogs.map((d) => {
          return (
            <Card
              name={d.name}
              temperament={d.temperament}
              image={d.img}
            ></Card>
          );
        })}
    </div>
  );
}
