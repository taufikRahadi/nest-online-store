import {MigrationInterface, QueryRunner, TableForeignKey, Table} from "typeorm";

export class OrderDetail1602374251264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_detail',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'order_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'product_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'qty',
                    type: 'int',
                    isNullable: false,
                    unsigned: false
                },
                {
                    name: 'total_price',
                    type: 'int',
                    isNullable: false,
                    unsigned: false
                },
                {
                    name: 'total_weight',
                    type: 'int',
                    isNullable: false,
                    unsigned: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()'
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

        await queryRunner.createForeignKeys('order_detail', [
            new TableForeignKey({
                referencedTableName: 'order',
                referencedColumnNames: [ 'id' ],
                columnNames: [ 'order_id' ]
            }),
            new TableForeignKey({
                referencedTableName: 'product',
                referencedColumnNames: [ 'id' ],
                columnNames: [ 'product_id' ]
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_detail')
    }

}
