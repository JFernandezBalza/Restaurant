import { Request, Response } from "express";
import { IAppointmentRegisterDTO } from "../dto/AppointmentDTO";
import {
  cancelStatusAppointmentsService,
  getAppointmentsByIdService,
  getAppointmentsService,
  registerAppointmentsService,
} from "../services/appointmentsService";

export const handleErrorResponse= (error: unknown, res: Response, message: string): void => {
  const errorMessage= {
    message: message,
    detail: error instanceof Error ? error.message: "Error desconocido",
  }
  res.status(400).json(errorMessage);
}

export const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const serviceResponse = await getAppointmentsService();
    res.status(200).json({
      message: "Obtener el listado de todos los turnos de todos los usuarios",
      data: serviceResponse,
    });
  } catch (error) {
handleErrorResponse(error, res, "Error al obtener todas las citas");
    }
};

export const getAppointmentsByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await getAppointmentsByIdService(id);
    res.status(200).json({
      message: "Obtener el detalle de un turno especifico",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al obtener la cita del turno especifico");
        }
    };

export const registerAppointmentsController = async (
  req: Request<unknown, unknown, IAppointmentRegisterDTO>,
  res: Response
): Promise<void> => {

  try {
    const serviceResponse: IAppointmentRegisterDTO =
      await registerAppointmentsService(req.body);
    res.status(200).json({
      message: "Agendar un nuevo turno",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al agendar la nueva cita"); 
        }
    };

export const cancelStatusAppointmentsController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const serviceResponse = await cancelStatusAppointmentsService(id);
    res.status(200).json({
      message: "Cambiar status del turno a cancelled",
      data: serviceResponse,
    });
  } catch (error) {
    handleErrorResponse(error, res, "Error al cancelar la cita"); 
        }
    };