import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomerAddresses1658951344208 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "customer_addresses",
                columns: [
                    {
                        name: "cad_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "cad_cus_id",
                        type: "uuid",
                    },
                    {
                        name: "cad_city",
                        type: "varchar",
                        length: "40"
                    },
                    {
                        name: "cad_district",
                        type: "varchar",
                        length: "26"
                    },
                    {
                        name: "cad_desc",
                        type: "varchar",
                        length: "40"
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
                        name: "FKCustomer",
                        referencedTableName: "customers",
                        referencedColumnNames: ["cus_id"],
                        columnNames: ["cad_cus_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
 
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customer_addresses");
    }

}
