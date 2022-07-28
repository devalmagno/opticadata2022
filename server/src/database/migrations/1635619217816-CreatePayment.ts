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
                        type: "decimal",
                        precision: 5,
                        scale: 2,
                        default: 0
                    },
                    {
                        name: "pay_status",
                        type: "boolean",
                        default: false
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments");
    }

}
