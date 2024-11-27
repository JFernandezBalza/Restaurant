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
const appointmentsService_1 = require("../services/appointmentsService");
const errorCatch_1 = require("../utils/errorCatch");
const getAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, appointmentsService_1.getAppointmentsService)();
    res.status(200).json({
        message: "Obtener el listado de todos los turnos de todos los usuarios",
        data: serviceResponse,
    });
});
const getAppointmentsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceResponse = yield (0, appointmentsService_1.getAppointmentsByIdService)(id);
    res.status(200).json({
        message: "Obtener el detalle de un turno especifico",
        data: serviceResponse,
    });
});
const registerAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceResponse = yield (0, appointmentsService_1.registerAppointmentsService)(req.body);
    res.status(201).json({
        message: "Agendar un nuevo turno",
        data: serviceResponse,
    });
});
const cancelStatusAppointmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const serviceResponse = yield (0, appointmentsService_1.cancelStatusAppointmentsService)(id);
    res.status(200).json({
        message: "Se cancelo con exito",
        data: serviceResponse,
    });
});
const appointmentController = {
    getAppointmentsController: (0, errorCatch_1.errorCatch)(getAppointmentsController),
    getAppointmentsByIdController: (0, errorCatch_1.errorCatch)(getAppointmentsByIdController),
    registerAppointmentsController: (0, errorCatch_1.errorCatch)(registerAppointmentsController),
    cancelStatusAppointmentsController: (0, errorCatch_1.errorCatch)(cancelStatusAppointmentsController),
};
exports.default = appointmentController;
