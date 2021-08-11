import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Logo from "../../img/logoHenry.png";

function Nav() {
  return (
    <header className="App-header">
      <div>
        <img
          id="logoHenry"
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo-Henry"
        />
      </div>
      <h1>Henry Dog breeds</h1>
      <nav>
        <Link className="App-link" exact to="/">
          <h3>Home</h3>
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
