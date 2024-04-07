import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709140049396 implements MigrationInterface {
    name = 'Migration1709140049396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","special_offer","public"]);
        await queryRunner.query(`DROP VIEW "special_offer"`);
        await queryRunner.query(`CREATE VIEW "special_offer" AS 
  SELECT id, title, description, "imageUrl"
  from coupon
  UNION
  SELECT id, title, description, "imageUrl"
  from quest
  UNION
  SELECT id, title, description, "imageUrl"
  from affiliate
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","special_offer","SELECT id, title, description, \"imageUrl\"\n  from coupon\n  UNION\n  SELECT id, title, description, \"imageUrl\"\n  from quest\n  UNION\n  SELECT id, title, description, \"imageUrl\"\n  from affiliate"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","special_offer","public"]);
        await queryRunner.query(`DROP VIEW "special_offer"`);
        await queryRunner.query(`CREATE VIEW "special_offer" AS SELECT id, title, description
    from coupon
    UNION
    SELECT id, title, description
    from quest
    UNION
    SELECT id, title, description
    from affiliate`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","special_offer","SELECT id, title, description\n    from coupon\n    UNION\n    SELECT id, title, description\n    from quest\n    UNION\n    SELECT id, title, description\n    from affiliate"]);
    }

}
