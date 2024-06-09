import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715433710180 implements MigrationInterface {
    name = 'Migration1715433710180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT '"2024-05-11T13:21:51.886Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "timestamp"`);
    }

}
