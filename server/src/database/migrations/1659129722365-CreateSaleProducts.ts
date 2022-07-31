import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSaleProducts1659129722365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sale_products",
                columns: [
                    {
                        name: "spr_id",
                        type: "uuid",
                        isPrimary: true     
                    },
                    {
                        name: "spr_sal_id",
                        type: "uuid",
                    },
                    {
                        name: "spr_pro_id",
                        type: "uuid",
                    },
                    {
                        name: "spr_quantity",
                        type: "int",
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
                        name: "FKSales",
                        referencedTableName: "sales",
                        referencedColumnNames: ["sal_id"],
                        columnNames: ["spr_sal_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKProduct",
                        referencedTableName: "products",
                        referencedColumnNames: ["pro_id"],
                        columnNames: ["spr_pro_id"],
                        onUpdate: "CASCADE"
                    },
                ]
            })
        )
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sale_products");
    }

}

