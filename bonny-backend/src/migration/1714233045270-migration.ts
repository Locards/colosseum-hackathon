import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714233045270 implements MigrationInterface {
    name = 'Migration1714233045270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" ADD "externalUrl" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "externalUrl"`);
    }

}
