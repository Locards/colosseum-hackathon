import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709130664485 implements MigrationInterface {
    name = 'Migration1709130664485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "affiliate_status" DROP CONSTRAINT "FK_c4762e3697a4252751d28be3f53"`);
        await queryRunner.query(`ALTER TABLE "affiliate_status" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "affiliate_status" ADD "profileId" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "quest_status" DROP CONSTRAINT "FK_7fb853514d8f3ca0dde1a8be8fe"`);
        await queryRunner.query(`ALTER TABLE "quest_status" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "quest_status" ADD "profileId" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "coupon_status" DROP CONSTRAINT "FK_e6fe046ef565e805690f0278c52"`);
        await queryRunner.query(`ALTER TABLE "coupon_status" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ADD "profileId" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_40f48b62d61cf6124ae338e0b0c"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "id" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "profileId" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "affiliate_status" ADD CONSTRAINT "FK_c4762e3697a4252751d28be3f53" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quest_status" ADD CONSTRAINT "FK_7fb853514d8f3ca0dde1a8be8fe" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ADD CONSTRAINT "FK_e6fe046ef565e805690f0278c52" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_40f48b62d61cf6124ae338e0b0c" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_40f48b62d61cf6124ae338e0b0c"`);
        await queryRunner.query(`ALTER TABLE "coupon_status" DROP CONSTRAINT "FK_e6fe046ef565e805690f0278c52"`);
        await queryRunner.query(`ALTER TABLE "quest_status" DROP CONSTRAINT "FK_7fb853514d8f3ca0dde1a8be8fe"`);
        await queryRunner.query(`ALTER TABLE "affiliate_status" DROP CONSTRAINT "FK_c4762e3697a4252751d28be3f53"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_40f48b62d61cf6124ae338e0b0c" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon_status" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "coupon_status" ADD CONSTRAINT "FK_e6fe046ef565e805690f0278c52" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quest_status" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "quest_status" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "quest_status" ADD CONSTRAINT "FK_7fb853514d8f3ca0dde1a8be8fe" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "affiliate_status" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "affiliate_status" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "affiliate_status" ADD CONSTRAINT "FK_c4762e3697a4252751d28be3f53" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
