import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715860983712 implements MigrationInterface {
    name = 'Migration1715860983712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ADD "multiplier" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '"2024-05-16T12:03:05.427Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '2024-05-11 14:07:31.628'`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "multiplier"`);
    }

}
