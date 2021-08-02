import { Route } from "react-router-dom";
import "./App.css";
import Buscador from "./Components/Buscador/buscador";
import Cards from "./Components/Cards/cards";
import Nav from "./Components/Nav/nav";

function App() {
  return (
    <div>
      <Nav />
      <Route path="/" component={Buscador}></Route>
      <Route path="/cards" component={Cards}></Route>
    </div>
  );
}

export default App;
