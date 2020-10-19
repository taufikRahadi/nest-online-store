import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class UserAddress1602371840638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_address',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'address_name',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'address_detail',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'province_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'city_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                    onUpdate: 'now()'
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        }), true);

        await queryRunner.createForeignKey('user_address', new TableForeignKey({
            referencedTableName: 'user',
            referencedColumnNames: [ 'id' ],
            columnNames: [ 'user_id' ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_address');
    }

}
