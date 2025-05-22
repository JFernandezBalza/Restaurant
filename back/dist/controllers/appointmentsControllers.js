"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointmentsService_1 = require("../services/appointmentsService");
const errorCatch_1 = require("../utils/errorCatch");
const getAppointmentsController = async (req, res) => {
    const serviceResponse = await (0, appointmentsService_1.getAppointmentsService)();
    res.status(200).json({
        message: "Obtener el listado de todos los turnos de todos los usuarios",
        data: serviceResponse,
    });
};
const getAppointmentsByIdController = async (req, res) => {
    const { id } = req.params;
    const serviceResponse = await (0, appointmentsService_1.getAppointmentsByIdService)(id);
    res.status(200).json({
        message: "Obtener el detalle de un turno especifico",
        data: serviceResponse,
    });
};
const registerAppointmentsController = async (req, res) => {
    const serviceResponse = await (0, appointmentsService_1.registerAppointmentsService)(req.body);
    res.status(201).json({
        message: "Agendar un nuevo turno",
        data: serviceResponse,
    });
};
const cancelStatusAppointmentsController = async (req, res) => {
    const { id } = req.params;
    const serviceResponse = await (0, appointmentsService_1.cancelStatusAppointmentsService)(id);
    res.status(200).json({
        message: "Se cancelo con exito",
        data: serviceResponse,
    });
};
const appointmentController = {
    getAppointmentsController: (0, errorCatch_1.errorCatch)(getAppointmentsController),
    getAppointmentsByIdController: (0, errorCatch_1.errorCatch)(getAppointmentsByIdController),
    registerAppointmentsController: (0, errorCatch_1.errorCatch)(registerAppointmentsController),
    cancelStatusAppointmentsController: (0, errorCatch_1.errorCatch)(cancelStatusAppointmentsController),
};
exports.default = appointmentController;
//# sourceMappingURL=appointmentsControllers.js.map