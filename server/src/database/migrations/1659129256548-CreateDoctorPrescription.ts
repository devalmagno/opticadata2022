import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDoctorPrescription1659129256548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "doctor_prescription",
                columns: [
                    {
                        name: "dpr_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "dpr_dnp_od",
                        type: "float",
                    },
                    {
                        name: "dpr_dnp_oe",
                        type: "float",
                    },
                    {
                        name: "dpr_height_segment",
                        type: "float"
                    },
                    {
                        name: "dpr_dp",
                        type: "float"
                    },
                    {
                        name: "dpr_crm",
                        type: "varchar",
                        length: "9"

                    },
                    {
                        name: "dpr_receipt_date",
                        type: "timestamp"
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
        await queryRunner.dropTable("doctor_prescription");
    }

}

