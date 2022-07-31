import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEyeInfo1659129538079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "eye_info",
                columns: [
                    {
                        name: "ein_id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "ein_dpr_id",
                        type: "uuid",
                    },
                    {
                        name: "ein_type",
                        type: "varchar",
                        length: "2"
                    },
                    {
                        name: "ein_esf",
                        type: "float"
                    },
                    {
                        name: "ein_cil",
                        type: "float"
                    },
                    {
                        name: "ein_eixo",
                        type: "varchar",
                        length: "9"

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
                        name: "FKDoctorPrescription",
                        referencedTableName: "doctor_prescription",
                        referencedColumnNames: ["dpr_id"],
                        columnNames: ["ein_dpr_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ]

            })
        )
 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("eye_info");
    }

}

