import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712160590458 implements MigrationInterface {
    name = 'Migration1712160590458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "pda" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "pda"`);
    }

}
