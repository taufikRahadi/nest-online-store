import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ProductTag1602371426052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_tag',
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
                    isNullable: false,
                },
                {
                    name: 'tag_id',
                    type: 'int',
                    isNullable: false
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

        await queryRunner.createForeignKey('product_tag', new TableForeignKey({
            columnNames: [ 'product_id' ],
            referencedTableName: 'product',
            referencedColumnNames: [ 'id' ],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('product_tag', new TableForeignKey({
            columnNames: [ 'tag_id' ],
            referencedColumnNames: [ 'id' ],
            referencedTableName: 'tag',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_tag')
    }

}
