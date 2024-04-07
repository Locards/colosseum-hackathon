import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709830156361 implements MigrationInterface {
    name = 'Migration1709830156361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" ADD "profileId" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_ddd56ed7b2e47b6cc44bad9cfd6" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_ddd56ed7b2e47b6cc44bad9cfd6"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "profileId"`);
    }

}
