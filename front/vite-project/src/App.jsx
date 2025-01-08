import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nabvar from "./components/Navbar/Nabvar";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import MyAppointments from "./views/MyAppointments/MyAppointments";
import Register from "./views/Register/Register"
import NotFound from "./views/NotFound/NotFound";
import styles from "./App.module.css";
import { UsersContext } from "./contex/UsersContex";
import Schedule from "./components/Schedule/Schedule";


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isNotFound, setisNotFound] = useState(false);
  const {user} = useContext(UsersContext)

  useEffect(() => {

    const validRoutes= ["/", "/login", "/register", "/myappointments", "/schedule"]

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
              <formulary className={styles.formulary}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
            </Routes>
              </formulary>
            </main>
          ): (
      <>
      { !isNotFound && (
          <Nabvar />
      )}
      <main className={styles.main2}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/myappointments" element={<MyAppointments/>} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="*" element={<NotFound/> }/>
        </Routes>
      </main>
        </>
          )
        }
        </>
  );
}

export default App;
