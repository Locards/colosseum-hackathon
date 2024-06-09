import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716125860310 implements MigrationInterface {
    name = 'Migration1716125860310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stats" ("id" SERIAL NOT NULL, "totalReceipts" integer NOT NULL, "totalEarend" integer NOT NULL, "totalQuests" integer NOT NULL, "totalCoupons" integer NOT NULL, "totalUsers" integer NOT NULL, CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '"2024-05-19T13:37:42.404Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "timestamp" SET DEFAULT '2024-05-16 12:03:05.427'`);
        await queryRunner.query(`DROP TABLE "stats"`);
    }

}
