import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1602371727567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'code',
                    type: 'varchar',
                    length: '36',
                    isNullable: false,
                    isUnique: false,
                },
                {
                    name: 'firstname',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'lastname',
                    type: 'varchar',
                    length: '50',
                    isNullable: true
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '50',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'phonenumber',
                    type: 'varchar',
                    length: '16',
                    isNullable: false,
                    isUnique: true
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
