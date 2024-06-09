import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1715436449805 implements MigrationInterface {
    name = 'Migration1715436449805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest_status" ADD "transactionId" integer`);
        await queryRunner.query(`ALTER TABLE "quest_status" ADD CONSTRAINT "UQ_1bf8089a575c991e521a551235b" UNIQUE ("transactionId")`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '"2024-05-11T14:07:31.628Z"'`);
        await queryRunner.query(`ALTER TABLE "quest_status" ADD CONSTRAINT "FK_1bf8089a575c991e521a551235b" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest_status" DROP CONSTRAINT "FK_1bf8089a575c991e521a551235b"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '2024-05-11 13:55:14.344'`);
        await queryRunner.query(`ALTER TABLE "quest_status" DROP CONSTRAINT "UQ_1bf8089a575c991e521a551235b"`);
        await queryRunner.query(`ALTER TABLE "quest_status" DROP COLUMN "transactionId"`);
    }

}
