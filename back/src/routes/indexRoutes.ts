import { Router } from "express";
import usersRouter from "./usersRoutes";
import appointmentRouter from "./appointmentsRoutes";
// import auth from "../middlewares/auth";

const router: Router = Router();

router.use("/users", usersRouter);
router.use("/appointment", appointmentRouter);

export default router;
