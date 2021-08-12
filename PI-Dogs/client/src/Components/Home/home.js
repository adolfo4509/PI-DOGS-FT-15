import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../../actions";
import Search from "../Buscador/search";

export default function Home() {
  const dispatch = useDispatch();
  //creamos una constante xxx para utilizar el hook useSelector para traernos todo lo que esta en el estado de dogs
  const dogs = useSelector((state) => state.dogs);

  // Nos traemos del estado los personajes cuando el componente se monta utilizando  el hook useEffect
  useEffect(() => {
    dispatch(getDogs()); //se hace un dispatch con la acion como parametro
  }, [dispatch]);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  return (
    <div>
      <Search />
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Cargar de nuevo
      </button>
    </div>
  );
}
