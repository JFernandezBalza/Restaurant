"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelStatusAppointmentsService = exports.registerAppointmentsService = exports.getAppointmentsByIdService = exports.getAppointmentsService = void 0;
const IAppointments_1 = require("../interface/IAppointments");
const Appointment_Repository_1 = require("../repositories/Appointment.Repository");
const customError_1 = require("../utils/customError");
const usersService_1 = require("./usersService");
const getAppointmentsService = async () => {
    return await Appointment_Repository_1.AppointmentRepository.find();
};
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentsByIdService = async (id) => {
    const appointmentFound = await Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10),
        },
    });
    if (!appointmentFound)
        throw new customError_1.CustomError(400, `La cita con el id ${id} no fue encontrada`);
    else
        return appointmentFound;
};
exports.getAppointmentsByIdService = getAppointmentsByIdService;
const registerAppointmentsService = async (appointmentData) => {
    await (0, usersService_1.getUsersByIdService)(appointmentData.userId);
    Appointment_Repository_1.AppointmentRepository.validateAllowAppointments(appointmentData.date, appointmentData.time);
    await Appointment_Repository_1.AppointmentRepository.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time);
    const newAppointment = Appointment_Repository_1.AppointmentRepository.create({
        date: new Date(appointmentData.date),
        time: appointmentData.time,
        user: {
            id: appointmentData.userId,
        },
    });
    return await Appointment_Repository_1.AppointmentRepository.save(newAppointment);
};
exports.registerAppointmentsService = registerAppointmentsService;
const cancelStatusAppointmentsService = async (id) => {
    const appointmentFound = await Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10),
        },
    });
    if (!appointmentFound)
        throw new customError_1.CustomError(404, `La cita con el id ${id} no fue encontrada`);
    appointmentFound.status = IAppointments_1.Status.canceled;
    await Appointment_Repository_1.AppointmentRepository.save(appointmentFound);
};
exports.cancelStatusAppointmentsService = cancelStatusAppointmentsService;
//# sourceMappingURL=appointmentsService.js.map