import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1738081344385 implements MigrationInterface {
  name = 'CreateUser1738081344385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "hashed_password"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "employee_number" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_4541de56cf6586feb53ff762ea2" UNIQUE ("employee_number")
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "role" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_4541de56cf6586feb53ff762ea2"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "employee_number"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "hashed_password" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
  }
}
