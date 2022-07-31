import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomer1659129002457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "customers",
                columns: [
                    {
                        name: "cus_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "cus_cpf",
                        type: "varchar",
                        length: "14"
                    },
                    {
                        name: "cus_name",
                        type: "varchar",
                        length: "26"
                    },
                    {
                        name: "cus_phone",
                        type: "varchar",
                        length: "15"
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
        await queryRunner.dropTable("customers");
    }

}

