import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePayment1635619217816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payments",
                columns: [
                    {
                        name: "pay_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "pay_sal_id",
                        type: "uuid",
                    },
                    {
                        name: "pay_type_of_payment",
                        type: "varchar"
                    },
                    {
                        name: "pay_desc",
                        type: "varchar",
                        length: "26"
                    },
                    {
                        name: "pay_value",
                        type: "float",
                    },
                    {
                        name: "pay_status",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "pay_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "pay_pending_date",
                        type: "timestamp",
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
                        name: "FKSales",
                        referencedTableName: "sales",
                        referencedColumnNames: ["sal_id"],
                        columnNames: ["pay_sal_id"],
                        onUpdate: "CASCADE"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments");
    }

}
