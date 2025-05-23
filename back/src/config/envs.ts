/* eslint-disable @typescript-eslint/prefer-as-const */
import 'dotenv/config'; // Para cargar .env local
import { parse as parseConnectionString } from 'pg-connection-string'; // Importa el parser

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

  const databaseUrl = process.env.DATABASE_URL || '';
  let parsedDbUrl: ReturnType<typeof parseConnectionString> | undefined;

  if (databaseUrl) {
    try {
      parsedDbUrl = parseConnectionString(databaseUrl);
    } catch (e) {
      console.error('Error parsing DATABASE_URL:', e);
      parsedDbUrl = undefined;
    }
  }

  console.log('DEBUGGING ENV VARS:');
  console.log('DATABASE_URL (from envs.ts):', databaseUrl);
  console.log('Parsed DB Host:', parsedDbUrl?.host);
  console.log('Parsed DB Port:', parsedDbUrl?.port);
  console.log('Parsed DB User:', parsedDbUrl?.user);
  console.log(
    'Parsed DB Password (first 5 chars):',
    parsedDbUrl?.password ? parsedDbUrl.password.substring(0, 5) + '...' : ''
  );
  console.log('Parsed DB Database:', parsedDbUrl?.database);

// Define las variables individuales usando los valores parseados si existen,
// o las variables individuales de ENV (para desarrollo local sin DATABASE_URL),
// o valores por defecto.

export const DB_TYPE: 'postgres' = 'postgres'; // Esto es fijo para PostgreSQL

export const DB_HOST: string | undefined =
  parsedDbUrl?.host || process.env.DB_HOST;
export const DB_PORT: number = parsedDbUrl?.port
  ? parseInt(parsedDbUrl.port, 10)
  : process.env.DB_PORT
    ? parseInt(process.env.DB_PORT, 10)
    : 5432;
export const DB_USERNAME: string | undefined =
  parsedDbUrl?.user || process.env.DB_USERNAME;
export const DB_PASSWORD: string | undefined =
  parsedDbUrl?.password || process.env.DB_PASSWORD;
export const DB_DATABASE: string | undefined =
  parsedDbUrl?.database || process.env.DB_DATABASE;

export const DB_SYNC: boolean = process.env.DB_SYNC
  ? process.env.DB_SYNC === 'true'
  : false;
export const DB_LOGGING: boolean = process.env.DB_LOGGING
  ? process.env.DB_LOGGING === 'true'
  : true;

const isProduction = process.env.NODE_ENV === 'production';

export const DB_ENTITIES: string[] = [
  isProduction ? 'dist/entities/**/*.js' : 'src/entities/**/*.ts',
];
export const DB_DROP: boolean = process.env.DB_DROP
  ? process.env.DB_DROP === 'true'
  : false;
