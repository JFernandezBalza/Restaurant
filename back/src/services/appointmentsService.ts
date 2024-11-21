import { IAppointmentRegisterDTO } from "../dto/AppointmentDTO";
import { Appointment } from "../entities/Appointments.entitiy";
import { Status } from "../interface/IAppointments";
import { AppointmentRepository } from "../repositories/Appointment.Repository";
import { CustomError } from "../utils/customError";
import { getUsersByIdService } from "./usersService";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
  return await AppointmentRepository.find();
};

export const getAppointmentsByIdService = async (
  id: string
): Promise<Appointment | null> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!appointmentFound)
    throw new CustomError(400, `La cita con el id ${id} no fue encontrada`);
  else return appointmentFound;
};

export const registerAppointmentsService = async (
  appointmentData: IAppointmentRegisterDTO
): Promise<Appointment> => {
  await getUsersByIdService(appointmentData.userId);

  AppointmentRepository.validateAllowAppointments(
    appointmentData.date,
    appointmentData.time
  );
  await AppointmentRepository.validateExistingAppointment(
    appointmentData.userId,
    appointmentData.date,
    appointmentData.time
  );

  const newAppointment = AppointmentRepository.create({
    date: new Date(appointmentData.date),
    time: appointmentData.time,
    user: {
      id: appointmentData.userId,
    },
  });
  return await AppointmentRepository.save(newAppointment);
};
export const cancelStatusAppointmentsService = async (
  id: string
): Promise<void> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!appointmentFound)
    throw new CustomError(404, `La cita con el id ${id} no fue encontrada`);
  appointmentFound.status = Status.canceled;
  await AppointmentRepository.save(appointmentFound);
};
