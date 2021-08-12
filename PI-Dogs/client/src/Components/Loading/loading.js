import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import "../Loading/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";

// const loading = () => {
//   setTimeout(() => {}, 3000);
// };

export default function Loading() {
  return (
    <div className="loading">
      <div className="spiner">
        <Spinner color="warning" />
      </div>
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
