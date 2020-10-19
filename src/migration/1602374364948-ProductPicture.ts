import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class ProductPicture1602374364948 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product_picture',
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
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                    length: '100'
                },
                {
                    name: 'picture_url',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'link',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
            ]
        }), true);

        await queryRunner.createForeignKey('product_picture', new TableForeignKey({
            referencedTableName: 'product',
            referencedColumnNames: [ 'id' ],
            columnNames: [ 'product_id' ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_picture');
    }

}
