import { Link, useNavigate } from "react-router-dom";
import styles from "./Nabvar.module.css";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UsersContext } from "../../contex/UsersContex";

function Navbar() {

  const {logOutUser}= useContext(UsersContext)

  const navigate = useNavigate();
  const handleLogOut = () => {
    logOutUser()
    Swal.fire({
      icon: "warning",
      title: "Tu sesion fue cerrada correctamente",
    })
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
            <Link to="/myappointments">Mis Turnos</Link>
          </li>
          <li className={styles.menuItem}>
            <Link to="/schedule">Agendar Turno</Link>
          </li>

          <li className={styles.menuItem} onClick={handleLogOut}>
            <Link to="/login">Cerrar Sesión</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
