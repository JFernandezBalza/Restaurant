import { useState } from "react";
import myAppointments from "../../helpers/myAppointments";
import Turno from "../../components/Turno/Turno";

const MisTurnos = () => {
  const [turnos, setTurnos] = useState(myAppointments);

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
