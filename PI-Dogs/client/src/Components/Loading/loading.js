import React from "react";
import { Link } from "react-router-dom";

import "../Loading/loading.css";

// const loading = () => {
//   setTimeout(() => {}, 3000);
// };

export default function Loading() {
  return (
    <div className="loading">
      <div className="spiner1"></div>
      <p>LOADING PAGE</p>
      <div className="spinner"></div>
      <div className="buscador">
        <h1>Welcome </h1>
        <Link to="/home">
          <button className="button" type="">
            Ingresar
          </button>
        </Link>
      </div>
    </div>
  );
}
