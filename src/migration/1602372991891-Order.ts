import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Order1602372991891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order',
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
                    name: 'code',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                    isGenerated: true
                },
                {
                    name: 'total_price',
                    type: 'int',
                    unsigned: false,
                    isNullable: false
                },
                {
                    name: 'total_weight',
                    type: 'int',
                    unsigned: false,
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

        await queryRunner.createForeignKey('order', new TableForeignKey({
            referencedTableName: 'user',
            referencedColumnNames: [ 'id' ],
            columnNames: [ 'user_id' ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order');
    }

}
