import { IAppointmentRegisterDTO } from "../dto/AppointmentDTO";
import { IAppointment, Status } from "../interface/IAppointments";
import { getUsersByIdService } from "./usersService";


const appointmentList: IAppointment[]= []
let id: number =1

export const getAppointmentsService = async (): Promise<IAppointment[]> => {
  return appointmentList;
};

export const getAppointmentsByIdService = async (
  id: string
): Promise<IAppointment> => {
  const appointmentFound= appointmentList.find(appointmen => appointmen.id=== parseInt(id, 10))
  if(!appointmentFound)  throw new Error(`La cita con el id ${id} no fue encontrada`)
    else return appointmentFound;
};

export const registerAppointmentsService = async (
  appointmentData: IAppointmentRegisterDTO
): Promise<IAppointmentRegisterDTO> => {

  const userFound= await getUsersByIdService(appointmentData.userId.toString())
  if(!userFound) throw new Error(`El usuario con el id: ${appointmentData.userId} no existe`)

  const newAppointments: IAppointment= {
    id: id++,
    date: new Date(appointmentData.date),
    time: appointmentData.time,
    status: Status.active,
    userId: appointmentData.userId
  }

  appointmentList.push(newAppointments)
  return newAppointments

};


export const cancelStatusAppointmentsService = async (
  id: string
): Promise<IAppointment> => {
  const appointmentFound= appointmentList.find(appointmen => appointmen.id=== parseInt(id, 10))
  if(!appointmentFound)  throw new Error(`La cita con el id ${id} no fue encontrada`)
    appointmentFound.status= Status.canceled
  return appointmentFound
};
