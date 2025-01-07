/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useContext } from "react";
import { UsersContext } from "../../contex/UsersContex";
import Swal from "sweetalert2"

const Appointment = ({ id, date, time, status }) => {

    const { cancelAppointment} = useContext(UsersContext);

    const handleCancel= async () => {
      try {
        await cancelAppointment(id)
        Swal.fire({
          icon: "warning",
          color: "red",
          title: "Turno cancelado con exito"
        })
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "No se pudo cancelar el turno, vuelva a intentarlo"
        })
      }
    } 
  

  return (
    <>
      <div>
        <h3>Turno # {id} </h3>
        <span></span>
      </div>
      <div>
        <p>
          <strong>Fecha:</strong> <span>{date}</span>
        </p>
        <p>
          <strong>Hora:</strong> <span>{time}</span>
        </p>
        <p>
          <strong>Estado:</strong> <span>{status}</span>
        </p>
      </div>
      <button onClick={handleCancel}>Cancelar</button>
    </>
  );
};

Appointment.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Appointment;
