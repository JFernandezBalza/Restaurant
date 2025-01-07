import { useContext, useEffect } from "react";
import Appointment from "../../components/Appointment/Appointment";
import { UsersContext } from "../../contex/UsersContex";
import styles from "./MyAppointments.module.css";

const MyAppointments = () => {

  const {getUserAppointments, user, userAppointments} =useContext(UsersContext)

  useEffect(() => {
    getUserAppointments(user)
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1 className= {styles.title} >Mis turnos.</h1>
      </div>

      <div className={styles.card}>
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
          <h1 className= {styles.noCard}>No hay turnos para mostrar</h1>
        )}
      </div>
      
    </div>
  );
};

export default MyAppointments;
