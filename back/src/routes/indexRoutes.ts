import { Router } from "express";
import usersRouter from "./usersRoutes";
import appointmentRouter from "../routes/appointmentsRoutes";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/appointments", appointmentRouter);

export default router;
