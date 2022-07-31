import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1658861120078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_col_id",
                        type: "uuid",
                    },
                    {
                        name: "user_password",
                        type: "varchar",
                    },
                    {
                        name: "user_is_admin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCollaborator",
                        referencedTableName: "collaborators",
                        referencedColumnNames: ["col_id"],
                        columnNames: ["user_col_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
