import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import DogsCreate from "./Components/BreadsCreate/breadsCreate";
import Buscador from "./Components/Buscador/search";
import Cards from "./Components/Cards/cards";
import Home from "./Components/Home/home";
import Loading from "./Components/Loading/loading";
import Nav from "./Components/Nav/nav";

function App() {
  return (
    <BrowserRouter>
      <div className="contenedor">
        <Nav />
        <Route exact path="/" component={Loading} />
        <Route path="/dogs" component={DogsCreate} />
        <Route path="/home" component={Home}></Route>
        <Route path="/cards" component={Cards}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
