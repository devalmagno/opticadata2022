import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCashierMoves1659129646491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cashier_moves",
                columns: [
                    {
                        name: "cmo_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "cmo_cas_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "cmo_type",
                        type: "varchar",
                        length: "1"
                    },
                    {
                        name: "cmo_desc",
                        type: "varchar",
                        length: "40"
                    },
                    {
                        name: "cmo_value",
                        type: "float",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCashier",
                        referencedTableName: "cashiers",
                        referencedColumnNames: ["cas_id"],
                        columnNames: ["cmo_cas_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
 
           })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cashier_moves");
    }

}

