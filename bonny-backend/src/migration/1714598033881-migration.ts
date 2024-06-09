import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714598033881 implements MigrationInterface {
    name = 'Migration1714598033881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipt" ALTER COLUMN "receiptDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receipt" ALTER COLUMN "receiptDate" SET NOT NULL`);
    }

}
