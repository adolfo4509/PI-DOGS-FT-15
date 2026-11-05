import React from "react";
import "./paginado.css";

const VISIBLE_PAGE_COUNT = 10;

export default function Paginado({
  breadsPerPage,
  allDogs,
  paginado,
  
  currentPage = 1,
}) {

  
  const dogs = Array.isArray(allDogs)
    ? allDogs
    : Array.isArray(allDogs)
      ? allDogs
      : [];
  const pageSize = Number.isFinite(breadsPerPage) && breadsPerPage > 0
    ? Math.floor(breadsPerPage)
    : 1;
   
  const totalPages = Math.ceil(dogs.length / pageSize);

  if (totalPages === 0) {
    return null;
  }

  const activePage = Math.min(Math.max(currentPage, 1), totalPages);
  const firstVisiblePage =
    Math.floor((activePage - 1) / VISIBLE_PAGE_COUNT) * VISIBLE_PAGE_COUNT + 1;
  const lastVisiblePage = Math.min(
    firstVisiblePage + VISIBLE_PAGE_COUNT - 1,
    totalPages
  );
  const pageNumbers = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index
  );

  return (
    <nav className="pagination" aria-label="Paginación">
      <ul className="pagination-list">
        <li>
          <button
            type="button"
            className="pagination-button pagination-arrow"
            onClick={() => paginado(activePage - 1)}
            disabled={activePage === 1}
            aria-label="Página anterior"
          >
            ←
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              className={`pagination-button${
                number === activePage ? " is-active" : ""
              }`}
              onClick={() => paginado(number)}
              aria-current={number === activePage ? "page" : undefined}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="pagination-button pagination-arrow"
            onClick={() => paginado(activePage + 1)}
            disabled={activePage === totalPages}
            aria-label="Página siguiente"
          >
            →
          </button>
        </li>
      </ul>
    </nav>
  );
}
