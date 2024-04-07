import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711739886713 implements MigrationInterface {
    name = 'Migration1711739886713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "phoneNr" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "email" DROP NOT NULL`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "phoneNr" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "email" SET NOT NULL`);
    }

}
