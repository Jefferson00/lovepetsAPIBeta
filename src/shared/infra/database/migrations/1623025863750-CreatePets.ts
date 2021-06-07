import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePets1623025863750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'pets',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'user_id',
                type: 'uuid',
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'species',
                type: 'varchar',
              },
              {
                name: 'is_adopt',
                type: 'boolean',
              },
              {
                name: 'age',
                type: 'varchar',
              },
              {
                name: 'gender',
                type: 'varchar',
              },
              {
                name: 'description',
                type: 'varchar',
              },
              {
                name: 'location_id',
                type: 'uuid',
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
            foreignKeys: [
                {
                    name: 'PetUser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    name: 'PetLocation',
                    referencedTableName: 'locations',
                    referencedColumnNames: ['id'],
                    columnNames: ['location_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'CASCADE',
                },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pets');
      }

}
