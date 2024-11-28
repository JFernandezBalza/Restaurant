import { Link } from "react-router-dom";  
import styles from './Navbar.module.css'; // Asegúrate de que este sea el nombre correcto para tu archivo CSS Module  

function Navbar() {  
  return (  
    <nav className={styles.navbar}>  
      <ul className={styles.menu}>  
        <li className={styles.menuItem}>  
          <Link to="/">Home</Link>  
        </li>  
        <li className={styles.menuItem}>  
          <Link to="/misturnos">Mis Turnos</Link>  
        </li>  
      </ul>  
    </nav>  
  );  
}  

export default Navbar;