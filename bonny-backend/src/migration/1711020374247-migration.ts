import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711020374247 implements MigrationInterface {
    name = 'Migration1711020374247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipt" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "receipt" ADD "totalAmount" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipt" DROP COLUMN "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "receipt" ADD "totalAmount" integer NOT NULL`);
    }

}
