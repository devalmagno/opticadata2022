import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSales1659129506258 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sales",
                columns: [
                    {
                        name: "sal_id",
                        type: "uuid",
                        isPrimary: true     
                    },
                    {
                        name: "sal_dpr_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "sal_col_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "sal_cus_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "sal_sold_at",
                        type: "timestamp",
                    },
                      {
                        name: "sal_delivery_day",
                        type: "timestamp",
                    },
                    {
                        name: "sal_cad_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "sal_status_pay",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "sal_status",
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
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKDoctorPrescription",
                        referencedTableName: "doctor_prescription",
                        referencedColumnNames: ["dpr_id"],
                        columnNames: ["sal_dpr_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKCollaborator",
                        referencedTableName: "collaborators",
                        referencedColumnNames: ["col_id"],
                        columnNames: ["sal_col_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKCustomer",
                        referencedTableName: "customers",
                        referencedColumnNames: ["cus_id"],
                        columnNames: ["sal_cus_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKCustomerAddresses",
                        referencedTableName: "customer_addresses",
                        referencedColumnNames: ["cad_id"],
                        columnNames: ["sal_cad_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ]
            })
        )
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales");
    }

}

