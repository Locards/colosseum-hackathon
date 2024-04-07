import { MigrationInterface, QueryRunner } from 'typeorm';

export class Setup1708878358401 implements MigrationInterface {
  name = 'Setup1708878358401';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "affiliate" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "externalUrl" character varying NOT NULL, CONSTRAINT "PK_1ce9ae335b25b11224e2756cfdc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "affiliate_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "purchaseDate" TIMESTAMP NOT NULL, "profileId" integer, "affiliateId" integer, CONSTRAINT "PK_b076400ed249ad5a9849d5aa947" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "details" character varying NOT NULL, "couponType" character varying NOT NULL, "expiryDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coupon_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "redeemDate" TIMESTAMP NOT NULL, "profileId" integer, "couponId" integer, CONSTRAINT "PK_d08758eb4c74fd9c864aeae393e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "receipt" ("id" SERIAL NOT NULL, "storageUrl" character varying NOT NULL, "supplierName" character varying NOT NULL, "totalAmount" integer NOT NULL, "receiptDate" TIMESTAMP NOT NULL, "hash" character varying NOT NULL, "transactionsId" integer, CONSTRAINT "REL_927664a0d1292a44995b1a62e1" UNIQUE ("transactionsId"), CONSTRAINT "PK_b4b9ec7d164235fbba023da9832" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "transactionType" character varying NOT NULL, "transactionStatus" character varying NOT NULL, "tokens" integer NOT NULL, "profileId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phoneNr" character varying NOT NULL, "tokens" integer NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quest" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "questType" character varying NOT NULL, CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quest_status" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "completedDate" TIMESTAMP NOT NULL, "profileId" integer, "questId" integer, CONSTRAINT "PK_7f04f7eccc61d90756227b9c5be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" ADD CONSTRAINT "FK_c4762e3697a4252751d28be3f53" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" ADD CONSTRAINT "FK_677852951e0898cc77a6a946507" FOREIGN KEY ("affiliateId") REFERENCES "affiliate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" ADD CONSTRAINT "FK_e6fe046ef565e805690f0278c52" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" ADD CONSTRAINT "FK_0decbf6c49739453275c8c9049c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_927664a0d1292a44995b1a62e11" FOREIGN KEY ("transactionsId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_40f48b62d61cf6124ae338e0b0c" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" ADD CONSTRAINT "FK_7fb853514d8f3ca0dde1a8be8fe" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" ADD CONSTRAINT "FK_2e20f8945e51f5758ac57e002b3" FOREIGN KEY ("questId") REFERENCES "quest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`CREATE VIEW "special_offer" AS 
    SELECT id, title, description
    from coupon
    UNION
    SELECT id, title, description
    from quest
    UNION
    SELECT id, title, description
    from affiliate
  `);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'special_offer',
        'SELECT id, title, description\n    from coupon\n    UNION\n    SELECT id, title, description\n    from quest\n    UNION\n    SELECT id, title, description\n    from affiliate',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'special_offer', 'public'],
    );
    await queryRunner.query(`DROP VIEW "special_offer"`);
    await queryRunner.query(
      `ALTER TABLE "quest_status" DROP CONSTRAINT "FK_2e20f8945e51f5758ac57e002b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest_status" DROP CONSTRAINT "FK_7fb853514d8f3ca0dde1a8be8fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_40f48b62d61cf6124ae338e0b0c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_927664a0d1292a44995b1a62e11"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" DROP CONSTRAINT "FK_0decbf6c49739453275c8c9049c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coupon_status" DROP CONSTRAINT "FK_e6fe046ef565e805690f0278c52"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" DROP CONSTRAINT "FK_677852951e0898cc77a6a946507"`,
    );
    await queryRunner.query(
      `ALTER TABLE "affiliate_status" DROP CONSTRAINT "FK_c4762e3697a4252751d28be3f53"`,
    );
    await queryRunner.query(`DROP TABLE "quest_status"`);
    await queryRunner.query(`DROP TABLE "quest"`);
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "receipt"`);
    await queryRunner.query(`DROP TABLE "coupon_status"`);
    await queryRunner.query(`DROP TABLE "coupon"`);
    await queryRunner.query(`DROP TABLE "affiliate_status"`);
    await queryRunner.query(`DROP TABLE "affiliate"`);
  }
}
