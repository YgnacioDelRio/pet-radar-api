import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImageUrlColumn1792022599893 implements MigrationInterface {
    name = 'CreateImageUrlColumn1792022599893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LOST_PET" ADD "imageUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "LOST_PET" DROP COLUMN "imageUrl"`);
    }

}
