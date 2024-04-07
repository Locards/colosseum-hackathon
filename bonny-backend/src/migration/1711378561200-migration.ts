import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711378561200 implements MigrationInterface {
    name = 'Migration1711378561200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reclaim" ("id" SERIAL NOT NULL, CONSTRAINT "PK_059601da4c72c5787e539bb91ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reclaim_status" ("id" SERIAL NOT NULL, "profileId" character varying(255), "reclaimId" integer, CONSTRAINT "PK_01b00eb487ea0112f2a4512c2a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quest" ADD "reclaimId" integer`);
        await queryRunner.query(`ALTER TABLE "quest" ADD CONSTRAINT "UQ_0c6345961c1782617547f9b0460" UNIQUE ("reclaimId")`);
        await queryRunner.query(`ALTER TABLE "reclaim_status" ADD CONSTRAINT "FK_33292ea004e9380f8ca403edb4e" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reclaim_status" ADD CONSTRAINT "FK_f3662e68fb5290b00ff75f01895" FOREIGN KEY ("reclaimId") REFERENCES "reclaim"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quest" ADD CONSTRAINT "FK_0c6345961c1782617547f9b0460" FOREIGN KEY ("reclaimId") REFERENCES "reclaim"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quest" DROP CONSTRAINT "FK_0c6345961c1782617547f9b0460"`);
        await queryRunner.query(`ALTER TABLE "reclaim_status" DROP CONSTRAINT "FK_f3662e68fb5290b00ff75f01895"`);
        await queryRunner.query(`ALTER TABLE "reclaim_status" DROP CONSTRAINT "FK_33292ea004e9380f8ca403edb4e"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP CONSTRAINT "UQ_0c6345961c1782617547f9b0460"`);
        await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "reclaimId"`);
        await queryRunner.query(`DROP TABLE "reclaim_status"`);
        await queryRunner.query(`DROP TABLE "reclaim"`);
    }

}
