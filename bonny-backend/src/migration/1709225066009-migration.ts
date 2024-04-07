import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709225066009 implements MigrationInterface {
    name = 'Migration1709225066009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "transactionType"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "transactionStatus"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "transactionStatus" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "transactionType" character varying NOT NULL`);
    }

}
