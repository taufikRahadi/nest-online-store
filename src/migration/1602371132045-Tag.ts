import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Tag1602371132045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tag',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '50',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        })), true;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tag')
    }

}
