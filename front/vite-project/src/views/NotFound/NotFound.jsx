import { Link } from "react-router-dom";

const NotFound= () =>{
    return(
        <div>
            <h1>404</h1>
            <p>Opps! No existe la pagina que buscas!</p>
            <Link to= "/">Volver al Home</Link>
        </div>
    )
}



export default NotFound;