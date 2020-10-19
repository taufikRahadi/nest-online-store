import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ProductVariant1602371359821 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_variant',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'product_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'color',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'size',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'materials',
                    type: 'varchar',
                    isNullable: true
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
                    onUpdate: 'now()',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        }), true);

        await queryRunner.createForeignKey('product_variant', new TableForeignKey({
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_variant')
    }

}
