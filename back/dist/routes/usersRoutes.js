"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersControllers_1 = __importDefault(require("../controllers/usersControllers"));
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", (req, res, next) => usersControllers_1.default.getUsersController(req, res, next));
usersRouter.get("/:id", (req, res, next) => usersControllers_1.default.getUsersByIdController(req, res, next));
usersRouter.post("/register", (req, res, next) => usersControllers_1.default.registerUsersController(req, res, next));
usersRouter.post("/login", (req, res, next) => usersControllers_1.default.loginUsersController(req, res, next));
exports.default = usersRouter;
