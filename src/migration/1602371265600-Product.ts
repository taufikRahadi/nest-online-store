import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Product1602371265600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'code',
                    type: 'varchar',
                    length: '36',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isNullable: false
                },
                {
                    name: 'stock',
                    type: 'int',
                    isNullable: false,
                    unsigned: true
                },
                {
                    name: 'weight',
                    type: 'int',
                    isNullable: false,
                    unsigned: true
                },
                {
                    name: 'price',
                    type: 'int',
                    isNullable: false,
                    unsigned: true
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'category_id',
                    type: 'int',
                    isNullable: false,
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

        await queryRunner.createForeignKey('product', new TableForeignKey({
            columnNames: [ 'category_id' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'product_category',
            onDelete: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
