import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Buscador from "./Components/Buscador/search";
import Cards from "./Components/Cards/cards";
import Loading from "./Components/Loading/loading";
import Nav from "./Components/Nav/nav";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Route exact path="/" component={Loading} />
        <Route path="/home" component={Buscador}></Route>
        <Route path="/cards" component={Cards}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
