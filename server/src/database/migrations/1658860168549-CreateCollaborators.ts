import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCollaborators1658860168549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "collaborators",
                columns: [
                    {
                        name: "col_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "col_cpf",
                        type: "varchar",
                        length: "14",
                    },
                    {
                        name: "col_name",
                        type: "varchar",
                        length: "26"
                    },
                    {
                        name: "col_function",
                        type: "varchar",
                        length: "26"
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
                    }
                ]
            })
        )
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collaborators");
    }

}
