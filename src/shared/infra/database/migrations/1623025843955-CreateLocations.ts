import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLocations1623025843955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'locations',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'lat',
                type: 'varchar',
              },
              {
                name: 'long',
                type: 'varchar',
              },
              {
                name: 'city',
                type: 'varchar',
              },
              {
                name: 'state',
                type: 'varchar',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('locations');
      }

}
