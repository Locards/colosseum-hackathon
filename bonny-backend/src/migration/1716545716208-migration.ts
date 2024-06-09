import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716545716208 implements MigrationInterface {
    name = 'Migration1716545716208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" ADD "enabled" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '"2024-05-24T10:15:18.039Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '2024-05-19 14:28:56.633'`);
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "enabled"`);
    }

}
