import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CartDetail1602372126662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cart_detail',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'cart_id',
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
                    unsigned: true
                },
                {
                    name: 'total_price',
                    type: 'int',
                    isNullable: false,
                    unsigned: true
                },
                {
                    name: 'total_weight',
                    type: 'int',
                    isNullable: false,
                    unsigned: true
                },
                {
                    name: 'is_paid',
                    type: 'boolean',
                    default: false,
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
        
        await queryRunner.createForeignKeys('cart_detail', [
            new TableForeignKey({
                referencedTableName: 'cart',
                referencedColumnNames: [ 'id' ],
                columnNames: [ 'cart_id' ] 
            }),
            new TableForeignKey({
                referencedTableName: 'product',
                referencedColumnNames: [ 'id' ],
                columnNames: [ 'product_id' ]
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
