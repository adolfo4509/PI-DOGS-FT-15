import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Cards/card";
import {
  getDogs,
  selectDogsTemp,
  filterCreate,
  orderByName,
  llevarBreadsByTemperament,
  searchDogs
} from "../../actions/index";
import Search from "../Buscador/search";
import Paginado from "../Paginado/paginado";
import "./home.css";

export default function Home({ temperament }) {
  var allTemperament = useSelector((state) => state.allTemperament);
  const [creadosDb, setCreadosDb] = useState([])
  //utilizamos la constante dispatch para ir actualizando las acciones
  const dispatch = useDispatch();
  //creamos una constante xxx para utilizar el hook useSelector para traernos todo lo que esta en el estado de dogs
  var allDogs = useSelector((state) => state.dogsLoaded);
  const searchDog = useSelector((state) => state.dogsByName);

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
const mostrarUno = creadosDb.length > 0 ? creadosDb : allDogs.data


  const dogsToDisplay = Array.isArray(searchDog?.data)
    ? searchDog.data
    : mostrarUno;


  //Declaramos una constante paginado como funcion
  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };
  const currentBreads = dogsToDisplay?.slice(
    indexOfFirtsBreads,
    indexOfLastBreads
  );
  
  
  // Nos traemos del estado los personajes cuando el componente se monta utilizando  el hook useEffect
  useEffect(() => {
    dispatch(getDogs()); //se hace un dispatch con la accion como parametro
  }, [dispatch]);
 
  useEffect(() => {
    dispatch(selectDogsTemp());
  }, []);
  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getDogs());
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    // setCurrentPage(1);
    const { value } = e.target
    if (value === "created") {
      const filtrados = allDogs.data.filter(creado => creado.createInDb)
      setCreadosDb(filtrados)
    } else {
      setCreadosDb([])
      return currentBreads
    }
  }

  function handleClickr(e) {

    if (!e.target.value) return;
    setCurrentPage(1);
   /*  setOrden(e.target.value); */
    dispatch(llevarBreadsByTemperament(e.target.value));
  }


  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
  /*   setOrden(e.target.value); */
    
  }

  return (
    <div>
      <Search
       
        onSearch={() => setCurrentPage(1)}
      />
      <section className="filtrar" aria-label="Filtros de razas">
        <button
          className="cargar"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Cargar de nuevo
        </button>
        <div className="select filter-grid">
          <div className="filter-option">
            <h3 className="filter-title">Filtrar por los temperamentos</h3>
            <select
              className="select-css filter-control"
              onChange={(e) => handleClickr(e)}
            >
              <option value="">Selecciona una opción</option>
              <option value="All">Todos</option>
              {allTemperament.map(({ ID, temperament }) => (
                <option key={ID} value={temperament}>
                  {temperament}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-option">
            <h3 className="filter-title">Filtrar por Razas</h3>
            <select
              className="filter-control"
              onChange={(e) => handleFilterCreated(e)}
            >
              <option value="All">Todos</option>
              <option value="created">creados</option>
              <option value="api">Existente</option>
            </select>
          </div>
          <div className="filter-option">
            <h3 className="filter-title">Filtrar en Orden</h3>
            <select
              className="filter-control"
              onChange={(e) => handleSort(e)}
            >
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
      </section>
      <Paginado
        breadsPerPage={breadsPerPage}
        allDogs={dogsToDisplay}
        
        paginado={paginado}
        currentPage={currentPage}
      />
      <div className="cards_breads">
        {currentBreads  ? (currentBreads
          .map((d) => (
            <Card
              key={d.id}
              name={d.name}
              temperament={creadosDb.length > 0 ? d.temperaments?.map(t => t.temperament) : d.temperament}
              image={d.image}
            />
          ))
        ) : Array.isArray(searchDog?.data) ? (

          <div className="loading">
            <h1>No se encontraron razas</h1>
          </div>
        ) : (
          <div className="loading">
            <h1>Cargando...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
