import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLostPetTable1787782110820 implements MigrationInterface {
    name = 'CreateLostPetTable1787782110820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "LOST_PET" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "race" character varying NOT NULL, "age" integer NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_7fda532c785dfc07c9c2a814365" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "LOST_PET"`);
    }

}
