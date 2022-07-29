import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsOrder1635777226329 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products_order",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "order_id",
                        type: "uuid",
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "quantity",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKOrder",
                        referencedTableName: "orders",
                        referencedColumnNames: ["id"],
                        columnNames: ["order_id"],
                        onDelete: "CASCADE",   
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKProduct",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["product_id"],
                        onDelete: "SET NULL",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products_order");
    }
}
