import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCredentialsTable1748113931767 implements MigrationInterface {
  name = 'CreateCredentialsTable1748113931767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. CREATE ALL TABLES FIRST
    // Order matters: tables with no foreign keys, then tables with foreign keys
    // (but ensure all referenced tables are created first)

    // Create "credentials" table
    await queryRunner.query(`
            CREATE TABLE "credentials" (
                "id" SERIAL NOT NULL,
                "username" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "update" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_9696610f85145a37910365498f9" UNIQUE ("username"),
                CONSTRAINT "PK_1e38bc43be6697cdda548ad27a6" PRIMARY KEY ("id")
            )
        `);

    // Create "users" table
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "email" character varying(50) NOT NULL,
                "birthdate" date NOT NULL,
                "nDni" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "update" TIMESTAMP NOT NULL DEFAULT now(),
                "credentialsId" integer,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_e7f1e0d33d9012a8bf2f008fe75" UNIQUE ("nDni"),
                CONSTRAINT "REL_2389db560d0e9b9535c7f9a096" UNIQUE ("credentialsId"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

    // Create "appointments" table
    // AÑADIDA LA COLUMNA "status" AQUÍ
    await queryRunner.query(`
            CREATE TABLE "appointments" (
                "id" SERIAL NOT NULL,
                "date" date NOT NULL,
                "time" time NOT NULL,
                "description" character varying(255) NOT NULL,
                "status" character varying(50) NOT NULL DEFAULT 'active', -- Asume un string y un valor por defecto
                "userId" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_YOUR_APPOINTMENTS_TABLE_NAME" PRIMARY KEY ("id")
            )
        `);

    // 2. ADD ALL FOREIGN KEYS AFTER ALL TABLES ARE CREATED

    // FK from users to credentials
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_2389db560d0e9b9535c7f9a096f" FOREIGN KEY ("credentialsId") REFERENCES "credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );

    // FK from appointments to users
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Order of DOWN must be inverse of UP: drop FKs first, then tables
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_2389db560d0e9b9535c7f9a096f"`
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`
    );
    await queryRunner.query(`DROP TABLE "appointments"`); // Drop appointments first as it depends on users
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "credentials"`);
  }
}
