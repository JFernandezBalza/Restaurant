"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelStatusAppointmentsService = exports.registerAppointmentsService = exports.getAppointmentsByIdService = exports.getAppointmentsService = void 0;
const IAppointments_1 = require("../interface/IAppointments");
const Appointment_Repository_1 = require("../repositories/Appointment.Repository");
const customError_1 = require("../utils/customError");
const usersService_1 = require("./usersService");
const getAppointmentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Appointment_Repository_1.AppointmentRepository.find();
});
exports.getAppointmentsService = getAppointmentsService;
const getAppointmentsByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10),
        },
    });
    if (!appointmentFound)
        throw new customError_1.CustomError(400, `La cita con el id ${id} no fue encontrada`);
    else
        return appointmentFound;
});
exports.getAppointmentsByIdService = getAppointmentsByIdService;
const registerAppointmentsService = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, usersService_1.getUsersByIdService)(appointmentData.userId);
    Appointment_Repository_1.AppointmentRepository.validateAllowAppointments(appointmentData.date, appointmentData.time);
    yield Appointment_Repository_1.AppointmentRepository.validateExistingAppointment(appointmentData.userId, appointmentData.date, appointmentData.time);
    const newAppointment = Appointment_Repository_1.AppointmentRepository.create({
        date: new Date(appointmentData.date),
        time: appointmentData.time,
        user: {
            id: appointmentData.userId,
        },
    });
    return yield Appointment_Repository_1.AppointmentRepository.save(newAppointment);
});
exports.registerAppointmentsService = registerAppointmentsService;
const cancelStatusAppointmentsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentFound = yield Appointment_Repository_1.AppointmentRepository.findOne({
        where: {
            id: parseInt(id, 10),
        },
    });
    if (!appointmentFound)
        throw new customError_1.CustomError(404, `La cita con el id ${id} no fue encontrada`);
    appointmentFound.status = IAppointments_1.Status.canceled;
    yield Appointment_Repository_1.AppointmentRepository.save(appointmentFound);
});
exports.cancelStatusAppointmentsService = cancelStatusAppointmentsService;
