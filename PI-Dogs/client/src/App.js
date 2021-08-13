import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import DogsCreate from "./Components/BreadsCreate/breadsCreate";
import Card from "./Components/Cards/card";
import Home from "./Components/Home/home";
import Loading from "./Components/Loading/loading";
import Nav from "./Components/Nav/nav";

function App() {
  //Aqui creamos las Rutas
  return (
    <BrowserRouter>
      <div className="contenedor">
        <switch>
          <Nav />
          <Route exact path="/">
            <Loading />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/dogs">
            <DogsCreate />
          </Route>
          <Route path="/card">
            <Card />
          </Route>
        </switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
