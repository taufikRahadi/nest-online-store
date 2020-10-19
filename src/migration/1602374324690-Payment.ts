import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Payment1602374324690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'payment',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'transaction_token',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'order_id',
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

        await queryRunner.createForeignKey('payment', new TableForeignKey({
            referencedTableName: 'order',
            referencedColumnNames: [ 'id' ],
            columnNames: [ 'order_id' ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payment');
    }

}
