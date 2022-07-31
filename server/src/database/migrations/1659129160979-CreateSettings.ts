import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1659129160979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "optics_name",
                        type: "varchar",
                        length: "26"
                    },
                    {
                        name: "optics_color",
                        type: "varchar",
                        length: "6"
                    },
                    {
                        name: "optics_unit",
                        type: "varchar",
                        length: "30"
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
        await queryRunner.dropTable("settings");
    }

}

