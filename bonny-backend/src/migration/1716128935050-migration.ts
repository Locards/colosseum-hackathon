import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716128935050 implements MigrationInterface {
    name = 'Migration1716128935050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '"2024-05-19T14:28:56.633Z"'`);
        await queryRunner.query(`ALTER TABLE "stats" DROP COLUMN "totalEarend"`);
        await queryRunner.query(`ALTER TABLE "stats" ADD "totalEarend" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stats" DROP COLUMN "totalEarend"`);
        await queryRunner.query(`ALTER TABLE "stats" ADD "totalEarend" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '2024-05-19 13:37:42.404'`);
    }

}
