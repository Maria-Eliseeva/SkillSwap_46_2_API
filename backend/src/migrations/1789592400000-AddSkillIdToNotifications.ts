import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSkillIdToNotifications1789592400000
  implements MigrationInterface
{
  name = 'AddSkillIdToNotifications1789592400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "notifications"
      ADD COLUMN "skillId" uuid
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "notifications"
      DROP COLUMN "skillId"
    `);
  }
}
