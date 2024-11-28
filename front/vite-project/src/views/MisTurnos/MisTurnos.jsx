import { useEffect, useState } from "react";
import Turno from "../../components/Turno/Turno";
import axios from "axios";

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/appointments")
      .then((response) => {
        console.log(response);
        setTurnos(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div>
        <h1>Estos son mis turnos</h1>
      </div>

      <div>
        {turnos.length > 0 ? (
          turnos.map((turno) => (
            <Turno
              key={turno.id}
              id={turno.id}
              date={turno.date}
              time={turno.time}
              status={turno.status}
            />
          ))
        ) : (
          <h1>No hay turnos para mostrar</h1>
        )}
      </div>
    </div>
  );
};

export default MisTurnos;
