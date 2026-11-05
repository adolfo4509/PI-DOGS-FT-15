import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Logo from "../../img/logoHenry.png";

function Nav() {
  return (
    <header className="App-header site-header">
      <Link className="nav-brand" exact to="/" aria-label="Henry Dog breeds, inicio">
        <img
          src={Logo}
          className="nav-logo"
          alt="Logo-Henry"
        />
        <span className="nav-title">Henry Dog breeds</span>
      </Link>
      <nav className="navBar site-nav" aria-label="Navegación principal">
        <Link className="App-link site-nav-link" exact to="/home">
          Home
        </Link>
        <Link className="App-link site-nav-link" to="/dogs">
          Create Breads
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
