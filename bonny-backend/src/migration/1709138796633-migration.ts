import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709138796633 implements MigrationInterface {
    name = 'Migration1709138796633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "questType"`);
        await queryRunner.query(`ALTER TABLE "affiliate" ADD "imageUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "imageUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "affiliate" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "questType" character varying NOT NULL`);
    }

}
