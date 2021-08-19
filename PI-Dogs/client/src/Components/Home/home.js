import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/card";
import {
  getDogs,
  selectDogsTemp,
  filterCreate,
  orderByName,
  llevarBreadsByTemperament,
} from "../../actions/index";
import Search from "../Buscador/search";
import Paginado from "../Paginado/paginado";
import "./home.css";

export default function Home({ temperament }) {
  var allTemperament = useSelector((state) => state.allTemperament);

  //utilizamos la constante dispatch para ir actualizando las acciones
  const dispatch = useDispatch();
  //creamos una constante xxx para utilizar el hook useSelector para traernos todo lo que esta en el estado de dogs
  var allDogs = useSelector((state) => state.dogsLoaded);

  //------Creamos constantes para hacer la logica de paginado-------//

  const [input, setInput] = useState("");

  // Ordenar de forma asc y desc

  const [orden, setOrden] = useState("");

  //Pagina actual
  const [currentPage, setCurrentPage] = useState(1);

  //Razas por pagina
  const [breadsPerPage] = useState(9);

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
  }, [dispatch]);
  //console.log(getDogs());
  useEffect(() => {
    dispatch(selectDogsTemp());
  }, []);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreate(e.target.value));
  }

  function handleClickr(e) {
    //e.preventDefault();
    setOrden(e.target.value);
    dispatch(llevarBreadsByTemperament(e.target.value));
  }
  //para ordenar asc o desc

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
    //console.log(orderByName());
  }
  return (
    <div>
      <Search
        name={input.name}
        temperament={input.temperament}
        image={input.image}
      />
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
          <div>
            <h3>Filtrar por los temperamentos</h3>
            <div>
              <select className="select-css" onChange={(e) => handleClickr(e)}>
                <option>Selecciona una opción</option>
                {allTemperament.map(({ ID, temperament }) => {
                  return (
                    <option key={ID} value={temperament}>
                      {temperament}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <h3>Filtrar por Razas</h3>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="All">Todos</option>
              <option value="created">creados</option>
              <option value="api">Existente</option>
            </select>
          </div>
          <div>
            <div></div>
            <h3>Filtrar en Orden </h3>
            <select onChange={(e) => handleSort(e)}>
              <option className="ordenar" value="asc">
                Ascendente
              </option>
              <option className="ordenar" value="des">
                Descendente
              </option>
              <option className="ordenar" value="weig">
                weight
              </option>
            </select>
          </div>
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
                image={d.image}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}
