"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const data_source_1 = require("./config/data-source");
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
require("reflect-metadata");
data_source_1.AppDataSource.initialize()
    .then((res) => {
    console.log("Se realizo con exitó la conexión a la DB");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Server listening on PORT: ${envs_1.PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
