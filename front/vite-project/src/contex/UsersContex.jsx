/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useMemo, useState } from 'react';

// --- INICIO DE LOS CAMBIOS CLAVE ---

// Define la URL base de tu API usando la variable de entorno de Vite.
// Vercel inyectará aquí la URL de tu backend en Render.
const API_BASE_URL = import.meta.env.VITE_API_URL;

// --- FIN DE LOS CAMBIOS CLAVE ---

// eslint-disable-next-line react-refresh/only-export-components
export const UsersContext = createContext({
  user: '',
  userAppointments: [],
  loginUser: async () => {},
  registerUser: async () => {},
  logOutUser: () => {},
  getUserAppointments: async () => {},
  cancelAppointment: async () => {},
  createAppointment: async () => {},
});

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('userId') || '');
  const [userAppointments, setUserAppointments] = useState([]);

  const loginUser = async (userData) => {
    // --- CAMBIO AQUÍ: Usando API_BASE_URL ---
    const respLogin = await axios.post(`${API_BASE_URL}/users/login`, userData);
    localStorage.setItem('userId', respLogin.data.user.id);
    setUser(respLogin.data.user.id);
  };

  const registerUser = async (userData) => {
    // --- CAMBIO AQUÍ: Usando API_BASE_URL ---
    await axios.post(`${API_BASE_URL}/users/register`, userData);
  };

  const logOutUser = () => {
    localStorage.clear();
    setUser('');
    setUserAppointments([]);
  };

  const getUserAppointments = async (userId) => {
    // --- CAMBIO AQUÍ: Usando API_BASE_URL ---
    const respGetAppo = await axios.get(`${API_BASE_URL}/users/${userId}`);
    setUserAppointments(respGetAppo.data.appointments);
  };

  const cancelAppointment = async (appointmentId) => {
    // --- CAMBIO AQUÍ: Usando API_BASE_URL ---
    await axios.put(`${API_BASE_URL}/appointments/cancel/${appointmentId}`);

    const userAppointmentsUpdate = userAppointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        const appointmentUpdate = { ...appointment, status: 'cancel' };
        return appointmentUpdate;
      } else return appointment;
    });
    setUserAppointments(userAppointmentsUpdate);
  };

  const createAppointment = async (values) => {
    const appointmentsValues = {
      ...values,
      userId: user,
    };

    // --- CAMBIO AQUÍ: Usando API_BASE_URL ---
    await axios.post(
      `${API_BASE_URL}/appointments/schedule`,
      appointmentsValues
    );
  };

  const value = useMemo(
    () => ({
      user,
      userAppointments,
      loginUser,
      registerUser,
      logOutUser,
      getUserAppointments,
      cancelAppointment,
      createAppointment,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, userAppointments]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
