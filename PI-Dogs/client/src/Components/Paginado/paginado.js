/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

export default function Paginado({ breadsPerPage, allDogs, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDogs / breadsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <Link className="App-link" onClick={() => paginado(number)}>
              {number}
            </Link>
          ))}
      </ul>
    </nav>
  );
}
