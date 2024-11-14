import { AppointmentRegisterDTO } from "../dto/AppointmentDTO";

export const getAppointmentsService = async (): Promise<void> => {};

export const getAppointmentsByIdService = async (
  id: string
): Promise<string> => {
  return id;
};

export const registerAppointmentsService = async (
  appointmentData: AppointmentRegisterDTO
): Promise<AppointmentRegisterDTO> => {
  return appointmentData;
};

export const cancelStatusAppointmentsService = async (
  id: string
): Promise<string> => {
  return id;
};
