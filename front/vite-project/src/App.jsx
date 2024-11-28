import { useEffect, useState } from "react";
import "./App.module.css";
import Nabvar from "./components/Navbar/Nabvar";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register";
import { Routes, Route, useNavigate, useLocation} from "react-router-dom";
import NotFound from "./views/NotFound/NotFound";

function App() {

  const location= useLocation();
  const navigate= useNavigate();
  const [isLogged, setIsLogged]= useState(true);
  const [isNotFound, setIsNotFound]= useState(false);

  useEffect(()=>{

    const validRoutes= ["/", "/login", "/register", "/misturnos"]
    if(!validRoutes.includes(location.pathname))setIsNotFound(true)
      else setIsNotFound(false)
    
    if(!isLogged && location.pathname !== "/login" && location.pathname !== "/register"){
      navigate("/login")
    }

    if(isLogged && location.pathname === "/login" || isLogged && location.pathname === "/register"){
      navigate("/")
    }
  }, [location.pathname, isLogged])


  return (
    <>

    {
    !isLogged ? (
      <>
        <Nabvar/>
        <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      </>
      ): (
        <>
        {!isNotFound && (
          <header>
            <span>LOGO</span>
            <Nabvar />
          </header>
        )}
        <main>
        <Route path="/" element={<Home/>} />
        <Route path="/misturnos" element={<MisTurnos/>} />
        <Route path="*" element={<NotFound/>} />
        </main>
        </>
      )
    }  
    </>
  );
}

export default App;
