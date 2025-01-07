import { useContext, useEffect } from "react";
import Appointment from "../../components/Appointment/Appointment";
import { UsersContext } from "../../contex/UsersContex";

const MyAppointments = () => {

  const {getUserAppointments, user, userAppointments} =useContext(UsersContext)

  useEffect(() => {
    getUserAppointments(user)
  }, []);

  return (
    <div>
      <div>
        <h1>Estos son mis turnos</h1>
      </div>

      <div>
        {
        Array.isArray(userAppointments) && userAppointments.length > 0 ? userAppointments.map( (turno) => (
          <Appointment
              key={turno.id}
              id={turno.id}
              date={turno.date}
              time={turno.time}
              status={turno.status}
            />
        )) : (
          <h1>No hay turnos para mostrar</h1>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
