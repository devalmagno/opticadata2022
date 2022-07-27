import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("collaborators")
class Collaborator {

    @PrimaryColumn()
    col_id: string;

    @Column()
    col_name: string;

    @Column()
    col_cpf: string;

    @Column()
    col_function: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.col_id) {
            this.col_id = uuid();
        }
    }
}

export { Collaborator };