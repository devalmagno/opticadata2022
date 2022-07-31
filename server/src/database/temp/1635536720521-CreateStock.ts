import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStock1635536720521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "stocks",
                columns: [
                    {
                        name: "sto_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "sto_pro_id",
                        type: "uuid",
                    },
                    {
                        name: "sto_min",
                        type: "int"
                    },
                    {
                        name: "sto_max",
                        type: "int"
                    },
 
                    {
                        name: "sto_quantity",
                        type: "int"
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
                        name: "FKProduct",
                        referencedTableName: "products",
                        referencedColumnNames: ["pro_id"],
                        columnNames: ["sto_pro_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("stocks");
    }

}
