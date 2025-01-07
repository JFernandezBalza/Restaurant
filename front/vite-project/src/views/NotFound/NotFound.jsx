import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"

const NotFound= () =>{
    return(
        <div className= {styles.notF}>
            <div className= {styles.error}>
            <h1>404</h1>
            <p>Opps! No existe la pagina que buscas!</p>
            </div>
            <Link to= "/" className={styles.volt}>Volver al Home</Link>
        </div>
    )
}

export default NotFound;