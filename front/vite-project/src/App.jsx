import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nabvar from "./components/Navbar/Nabvar";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import MisTurnos from "./views/MisTurnos/MisTurnos";
import Register from "./views/Register/Register"
import NotFound from "./views/NotFound/NotFound";
import styles from "./App.module.css";
import { UsersContext } from "./contex/UsersContex";


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isNotFound, setisNotFound] = useState(false);
  const {user} = useContext(UsersContext)

  useEffect(() => {

    const validRoutes= ["/", "/login", "/register", "/misturnos"]

    if(!validRoutes.includes(location.pathname))setisNotFound(true)
      else setisNotFound(false)


    if(!user && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login")
    }


    if(user && location.pathname === "/login" || user && location.pathname === "/register") {
      navigate("/")
    }
  }, [location.pathname, user, navigate]);

  return (
      <>
        {
          !user ? (
            <main className={styles.main}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
            </Routes>
            </main>
          ): (
      <>
      { !isNotFound && (
        <header>
          <span>Restaurant</span>
          <Nabvar />
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
