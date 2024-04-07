import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709822690747 implements MigrationInterface {
    name = 'Migration1709822690747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answer" ("id" SERIAL NOT NULL, "freeText" text, "questionId" integer, "selectedOptionId" integer, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "surveyId" integer`);
        await queryRunner.query(`ALTER TABLE "quest" ADD CONSTRAINT "UQ_3339a790edef436228c3ea10c09" UNIQUE ("surveyId")`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_2b7f7332c9ea46974c6ee95c93f" FOREIGN KEY ("selectedOptionId") REFERENCES "question_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quest" ADD CONSTRAINT "FK_3339a790edef436228c3ea10c09" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" DROP CONSTRAINT "FK_3339a790edef436228c3ea10c09"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_2b7f7332c9ea46974c6ee95c93f"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP CONSTRAINT "UQ_3339a790edef436228c3ea10c09"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "surveyId"`);
        await queryRunner.query(`DROP TABLE "answer"`);
    }

}
