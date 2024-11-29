/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import styles from "./Nabvar.module.css";
import Swal from "sweetalert2";

function Navbar({ setIsLogged }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    Swal.fire({
      icon: "warning",
      title: "Tu sesion fue cerrada correctamente",
    })
    localStorage.clear()
    setIsLogged(false)
    navigate("/login");
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/misturnos">Mis Turnos</Link>
          </li>
          <li className={styles.menuItem} onClick={handleLogOut}>
            <Link to="/login">LogOut</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
