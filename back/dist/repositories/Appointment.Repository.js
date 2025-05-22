"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const data_source_1 = require("../config/data-source");
const Appointments_entitiy_1 = require("../entities/Appointments.entitiy");
exports.AppointmentRepository = data_source_1.AppDataSource.getRepository(Appointments_entitiy_1.Appointment).extend({
    validateAllowAppointments: function (date, time) {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const now = new Date();
        const appointmentDateCh = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
        const dayOnWeek = appointmentDateCh.getDay();
        if (dayOnWeek === 5 || dayOnWeek === 6) {
            throw new Error("No se puede reservar turnos los fines de semana");
        }
        const nowInCh = new Date(now.getTime() - 3 * 60 * 60 * 1000);
        if (appointmentDateCh < nowInCh) {
            throw new Error("No se pueden agendar turnos en fechas anteriores");
        }
        const timeDifference = appointmentDateCh.getTime() - nowInCh.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        if (hoursDifference < 24) {
            throw new Error("La reserva de turnos debe ser con al menos 24 horas de antelación");
        }
        if (hours < 8 || hours >= 17) {
            throw new Error("Los turnos deben agendarse entre las 8hrs y las 17hrs");
        }
    },
    validateExistingAppointment: async function (userId, date, time) {
        const [hours, minutes] = time.split(":").map(Number);
        const appointmentDate = new Date(date);
        appointmentDate.setHours(hours, minutes, 0);
        const appointmenFound = await this.findOne({
            where: {
                user: { id: userId },
                date: appointmentDate,
                time: time,
            },
        });
        if (appointmenFound) {
            throw new Error(`El turno con fecha: ${date} y hora ${time} ya existe para este usuario`);
        }
    },
});
//# sourceMappingURL=Appointment.Repository.js.map