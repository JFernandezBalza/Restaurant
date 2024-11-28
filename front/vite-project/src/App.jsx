import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nabvar from "./components/Navbar/Nabvar";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register"
import NotFound from "./views/NotFound/NotFound";
import styles from "./App.module.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);
  const [isNotFound, setisNotFound] = useState(false);

  useEffect(() => {

    const validRoutes= ["/", "/login", "/register", "/misturnos"]

    if(!validRoutes.includes(location.pathname))setisNotFound(true)
      else setisNotFound(false)


    if(!isLogged && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login")
    }


    if(isLogged && location.pathname === "/login" || isLogged && location.pathname === "/register") {
      navigate("/")
    }
  }, [location.pathname, isLogged, navigate]);

  return (
      <>
        {
          !isLogged ? (
            <main className={styles.main}>
            <Routes>
              <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
              <Route path="/register" element={<Register/>} />
            </Routes>
            </main>
          ): (
      <>
      { !isNotFound && (
        <header>
          <span>LOGO</span>
          <Nabvar setIsLogged={setIsLogged} />
        </header>
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/misturnos" element={<MisTurnos/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
        </>
          )
        }
    </>
  );
}

export default App;
