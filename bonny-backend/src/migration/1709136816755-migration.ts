import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709136816755 implements MigrationInterface {
    name = 'Migration1709136816755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "couponType"`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "imageUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "couponType" character varying NOT NULL`);
    }

}
