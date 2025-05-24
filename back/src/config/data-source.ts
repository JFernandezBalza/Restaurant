import { DataSource } from "typeorm";
import {
  DB_DATABASE,
  DB_DROP,
  DB_ENTITIES,
  DB_HOST,
  DB_LOGGING,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_TYPE,
  DB_USERNAME,
} from "./envs";

// No necesitamos 'isProduction' aquí para el SSL si lo basamos en DB_HOST
// const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: DB_SYNC,
  logging: DB_LOGGING,
  entities: DB_ENTITIES,
  migrations: [
    // Asegúrate de que esta lógica de rutas sea correcta para tus archivos TS/JS
    process.env.NODE_ENV === 'production' ? 'dist/migrations/**/*.js' : 'src/migrations/**/*.ts',
  ],
  dropSchema: DB_DROP,
  // **¡MODIFICACIÓN CLAVE AQUÍ!**
  // Solo habilita SSL si hay un host de DB definido (será el de Render)
  // y si no estás en un entorno de desarrollo local específico que no lo necesita.
  ssl: DB_HOST ? { rejectUnauthorized: false } : false,
});