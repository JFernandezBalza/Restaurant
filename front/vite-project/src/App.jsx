import { useEffect, useState } from "react";  
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";  
import Nabvar from "./components/Navbar/Nabvar";  
import Home from "./views/Home/Home";  
import Login from "./views/Login/Login";  
import MisTurnos from "./views/MisTurnos/MisTurnos";  
import Register from "./views/Register/Register";  
import NotFound from "./views/NotFound/NotFound";  
import styles from './App.module.css'; // Importar estilos del CSS Module  

function App() {  
  const location = useLocation();  
  const navigate = useNavigate();  
  const [isLogged, setIsLogged] = useState(true); // Cambia a false para simular no autenticación  
  const [isNotFound, setIsNotFound] = useState(false);  

  useEffect(() => {  
    const validRoutes = ["/", "/login", "/register", "/misturnos"];  
    const currentPath = location.pathname;  

    setIsNotFound(!validRoutes.includes(currentPath));  

    if (!isLogged && currentPath !== "/login" && currentPath !== "/register") {  
      navigate("/login");  
    }  

    if (isLogged && (currentPath === "/login" || currentPath === "/register")) {  
      navigate("/");  
    }  
  }, [location.pathname, isLogged, navigate]);  

  return (  
    <>  
      <header className={styles.header}>  
        {(!isLogged || isNotFound) && <Nabvar />}  
      </header>  
      <main className={styles.main}>  
        <Routes>  
          <Route path="/" element={isLogged ? <Home /> : <Login />} />  
          <Route path="/login" element={!isLogged ? <Login /> : <Home />} />  
          <Route path="/register" element={isLogged ? <Home /> : <Register />} />  
          <Route path="/misturnos" element={isLogged ? <MisTurnos /> : <Login />} />  
          <Route path="*" element={<NotFound />} />  
        </Routes>  
      </main>  
    </>  
  );  
}  

export default App;