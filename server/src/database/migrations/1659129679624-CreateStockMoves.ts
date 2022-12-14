import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStockMoves1659129679624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "stock_moves",
                columns: [
                    {
                        name: "smo_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "smo_pro_id",
                        type: "uuid",
                    },
                    {
                        name: "smo_sto_id",
                        type: "uuid",
                    },
                    {
                        name: "smo_prov_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "smo_type",
                        type: "varchar",
                        length: "1"
                    },
                    {
                        name: "smo_desc",
                        type: "varchar",
                        length: "80",
                    },
                    {
                        name: "smo_quantity",
                        type: "int",
                    },
                    {
                        name: "smo_unit_price",
                        type: "float",
                        default: 0,
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
                        columnNames: ["smo_pro_id"],
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKStock",
                        referencedTableName: "stocks",
                        referencedColumnNames: ["sto_id"],
                        columnNames: ["smo_sto_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("stock_moves")
    }

}

