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
exports.cancelStatusAppointmentsController = exports.registerAppointmentsController = exports.getAppointmentsByIdController = exports.getAppointmentsController = exports.handleErrorResponse = void 0;
const appointmentsService_1 = require("../services/appointmentsService");
const handleErrorResponse = (error, res, message) => {
    const errorMessage = {
        message: message,
        detail: error instanceof Error ? error.message : "Error desconocido",
    };
    res.status(400).json(errorMessage);
};
exports.handleErrorResponse = handleErrorResponse;
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, appointmentsService_1.getAppointmentsService)();
        res.status(200).json({
            message: "Obtener el listado de todos los turnos de todos los usuarios",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, exports.handleErrorResponse)(error, res, "Error al obtener todas las citas");
    }
});
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const serviceResponse = yield (0, appointmentsService_1.getAppointmentsByIdService)(id);
        res.status(200).json({
            message: "Obtener el detalle de un turno especifico",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, exports.handleErrorResponse)(error, res, "Error al obtener la cita del turno especifico");
    }
});
exports.getAppointmentsByIdController = getAppointmentsByIdController;
const registerAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceResponse = yield (0, appointmentsService_1.registerAppointmentsService)(req.body);
        res.status(200).json({
            message: "Agendar un nuevo turno",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, exports.handleErrorResponse)(error, res, "Error al agendar la nueva cita");
    }
});
exports.registerAppointmentsController = registerAppointmentsController;
const cancelStatusAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const serviceResponse = yield (0, appointmentsService_1.cancelStatusAppointmentsService)(id);
        res.status(200).json({
            message: "Cambiar status del turno a cancelled",
            data: serviceResponse,
        });
    }
    catch (error) {
        (0, exports.handleErrorResponse)(error, res, "Error al cancelar la cita");
    }
});
exports.cancelStatusAppointmentsController = cancelStatusAppointmentsController;
