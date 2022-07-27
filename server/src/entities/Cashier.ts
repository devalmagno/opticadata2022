import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

import { Collaborator } from "./Collaborators";

@Entity("cashiers")
class Cashier {

    @PrimaryColumn()
    cas_id: string;

    @JoinColumn({ name: "cas_col_id" })
    @ManyToOne(() => Collaborator)
    collaborators: Collaborator;

    @Column()
    cas_col_id: string;

    @Column()
    cas_initial_value: number;

    @Column()
    cas_final_value: number;

    @CreateDateColumn()
    cas_opened_at: Date;

    @CreateDateColumn()
    cas_closed_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.cas_id) {
            this.cas_id = uuid();
        }
    }
}

export { Cashier };