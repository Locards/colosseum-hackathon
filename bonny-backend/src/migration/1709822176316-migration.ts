import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709822176316 implements MigrationInterface {
    name = 'Migration1709822176316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "points" integer NOT NULL, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "type" character varying NOT NULL, "order" integer NOT NULL, "surveyId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_option" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "order" integer NOT NULL, "questionId" integer, CONSTRAINT "PK_64f8e42188891f2b0610017c8f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coupon_status" DROP CONSTRAINT "FK_0decbf6c49739453275c8c9049c"`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ALTER COLUMN "couponId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_a1188e0f702ab268e0982049e5c" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_option" ADD CONSTRAINT "FK_ba19747af180520381a117f5986" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ADD CONSTRAINT "FK_0decbf6c49739453275c8c9049c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon_status" DROP CONSTRAINT "FK_0decbf6c49739453275c8c9049c"`);
        await queryRunner.query(`ALTER TABLE "question_option" DROP CONSTRAINT "FK_ba19747af180520381a117f5986"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_a1188e0f702ab268e0982049e5c"`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ALTER COLUMN "couponId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ADD CONSTRAINT "FK_0decbf6c49739453275c8c9049c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "question_option"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "survey"`);
    }

}
