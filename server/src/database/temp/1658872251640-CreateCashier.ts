import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCashier1658872251640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cashiers",
                columns: [
                    {
                        name: "cas_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "cas_col_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "cas_initial_value",
                        type: "float",
                   },
                    {
                        name: "cas_final_value",
                        type: "float",
                        isNullable: true
                    },
                    {
                        name: "cas_opened_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "cas_closed_at",
                        type: "timestamp",
                        isNullable: true,
                        default: null
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
                ],
                foreignKeys: [
                    {
                        name: "FKCollaborator",
                        referencedTableName: "collaborators",
                        referencedColumnNames: ["col_id"],
                        columnNames: ["cas_col_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cashiers");
    }

}
