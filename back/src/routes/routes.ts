import { Router } from "express";
import {
  createUsers,
  getUsers,
  deleteUsers,
} from "../controllers/usersController";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/users", createUsers);
router.get("/users", auth, getUsers);
router.delete("/users", deleteUsers);

export default router;
