import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711024047545 implements MigrationInterface {
    name = 'Migration1711024047545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "tokens" type double precision`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "tokens" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "tokens" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "tokens" type int4`);
    }

}
