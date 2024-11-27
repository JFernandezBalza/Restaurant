/* eslint-disable react/prop-types */
const Turno = ({ id, date, time, status }) => {
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
    </>
  );
};

export default Turno;
