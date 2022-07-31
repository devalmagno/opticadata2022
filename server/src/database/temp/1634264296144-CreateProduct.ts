import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProduct1634264296144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "pro_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "pro_type",
                        type: "varchar",
                        length: "26"
                    },
                    {
                        name: "pro_desc",
                        type: "varchar",
                        length: "40"
                    },
                    {
                        name: "pro_unit_price",
                        type: "float",
                    },
                    {
                        name: "pro_status",
                        type: "boolean",
                        default: true
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
            })
        )
   }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
