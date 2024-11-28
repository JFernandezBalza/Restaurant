import { Link } from "react-router-dom";


function Nabvar() {
  return (
   <div>
    <nav>
      <li>
        <Link to= "/">Home </Link>
      </li>
      <li>
        <Link to= "/misturnos">Mis Turnos </Link>
      </li>
    </nav>
   </div>
  );
}

export default Nabvar;
