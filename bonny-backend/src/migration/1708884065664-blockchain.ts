import { MigrationInterface, QueryRunner } from "typeorm";

export class Blockchain1708884065664 implements MigrationInterface {
    name = 'Blockchain1708884065664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "blockchainTxId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "blockchainTxId"`);
    }

}