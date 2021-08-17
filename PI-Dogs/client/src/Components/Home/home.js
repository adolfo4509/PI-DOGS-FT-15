import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/card";
import {
  getDogs,
  selectDogsTemp,
  filterCeate,
  orderByName,
} from "../../actions/index";
import Search from "../Buscador/search";
import Paginado from "../Paginado/paginado";
import "./home.css";

export default function Home() {
  //utilizamos la constante dispatch para ir actualizando las acciones
  const dispatch = useDispatch();
  //creamos una constante xxx para utilizar el hook useSelector para traernos todo lo que esta en el estado de dogs
  var allDogs = useSelector((state) => state.dogsLoaded);

  //------Creamos constantes para hacer la logica de paginado-------//

  // Ordenar de forma asc y desc

  const { orden, setOrden } = useState("");
  //Pagina actual
  const [currentPage, setCurrentPage] = useState(1);

  //Razas por pagina
  const [breadsPerPage, setBreadsPage] = useState(9);

  //indece del ultimo personaje

  const indexOfLastBreads = currentPage * breadsPerPage;

  //indice del primer personaje

  const indexOfFirtsBreads = indexOfLastBreads - breadsPerPage;

  // creamos una constante para guardar todos las razas que se van a tener en cada pagina

  const currentBreads = allDogs.slice(indexOfFirtsBreads, indexOfLastBreads);

  //Declaramos una constante paginado como funcion
  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // Nos traemos del estado los personajes cuando el componente se monta utilizando  el hook useEffect
  useEffect(() => {
    dispatch(getDogs()); //se hace un dispatch con la accion como parametro
  }, []);
  function handleClick(e) {
    // e.preventDefault();
    dispatch(getDogs());
  }
  function filterHandleSTemperament(e) {
    //e.preventDefault();
    dispatch(selectDogsTemp(e.target.value));
    //console.log("=======>boton", selectDogsTemp());
  }

  function handleFilterCreated(e) {
    dispatch(filterCeate(e.target.value));
  }

  //para ordenar asc o desc

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
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
          <fieldset>
            <select onChange={(e) => filterHandleSTemperament(e)}>
              <option value="All">Todos</option>
              <option value="temperament">Temperament</option>
              <option value="api">Todos</option>
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="All">Todos</option>
              <option value="created">creados</option>
              <option value="api">Existente</option>
            </select>
            <select onChange={(e) => handleSort(e)}>
              <option value="asc">Ascendente</option>
              <option value="des">Descendente</option>
              <option value="weig">weight</option>
            </select>
          </fieldset>
        </div>
      </div>
      <Paginado
        breadsPerPage={breadsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
      <div className="cards_breads">
        {currentBreads &&
          currentBreads.map((d) => {
            return (
              <Card
                name={d.name}
                temperament={d.temperament}
                image={d.image.url}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}
