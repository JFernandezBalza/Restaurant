import "./App.module.css";
// import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
// import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register";

function App() {
  return (
    <>
      <h1>Estamos aprendiendo React</h1>
      {/* <Home />
      <MisTurnos /> */}

      <Register/>
      <Login/>
    </>
  );
}

export default App;
