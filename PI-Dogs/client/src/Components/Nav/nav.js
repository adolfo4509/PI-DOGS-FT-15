import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Logo from "../../img/logoHenry.png";

function Nav() {
  return (
    <header className="App-header">
      <div>
        <img
          id="App-logo"
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo-Henry"
        />
      </div>
      <h1>Henry Dog breeds</h1>
      <div className="navBar">
        <Link className="App-link" exact to="/">
          <h3>Home</h3>
        </Link>
        <Link className="App-link" to="/dogs">
          <h3>Create Breads</h3>
        </Link>
      </div>
    </header>
  );
}

export default Nav;
