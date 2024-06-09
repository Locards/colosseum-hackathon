import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713203475084 implements MigrationInterface {
    name = 'Migration1713203475084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN IF EXISTS "points"`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "points" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN IF EXISTS "points"`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "points" integer NOT NULL DEFAULT '0'`);
    }

}
