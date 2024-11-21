"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const Appointments_entitiy_1 = require("../entities/Appointments.entitiy");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointments_entitiy_1.Appointment);
