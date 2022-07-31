import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCollaboratorLogs1659129339890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "collaborator_logs",
                columns: [
                    {
                        name: "clog_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "clog_col_id",
                        type: "uuid",
                    },
                    {
                        name: "clog_old_col_function",
                        type: "varchar(26)",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCollaborator",
                        referencedTableName: "collaborators",
                        referencedColumnNames: ["col_id"],
                        columnNames: ["clog_col_id"],
                        onDelete: "CASCADE",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collaborator_logs")
    }

}

