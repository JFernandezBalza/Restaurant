// src/config/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
} from './envs'; // Importa las variables ya parseadas de envs.ts

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: DB_SYNC,
  logging: DB_LOGGING ? ['error'] : false, // Asegúrate de que esto sea un array o false. DB_LOGGING en envs.ts es boolean.
  entities: DB_ENTITIES, // Ya es un array de strings en envs.ts
  migrations: [
    // Asegúrate de que esta lógica de rutas sea correcta para tus archivos TS/JS
    process.env.NODE_ENV === 'production'
      ? 'dist/migrations/**/*.js'
      : 'src/migrations/**/*.ts',
  ],
  dropSchema: DB_DROP,

  // **¡MODIFICACIÓN CLAVE PARA EL SSL!**
  // En desarrollo local (cuando DB_HOST es localhost), generalmente no necesitas SSL.
  // En producción (Render), probablemente sí.
  // Usaremos una lógica para decidir si activar SSL.
  ssl: DB_HOST === 'localhost' ? false : { rejectUnauthorized: false },
});
